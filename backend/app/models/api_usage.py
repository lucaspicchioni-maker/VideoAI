import uuid
from datetime import datetime

from sqlalchemy import DateTime, Float, ForeignKey, Integer, Numeric, String, func
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base


class ApiUsage(Base):
    __tablename__ = "api_usage"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    agent: Mapped[str] = mapped_column(
        String(100), nullable=False
    )  # show-director | sound-director | etc.
    episode_id: Mapped[uuid.UUID | None] = mapped_column(
        UUID(as_uuid=True), ForeignKey("episodes.id", ondelete="SET NULL"), nullable=True
    )
    provider: Mapped[str] = mapped_column(
        String(50), nullable=False
    )  # anthropic | elevenlabs | kling | midjourney
    input_tokens: Mapped[int] = mapped_column(Integer, default=0)
    output_tokens: Mapped[int] = mapped_column(Integer, default=0)
    characters: Mapped[int] = mapped_column(Integer, default=0)  # ElevenLabs
    credits: Mapped[int] = mapped_column(Integer, default=0)  # Kling
    fast_minutes: Mapped[float] = mapped_column(Float, default=0.0)  # Midjourney
    cost_usd: Mapped[float] = mapped_column(Numeric(10, 6), default=0.0)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )

    # Relationships
    episode: Mapped["Episode | None"] = relationship("Episode", back_populates="api_usages")  # noqa: F821
