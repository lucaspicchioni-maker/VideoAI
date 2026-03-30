import uuid
from datetime import datetime

from sqlalchemy import DateTime, String, Text, Integer, func
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base


class Project(Base):
    __tablename__ = "projects"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=False, default="")
    genre: Mapped[str] = mapped_column(String(50), nullable=False)  # drama | comedy | documentary
    target_platform: Mapped[str] = mapped_column(String(50), nullable=False)  # tiktok | reels | shorts
    total_episodes: Mapped[int] = mapped_column(Integer, default=0)
    status: Mapped[str] = mapped_column(String(30), default="planning")  # planning | production | published
    bible: Mapped[str | None] = mapped_column(Text, nullable=True)  # JSON string of the full series bible
    style_ref_url: Mapped[str | None] = mapped_column(String(2048), nullable=True)  # Midjourney --sref URL
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )

    # Relationships
    characters: Mapped[list["Character"]] = relationship(  # noqa: F821
        "Character", back_populates="project", cascade="all, delete-orphan"
    )
    episodes: Mapped[list["Episode"]] = relationship(  # noqa: F821
        "Episode", back_populates="project", cascade="all, delete-orphan"
    )
