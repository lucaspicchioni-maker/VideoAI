import uuid
from datetime import datetime

from pydantic import BaseModel, ConfigDict


class SceneResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    episode_id: uuid.UUID
    number: int
    name: str
    duration_seconds: int
    description: str | None
    frame_a_prompt: str | None
    frame_b_prompt: str | None
    frame_a_url: str | None
    frame_b_url: str | None
    video_std_url: str | None
    video_pro_url: str | None
    audio_narration_url: str | None
    audio_dialogue_url: str | None
    lip_sync_eligible: bool
    lip_sync_applied: bool
    kling_task_id: str | None
    kling_lipsync_task_id: str | None
    status: str
    created_at: datetime


class SceneImageRequest(BaseModel):
    frame: str = "a"  # a | b | both
    cref_url: str | None = None  # override character cref for this call


class SceneAudioRequest(BaseModel):
    voice_id: str | None = None
    narration_text: str | None = None  # if None, extracted from script


class SceneAnimateRequest(BaseModel):
    mode: str = "std"  # std | pro
    duration: int = 5  # 5 | 10
    negative_prompt: str = "blur, distortion, extra limbs, watermark"


class SceneLipSyncRequest(BaseModel):
    use_pro_video: bool = True  # whether to use video_pro_url or video_std_url
