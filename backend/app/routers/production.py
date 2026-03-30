import json
import uuid
from datetime import datetime, timezone
from pathlib import Path

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.config import settings
from app.database import get_db
from app.models.episode import Episode
from app.models.production_job import ProductionJob
from app.models.scene import Scene
from app.schemas.scene import (
    SceneAnimateRequest,
    SceneAudioRequest,
    SceneImageRequest,
    SceneLipSyncRequest,
)
from app.services import (
    elevenlabs_service,
    ffmpeg_service,
    kling_service,
)
from app.services.cost_estimator import check_guardrails, estimate_episode_cost

router = APIRouter(prefix="/production", tags=["production"])

_kling = kling_service.KlingService()
_elevenlabs = elevenlabs_service.ElevenLabsService()


async def _get_scene_or_404(scene_id: uuid.UUID, db: AsyncSession) -> Scene:
    result = await db.execute(select(Scene).where(Scene.id == scene_id))
    scene = result.scalar_one_or_none()
    if not scene:
        raise HTTPException(status_code=404, detail="Scene not found")
    return scene


async def _get_episode_or_404(episode_id: uuid.UUID, db: AsyncSession) -> Episode:
    result = await db.execute(select(Episode).where(Episode.id == episode_id))
    episode = result.scalar_one_or_none()
    if not episode:
        raise HTTPException(status_code=404, detail="Episode not found")
    return episode


@router.post("/episode/{episode_id}/start")
async def start_episode_pipeline(
    episode_id: uuid.UUID, db: AsyncSession = Depends(get_db)
):
    """Queue a full episode production job (cost-guard checked)."""
    episode = await _get_episode_or_404(episode_id, db)

    scenes_result = await db.execute(
        select(Scene).where(Scene.episode_id == episode_id)
    )
    scenes = scenes_result.scalars().all()
    scene_count = len(scenes)

    estimate = estimate_episode_cost({"scene_count": scene_count})
    guardrail = check_guardrails(estimate)

    if guardrail["guardrail"] == "block":
        raise HTTPException(
            status_code=status.HTTP_402_PAYMENT_REQUIRED,
            detail=guardrail["message"],
        )

    job = ProductionJob(
        episode_id=episode_id,
        type="full_episode",
        status="queued",
    )
    db.add(job)
    await db.commit()
    await db.refresh(job)

    return {
        "job_id": str(job.id),
        "status": job.status,
        "estimate": estimate,
        "guardrail": guardrail,
        "message": "Job queued. Integrate with Celery worker to execute pipeline.",
    }


@router.post("/scene/{scene_id}/image")
async def trigger_scene_image(
    scene_id: uuid.UUID,
    payload: SceneImageRequest,
    db: AsyncSession = Depends(get_db),
):
    """
    Register Midjourney image URLs for a scene.
    Midjourney does not have a direct API — images are submitted via Discord
    and their output URLs are registered here via webhook or manual input.
    """
    scene = await _get_scene_or_404(scene_id, db)

    return {
        "scene_id": str(scene_id),
        "frame_a_prompt": scene.frame_a_prompt,
        "frame_b_prompt": scene.frame_b_prompt,
        "cref_url": payload.cref_url,
        "instructions": (
            "Submit the prompts to Midjourney via Discord. "
            "Once you have the image URLs, PATCH /scenes/{id} "
            "with frame_a_url and frame_b_url to register them."
        ),
    }


@router.post("/scene/{scene_id}/audio")
async def generate_scene_audio(
    scene_id: uuid.UUID,
    payload: SceneAudioRequest,
    db: AsyncSession = Depends(get_db),
):
    """Generate narration audio for a single scene via ElevenLabs."""
    scene = await _get_scene_or_404(scene_id, db)

    narration_text = payload.narration_text
    if not narration_text:
        # Extract narration from the episode script
        ep_result = await db.execute(select(Episode).where(Episode.id == scene.episode_id))
        episode = ep_result.scalar_one_or_none()
        if episode and episode.script:
            script = json.loads(episode.script)
            for s in script.get("scenes", []):
                if s.get("number") == scene.number:
                    narration_text = s.get("narration", "")
                    break

    if not narration_text:
        raise HTTPException(status_code=400, detail="No narration text found for scene")

    voice_id = payload.voice_id or settings.NARRATOR_VOICE_ID
    if not voice_id:
        raise HTTPException(status_code=400, detail="No voice_id configured")

    audio_bytes = await _elevenlabs.generate_narration(
        text=narration_text,
        voice_id=voice_id,
        db=db,
        episode_id=str(scene.episode_id),
        scene_id=str(scene_id),
    )

    # Store relative path in scene record
    audio_filename = f"narration_scene_{scene_id}.mp3"
    audio_path = str(Path(settings.LOCAL_STORAGE_PATH) / "audio" / audio_filename)
    scene.audio_narration_url = audio_path
    scene.status = "audio"
    await db.commit()

    return {
        "scene_id": str(scene_id),
        "audio_path": audio_path,
        "characters": len(narration_text),
    }


@router.post("/scene/{scene_id}/animate")
async def animate_scene(
    scene_id: uuid.UUID,
    payload: SceneAnimateRequest,
    db: AsyncSession = Depends(get_db),
):
    """Submit scene frames to Kling AI for image-to-video animation."""
    scene = await _get_scene_or_404(scene_id, db)

    if not scene.frame_a_url:
        raise HTTPException(
            status_code=400,
            detail="frame_a_url not set — generate Midjourney images first",
        )

    task_id = await _kling.create_i2v_task(
        image_url=scene.frame_a_url,
        tail_url=scene.frame_b_url,
        prompt=scene.description or "",
        negative_prompt=payload.negative_prompt,
        duration=payload.duration,
        mode=payload.mode,
        db=db,
        episode_id=str(scene.episode_id),
    )

    scene.kling_task_id = task_id
    scene.status = "animation"
    await db.commit()

    return {
        "scene_id": str(scene_id),
        "kling_task_id": task_id,
        "mode": payload.mode,
        "duration": payload.duration,
        "message": "Task submitted. Poll /production/job/{task_id} for status.",
    }


@router.post("/scene/{scene_id}/lipsync")
async def apply_lipsync(
    scene_id: uuid.UUID,
    payload: SceneLipSyncRequest,
    db: AsyncSession = Depends(get_db),
):
    """Apply Kling lip-sync to a scene that has both video and audio ready."""
    scene = await _get_scene_or_404(scene_id, db)

    video_url = scene.video_pro_url if payload.use_pro_video else scene.video_std_url
    if not video_url:
        raise HTTPException(status_code=400, detail="No video URL available for this scene")
    if not scene.audio_narration_url:
        raise HTTPException(status_code=400, detail="No audio narration URL available for this scene")

    eligible = await _kling.check_lipsync_eligibility(
        audio_path=scene.audio_narration_url,
        image_url=scene.frame_a_url or "",
    )
    if not eligible:
        raise HTTPException(
            status_code=400,
            detail="Scene audio exceeds 60s — not eligible for Kling lip-sync",
        )

    lipsync_task_id = await _kling.create_lipsync_task(
        video_url=video_url,
        audio_url=scene.audio_narration_url,
        origin_task_id=scene.kling_task_id or "",
        db=db,
        episode_id=str(scene.episode_id),
    )

    scene.kling_lipsync_task_id = lipsync_task_id
    scene.lip_sync_applied = True
    await db.commit()

    return {
        "scene_id": str(scene_id),
        "lipsync_task_id": lipsync_task_id,
    }


@router.get("/job/{task_id}")
async def get_job_status(task_id: str, task_type: str = "i2v"):
    """Poll Kling for the status of a submitted task."""
    try:
        result = await _kling.poll_task(task_id, task_type)
        return {"task_id": task_id, "status": "done", "data": result}
    except TimeoutError as exc:
        raise HTTPException(status_code=408, detail=str(exc))
    except RuntimeError as exc:
        raise HTTPException(status_code=500, detail=str(exc))


@router.post("/episode/{episode_id}/assemble")
async def assemble_episode(
    episode_id: uuid.UUID, db: AsyncSession = Depends(get_db)
):
    """Run FFMPEG assembly: concatenate all scene clips + mix audio + burn subtitles."""
    episode = await _get_episode_or_404(episode_id, db)

    scenes_result = await db.execute(
        select(Scene)
        .where(Scene.episode_id == episode_id)
        .order_by(Scene.number)
    )
    scenes = scenes_result.scalars().all()

    clip_paths = [s.video_pro_url or s.video_std_url for s in scenes if (s.video_pro_url or s.video_std_url)]
    audio_paths = [s.audio_narration_url for s in scenes if s.audio_narration_url]

    if not clip_paths:
        raise HTTPException(status_code=400, detail="No video clips ready for assembly")
    if not audio_paths:
        raise HTTPException(status_code=400, detail="No audio files ready for assembly")

    storage = Path(settings.LOCAL_STORAGE_PATH) / "final"
    storage.mkdir(parents=True, exist_ok=True)
    output_path = str(storage / f"episode_{episode_id}.mp4")
    temp_video = str(storage / f"raw_{episode_id}.mp4")
    temp_audio = str(Path(settings.LOCAL_STORAGE_PATH) / "audio" / f"mix_{episode_id}.mp3")

    ffmpeg_service.concatenate_clips(clip_paths, temp_video)
    ffmpeg_service.mix_audio_track(audio_paths, [], None, temp_audio)
    final_path = ffmpeg_service.export_final_episode(temp_video, temp_audio, None, output_path)

    episode.status = "done"
    await db.commit()

    return {
        "episode_id": str(episode_id),
        "final_path": final_path,
        "status": "done",
    }
