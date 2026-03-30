import json
import uuid

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.database import get_db
from app.models.character import Character
from app.models.project import Project
from app.schemas.project import (
    CharacterCreate,
    CharacterResponse,
    ProjectCreate,
    ProjectResponse,
    ProjectUpdate,
    ProjectWithCharacters,
)
from app.services.anthropic_service import AnthropicService

router = APIRouter(tags=["projects"])
anthropic_svc = AnthropicService()


@router.get("/projects", response_model=list[ProjectResponse])
async def list_projects(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Project).order_by(Project.created_at.desc()))
    return result.scalars().all()


@router.post("/projects", response_model=ProjectWithCharacters, status_code=status.HTTP_201_CREATED)
async def create_project(payload: ProjectCreate, db: AsyncSession = Depends(get_db)):
    """Create a new project and automatically generate its series bible via Claude."""
    project = Project(**payload.model_dump())
    db.add(project)
    await db.flush()  # get the id before bible generation

    try:
        brief = (
            f"Name: {project.name}\n"
            f"Description: {project.description}\n"
            f"Genre: {project.genre}\n"
            f"Platform: {project.target_platform}\n"
            f"Episodes planned: {project.total_episodes}"
        )
        bible_dict = await anthropic_svc.generate_bible(brief, db)
        project.bible = json.dumps(bible_dict, ensure_ascii=False)
        project.status = "planning"
    except Exception as exc:
        # Bible generation failure is non-fatal — project is still created
        project.bible = None

    await db.commit()
    await db.refresh(project)

    result = await db.execute(
        select(Project)
        .options(selectinload(Project.characters))
        .where(Project.id == project.id)
    )
    return result.scalar_one()


@router.get("/projects/{project_id}", response_model=ProjectWithCharacters)
async def get_project(project_id: uuid.UUID, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Project)
        .options(selectinload(Project.characters))
        .where(Project.id == project_id)
    )
    project = result.scalar_one_or_none()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project


@router.patch("/projects/{project_id}", response_model=ProjectResponse)
async def update_project(
    project_id: uuid.UUID,
    payload: ProjectUpdate,
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(select(Project).where(Project.id == project_id))
    project = result.scalar_one_or_none()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    for field, value in payload.model_dump(exclude_unset=True).items():
        setattr(project, field, value)

    await db.commit()
    await db.refresh(project)
    return project


@router.delete("/projects/{project_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_project(project_id: uuid.UUID, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Project).where(Project.id == project_id))
    project = result.scalar_one_or_none()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    await db.delete(project)
    await db.commit()


@router.post(
    "/projects/{project_id}/characters",
    response_model=CharacterResponse,
    status_code=status.HTTP_201_CREATED,
)
async def add_character(
    project_id: uuid.UUID,
    payload: CharacterCreate,
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(select(Project).where(Project.id == project_id))
    if not result.scalar_one_or_none():
        raise HTTPException(status_code=404, detail="Project not found")

    character = Character(project_id=project_id, **payload.model_dump())
    db.add(character)
    await db.commit()
    await db.refresh(character)
    return character


@router.get("/projects/{project_id}/characters", response_model=list[CharacterResponse])
async def list_characters(project_id: uuid.UUID, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Character)
        .where(Character.project_id == project_id)
        .order_by(Character.created_at)
    )
    return result.scalars().all()
