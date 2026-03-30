import uuid
from datetime import datetime

from sqlalchemy import DateTime, ForeignKey, Integer, Numeric, String, Text, func
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base


class Episode(Base):
    __tablename__ = "episodes"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    project_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("projects.id", ondelete="CASCADE"), nullable=False
    )
    season: Mapped[int] = mapped_column(Integer, default=1)
    number: Mapped[int] = mapped_column(Integer, nullable=False)  # episode number within season
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    slug: Mapped[str] = mapped_column(String(255), nullable=False)
    period: Mapped[str | None] = mapped_column(String(255), nullable=True)  # timeline period covered
    emotional_arc: Mapped[str | None] = mapped_column(String(500), nullable=True)
    script: Mapped[str | None] = mapped_column(Text, nullable=True)  # full script as JSON string
    status: Mapped[str] = mapped_column(
        String(30), default="scripted"
    )  # scripted | images | audio | animation | assembly | done
    cost_estimate_usd: Mapped[float | None] = mapped_column(Numeric(10, 4), nullable=True)
    cost_actual_usd: Mapped[float | None] = mapped_column(Numeric(10, 4), nullable=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )

    # Relationships
    project: Mapped["Project"] = relationship("Project", back_populates="episodes")  # noqa: F821
    scenes: Mapped[list["Scene"]] = relationship(  # noqa: F821
        "Scene", back_populates="episode", cascade="all, delete-orphan"
    )
    assets: Mapped[list["Asset"]] = relationship(  # noqa: F821
        "Asset", back_populates="episode"
    )
    api_usages: Mapped[list["ApiUsage"]] = relationship(  # noqa: F821
        "ApiUsage", back_populates="episode"
    )
    production_jobs: Mapped[list["ProductionJob"]] = relationship(  # noqa: F821
        "ProductionJob", back_populates="episode", cascade="all, delete-orphan"
    )
