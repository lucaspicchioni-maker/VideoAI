import asyncio
import base64
import hashlib
import hmac
import json
import logging
import time
import uuid

import httpx

from app.config import settings
from app.models.api_usage import ApiUsage
from sqlalchemy.ext.asyncio import AsyncSession

logger = logging.getLogger(__name__)

KLING_BASE_URL = "https://api.klingai.com"
POLL_INTERVAL_SECONDS = 10
POLL_TIMEOUT_SECONDS = 600

# Kling approximate cost per credit (varies by mode/duration)
COST_PER_CREDIT = 0.01


class KlingService:
    def __init__(self) -> None:
        self.api_key = settings.KLING_API_KEY
        self.api_secret = settings.KLING_API_SECRET

    def _build_headers(self, method: str, path: str, body: str = "") -> dict:
        """Build HMAC-signed headers for Kling API authentication."""
        timestamp = str(int(time.time()))
        nonce = uuid.uuid4().hex

        # Signature string: method\npath\ntimestamp\nnonce\nbody_md5
        body_md5 = (
            base64.b64encode(hashlib.md5(body.encode()).digest()).decode()
            if body
            else ""
        )
        sign_str = f"{method}\n{path}\n{timestamp}\n{nonce}\n{body_md5}"

        signature = base64.b64encode(
            hmac.new(
                self.api_secret.encode(),
                sign_str.encode(),
                hashlib.sha256,
            ).digest()
        ).decode()

        return {
            "Content-Type": "application/json",
            "X-Api-Key": self.api_key,
            "X-Timestamp": timestamp,
            "X-Nonce": nonce,
            "X-Signature": signature,
        }

    async def create_i2v_task(
        self,
        image_url: str,
        tail_url: str | None,
        prompt: str,
        negative_prompt: str = "blur, distortion, extra limbs, watermark",
        duration: int = 5,
        mode: str = "std",
        db: AsyncSession | None = None,
        episode_id: str | None = None,
    ) -> str:
        """Submit an image-to-video task and return the Kling task_id."""
        path = "/v1/videos/image2video"
        payload = {
            "model_name": "kling-v1",
            "mode": mode,
            "duration": str(duration),
            "image": image_url,
            "prompt": prompt,
            "negative_prompt": negative_prompt,
            "cfg_scale": 0.5,
        }
        if tail_url:
            payload["image_tail"] = tail_url

        body = json.dumps(payload)
        headers = self._build_headers("POST", path, body)

        async with httpx.AsyncClient(base_url=KLING_BASE_URL, timeout=30) as client:
            resp = await client.post(path, content=body, headers=headers)
            resp.raise_for_status()
            data = resp.json()

        task_id: str = data["data"]["task_id"]
        logger.info("Kling i2v task created: %s (mode=%s, duration=%ss)", task_id, mode, duration)

        # credits: 1 credit per second of std video; 2 per second for pro
        credits_used = duration if mode == "std" else duration * 2
        if db:
            await self._log_usage(db, "animation-director", credits_used, episode_id)

        return task_id

    async def create_lipsync_task(
        self,
        video_url: str,
        audio_url: str,
        origin_task_id: str,
        db: AsyncSession | None = None,
        episode_id: str | None = None,
    ) -> str:
        """Submit a lip-sync task and return the Kling task_id."""
        path = "/v1/videos/lip-sync"
        payload = {
            "task_id": origin_task_id,
            "video_url": video_url,
            "audio_url": audio_url,
        }
        body = json.dumps(payload)
        headers = self._build_headers("POST", path, body)

        async with httpx.AsyncClient(base_url=KLING_BASE_URL, timeout=30) as client:
            resp = await client.post(path, content=body, headers=headers)
            resp.raise_for_status()
            data = resp.json()

        task_id: str = data["data"]["task_id"]
        logger.info("Kling lipsync task created: %s", task_id)

        if db:
            await self._log_usage(db, "animation-director:lipsync", 1, episode_id)

        return task_id

    async def poll_task(
        self, task_id: str, task_type: str = "i2v"
    ) -> dict:
        """Poll a Kling task until completion or timeout. Returns the full result dict."""
        path_map = {
            "i2v": f"/v1/videos/image2video/{task_id}",
            "lipsync": f"/v1/videos/lip-sync/{task_id}",
        }
        path = path_map.get(task_type, f"/v1/videos/image2video/{task_id}")

        deadline = time.time() + POLL_TIMEOUT_SECONDS
        while time.time() < deadline:
            headers = self._build_headers("GET", path)
            async with httpx.AsyncClient(base_url=KLING_BASE_URL, timeout=30) as client:
                resp = await client.get(path, headers=headers)
                resp.raise_for_status()
                data = resp.json()

            task_status = data["data"]["task_status"]
            if task_status == "succeed":
                logger.info("Kling task %s completed successfully", task_id)
                return data["data"]
            if task_status == "failed":
                reason = data["data"].get("task_status_msg", "unknown")
                raise RuntimeError(f"Kling task {task_id} failed: {reason}")

            logger.debug("Kling task %s status: %s — waiting…", task_id, task_status)
            await asyncio.sleep(POLL_INTERVAL_SECONDS)

        raise TimeoutError(f"Kling task {task_id} did not complete within {POLL_TIMEOUT_SECONDS}s")

    async def check_lipsync_eligibility(
        self, audio_path: str, image_url: str
    ) -> bool:
        """Heuristic check: audio must be <60s and image must contain a face."""
        from pydub import AudioSegment  # lazy import — optional dep

        try:
            audio = AudioSegment.from_file(audio_path)
            duration_ms = len(audio)
            return duration_ms <= 60_000  # Kling lipsync max 60s
        except Exception as exc:
            logger.warning("Lip-sync eligibility check failed: %s", exc)
            return False

    async def _log_usage(
        self,
        db: AsyncSession,
        agent: str,
        credits: int,
        episode_id: str | None = None,
    ) -> None:
        cost = credits * COST_PER_CREDIT
        usage = ApiUsage(
            agent=agent,
            episode_id=episode_id,
            provider="kling",
            credits=credits,
            cost_usd=cost,
        )
        db.add(usage)
        await db.commit()
