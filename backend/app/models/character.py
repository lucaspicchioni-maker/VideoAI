import uuid
from datetime import datetime

from sqlalchemy import Boolean, DateTime, ForeignKey, String, Text, func
from sqlalchemy.dialects.postgresql import JSON, UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base


class Character(Base):
    __tablename__ = "characters"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    project_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("projects.id", ondelete="CASCADE"), nullable=False
    )
    name: Mapped[str] = mapped_column(String(255), nullable=False)  # fictional name
    real_inspiration: Mapped[str | None] = mapped_column(String(255), nullable=True)
    description: Mapped[str] = mapped_column(Text, nullable=False, default="")
    cref_url: Mapped[str | None] = mapped_column(String(2048), nullable=True)  # Midjourney --cref URL
    voice_id: Mapped[str | None] = mapped_column(String(255), nullable=True)  # ElevenLabs voice_id
    voice_settings: Mapped[dict | None] = mapped_column(
        JSON, nullable=True
    )  # {stability, similarity_boost, style}
    voice_model: Mapped[str] = mapped_column(
        String(100), default="eleven_multilingual_v2"
    )  # eleven_v3 | eleven_multilingual_v2
    approved: Mapped[bool] = mapped_column(Boolean, default=False)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )

    # Relationships
    project: Mapped["Project"] = relationship("Project", back_populates="characters")  # noqa: F821
