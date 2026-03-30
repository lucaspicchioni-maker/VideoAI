import uuid
from datetime import datetime

from sqlalchemy import Boolean, DateTime, ForeignKey, Integer, String, Text, func
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base


class Scene(Base):
    __tablename__ = "scenes"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    episode_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("episodes.id", ondelete="CASCADE"), nullable=False
    )
    number: Mapped[int] = mapped_column(Integer, nullable=False)
    name: Mapped[str] = mapped_column(
        String(50), nullable=False
    )  # GANCHO | ÂNCORA | DESENVOLVIMENTO | VIRADA | CLIFFHANGER
    duration_seconds: Mapped[int] = mapped_column(Integer, default=5)  # 5 or 10

    description: Mapped[str | None] = mapped_column(Text, nullable=True)
    frame_a_prompt: Mapped[str | None] = mapped_column(Text, nullable=True)
    frame_b_prompt: Mapped[str | None] = mapped_column(Text, nullable=True)

    # Midjourney outputs
    frame_a_url: Mapped[str | None] = mapped_column(String(2048), nullable=True)
    frame_b_url: Mapped[str | None] = mapped_column(String(2048), nullable=True)

    # Kling outputs
    video_std_url: Mapped[str | None] = mapped_column(String(2048), nullable=True)
    video_pro_url: Mapped[str | None] = mapped_column(String(2048), nullable=True)

    # ElevenLabs outputs
    audio_narration_url: Mapped[str | None] = mapped_column(String(2048), nullable=True)
    audio_dialogue_url: Mapped[str | None] = mapped_column(String(2048), nullable=True)

    # Lip sync
    lip_sync_eligible: Mapped[bool] = mapped_column(Boolean, default=False)
    lip_sync_applied: Mapped[bool] = mapped_column(Boolean, default=False)

    # Kling task tracking
    kling_task_id: Mapped[str | None] = mapped_column(String(255), nullable=True)
    kling_lipsync_task_id: Mapped[str | None] = mapped_column(String(255), nullable=True)

    status: Mapped[str] = mapped_column(
        String(30), default="pending"
    )  # pending | images | audio | animation | done

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )

    # Relationships
    episode: Mapped["Episode"] = relationship("Episode", back_populates="scenes")  # noqa: F821
    assets: Mapped[list["Asset"]] = relationship("Asset", back_populates="scene")  # noqa: F821
