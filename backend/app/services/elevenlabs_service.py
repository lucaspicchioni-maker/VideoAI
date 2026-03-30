import logging
import os
import uuid
from pathlib import Path

import aiofiles
from elevenlabs import AsyncElevenLabs
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.config import settings
from app.models.api_usage import ApiUsage
from app.models.asset import Asset
from app.models.character import Character

logger = logging.getLogger(__name__)

# ElevenLabs approximate cost: $0.30 per 1000 characters (Creator plan)
COST_PER_CHAR = 0.30 / 1000


class ElevenLabsService:
    def __init__(self) -> None:
        self.client = AsyncElevenLabs(api_key=settings.ELEVENLABS_API_KEY)
        self.storage_path = Path(settings.LOCAL_STORAGE_PATH) / "audio"
        self.storage_path.mkdir(parents=True, exist_ok=True)

    async def _save_audio(self, audio_bytes: bytes, filename: str) -> str:
        """Persist audio bytes to disk and return the local path."""
        path = self.storage_path / filename
        async with aiofiles.open(path, "wb") as f:
            await f.write(audio_bytes)
        return str(path)

    async def _log_usage(
        self,
        db: AsyncSession,
        agent: str,
        characters: int,
        episode_id: str | None = None,
    ) -> None:
        cost = characters * COST_PER_CHAR
        usage = ApiUsage(
            agent=agent,
            episode_id=episode_id,
            provider="elevenlabs",
            characters=characters,
            cost_usd=cost,
        )
        db.add(usage)
        await db.commit()

    async def _register_asset(
        self,
        db: AsyncSession,
        local_path: str,
        episode_id: str | None = None,
        scene_id: str | None = None,
        metadata: dict | None = None,
    ) -> Asset:
        size = os.path.getsize(local_path)
        asset = Asset(
            episode_id=episode_id,
            scene_id=scene_id,
            type="audio",
            provider="elevenlabs",
            local_path=local_path,
            size_bytes=size,
            metadata=metadata or {},
        )
        db.add(asset)
        await db.commit()
        return asset

    async def generate_narration(
        self,
        text: str,
        voice_id: str,
        settings_override: dict | None = None,
        db: AsyncSession | None = None,
        episode_id: str | None = None,
        scene_id: str | None = None,
    ) -> bytes:
        """Generate narration audio for the given text using ElevenLabs."""
        voice_settings = settings_override or {
            "stability": 0.5,
            "similarity_boost": 0.75,
            "style": 0.0,
        }

        audio_generator = await self.client.text_to_speech.convert(
            text=text,
            voice_id=voice_id,
            model_id="eleven_multilingual_v2",
            voice_settings=voice_settings,
        )

        audio_bytes = b"".join([chunk async for chunk in audio_generator])

        filename = f"narration_{uuid.uuid4().hex}.mp3"
        local_path = await self._save_audio(audio_bytes, filename)

        if db:
            await self._log_usage(db, "sound-director", len(text), episode_id)
            await self._register_asset(db, local_path, episode_id, scene_id, {"voice_id": voice_id})

        return audio_bytes

    async def generate_dialogue(
        self,
        text: str,
        character_id: str,
        db: AsyncSession,
        episode_id: str | None = None,
        scene_id: str | None = None,
    ) -> bytes:
        """Generate character dialogue audio, loading voice config from the DB."""
        result = await db.execute(select(Character).where(Character.id == character_id))
        character = result.scalar_one_or_none()
        if not character:
            raise ValueError(f"Character {character_id} not found")
        if not character.voice_id:
            raise ValueError(f"Character {character_id} has no voice_id configured")

        voice_settings = character.voice_settings or {
            "stability": 0.5,
            "similarity_boost": 0.75,
            "style": 0.0,
        }

        audio_generator = await self.client.text_to_speech.convert(
            text=text,
            voice_id=character.voice_id,
            model_id=character.voice_model,
            voice_settings=voice_settings,
        )

        audio_bytes = b"".join([chunk async for chunk in audio_generator])

        filename = f"dialogue_{character_id}_{uuid.uuid4().hex}.mp3"
        local_path = await self._save_audio(audio_bytes, filename)

        await self._log_usage(db, f"sound-director:{character.name}", len(text), episode_id)
        await self._register_asset(
            db,
            local_path,
            episode_id,
            scene_id,
            {"character_id": character_id, "voice_id": character.voice_id},
        )

        return audio_bytes

    async def test_voice_candidates(
        self, script: str, voice_ids: list[str]
    ) -> list[dict]:
        """Generate a test clip for each candidate voice and return results."""
        results = []
        for vid in voice_ids[:5]:  # cap at 5 candidates
            try:
                audio_generator = await self.client.text_to_speech.convert(
                    text=script[:200],  # short preview only
                    voice_id=vid,
                    model_id="eleven_multilingual_v2",
                )
                audio_bytes = b"".join([chunk async for chunk in audio_generator])
                filename = f"voice_test_{vid}_{uuid.uuid4().hex}.mp3"
                path = await self._save_audio(audio_bytes, filename)
                results.append({"voice_id": vid, "local_path": path, "ok": True})
            except Exception as exc:
                logger.warning("Voice test failed for %s: %s", vid, exc)
                results.append({"voice_id": vid, "error": str(exc), "ok": False})
        return results

    async def get_usage(self) -> dict:
        """Return remaining character quota from ElevenLabs subscription."""
        try:
            user = await self.client.user.get()
            sub = user.subscription
            return {
                "character_limit": sub.character_limit,
                "character_count": sub.character_count,
                "remaining": sub.character_limit - sub.character_count,
                "next_reset": str(sub.next_character_count_reset_unix),
            }
        except Exception as exc:
            logger.error("Could not fetch ElevenLabs usage: %s", exc)
            return {"error": str(exc)}
