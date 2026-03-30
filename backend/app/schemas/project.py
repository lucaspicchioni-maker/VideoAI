import uuid
from datetime import datetime

from pydantic import BaseModel, ConfigDict


class CharacterCreate(BaseModel):
    name: str
    real_inspiration: str | None = None
    description: str = ""
    cref_url: str | None = None
    voice_id: str | None = None
    voice_settings: dict | None = None
    voice_model: str = "eleven_multilingual_v2"


class CharacterResponse(CharacterCreate):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    project_id: uuid.UUID
    approved: bool
    created_at: datetime


class ProjectCreate(BaseModel):
    name: str
    description: str = ""
    genre: str
    target_platform: str
    total_episodes: int = 0
    style_ref_url: str | None = None


class ProjectUpdate(BaseModel):
    name: str | None = None
    description: str | None = None
    genre: str | None = None
    target_platform: str | None = None
    total_episodes: int | None = None
    status: str | None = None
    bible: str | None = None
    style_ref_url: str | None = None


class ProjectResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    name: str
    description: str
    genre: str
    target_platform: str
    total_episodes: int
    status: str
    bible: str | None
    style_ref_url: str | None
    created_at: datetime
    updated_at: datetime


class ProjectWithCharacters(ProjectResponse):
    characters: list[CharacterResponse] = []
