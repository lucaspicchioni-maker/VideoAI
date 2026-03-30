import uuid
from datetime import datetime
from decimal import Decimal

from pydantic import BaseModel, ConfigDict


class EpisodeCreate(BaseModel):
    season: int = 1
    number: int
    title: str
    slug: str
    period: str | None = None
    emotional_arc: str | None = None


class EpisodeUpdate(BaseModel):
    title: str | None = None
    slug: str | None = None
    period: str | None = None
    emotional_arc: str | None = None
    script: str | None = None
    status: str | None = None
    cost_estimate_usd: Decimal | None = None
    cost_actual_usd: Decimal | None = None


class EpisodeResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    project_id: uuid.UUID
    season: int
    number: int
    title: str
    slug: str
    period: str | None
    emotional_arc: str | None
    script: str | None
    status: str
    cost_estimate_usd: Decimal | None
    cost_actual_usd: Decimal | None
    created_at: datetime
    updated_at: datetime
