import json
import uuid

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.database import get_db
from app.models.episode import Episode
from app.models.project import Project
from app.models.scene import Scene
from app.schemas.episode import EpisodeCreate, EpisodeResponse, EpisodeUpdate
from app.schemas.scene import SceneResponse
from app.services.anthropic_service import AnthropicService

router = APIRouter(tags=["episodes"])
anthropic_svc = AnthropicService()


@router.get("/projects/{project_id}/episodes", response_model=list[EpisodeResponse])
async def list_episodes(project_id: uuid.UUID, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Episode)
        .where(Episode.project_id == project_id)
        .order_by(Episode.season, Episode.number)
    )
    return result.scalars().all()


@router.post(
    "/projects/{project_id}/episodes",
    response_model=EpisodeResponse,
    status_code=status.HTTP_201_CREATED,
)
async def create_episode(
    project_id: uuid.UUID,
    payload: EpisodeCreate,
    db: AsyncSession = Depends(get_db),
):
    """Create an episode and auto-generate its script via Claude."""
    proj_result = await db.execute(select(Project).where(Project.id == project_id))
    project = proj_result.scalar_one_or_none()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    episode = Episode(project_id=project_id, **payload.model_dump())
    db.add(episode)
    await db.flush()

    try:
        episode_meta = {
            "season": episode.season,
            "number": episode.number,
            "title": episode.title,
            "period": episode.period,
            "emotional_arc": episode.emotional_arc,
        }
        script_dict = await anthropic_svc.generate_episode_script(
            episode_data=episode_meta,
            bible=project.bible or "{}",
            db=db,
            episode_id=str(episode.id),
        )
        episode.script = json.dumps(script_dict, ensure_ascii=False)
        episode.status = "scripted"

        # Persist scenes from the generated script
        for scene_data in script_dict.get("scenes", []):
            scene = Scene(
                episode_id=episode.id,
                number=scene_data.get("number", 0),
                name=scene_data.get("name", ""),
                duration_seconds=scene_data.get("duration_seconds", 5),
                description=scene_data.get("description"),
                frame_a_prompt=scene_data.get("frame_a_prompt"),
                frame_b_prompt=scene_data.get("frame_b_prompt"),
                status="pending",
            )
            db.add(scene)

    except Exception as exc:
        episode.status = "scripted"

    await db.commit()
    await db.refresh(episode)
    return episode


@router.get("/episodes/{episode_id}", response_model=EpisodeResponse)
async def get_episode(episode_id: uuid.UUID, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Episode).where(Episode.id == episode_id))
    episode = result.scalar_one_or_none()
    if not episode:
        raise HTTPException(status_code=404, detail="Episode not found")
    return episode


@router.get("/episodes/{episode_id}/scenes", response_model=list[SceneResponse])
async def list_scenes(episode_id: uuid.UUID, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Scene)
        .where(Scene.episode_id == episode_id)
        .order_by(Scene.number)
    )
    return result.scalars().all()


@router.patch("/episodes/{episode_id}", response_model=EpisodeResponse)
async def update_episode(
    episode_id: uuid.UUID,
    payload: EpisodeUpdate,
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(select(Episode).where(Episode.id == episode_id))
    episode = result.scalar_one_or_none()
    if not episode:
        raise HTTPException(status_code=404, detail="Episode not found")

    for field, value in payload.model_dump(exclude_unset=True).items():
        setattr(episode, field, value)

    await db.commit()
    await db.refresh(episode)
    return episode
