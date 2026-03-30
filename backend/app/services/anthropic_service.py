import json
import logging
from datetime import datetime, timezone

import anthropic
from sqlalchemy.ext.asyncio import AsyncSession

from app.config import settings
from app.models.api_usage import ApiUsage

logger = logging.getLogger(__name__)

SHOW_DIRECTOR_SYSTEM = """You are the Show Director for VideoAI Studio — an expert in crafting
compelling short-form vertical drama series for TikTok, Instagram Reels and YouTube Shorts.

Your specialties:
- Story structure for 60–90 second vertical episodes
- Character arcs that sustain 120+ episodes
- Emotional hooks in the first 3 seconds (GANCHO)
- Scene naming convention: GANCHO | ÂNCORA | DESENVOLVIMENTO | VIRADA | CLIFFHANGER
- Frame A + Frame B technique for Midjourney → Kling AI pipeline

Always respond in valid JSON when asked to generate structured content.
"""

SCRIPT_DIRECTOR_SYSTEM = """You are the Script Director for VideoAI Studio.
Given the series bible and episode metadata, generate a complete episode script.

Output format (strict JSON):
{
  "episode_title": "string",
  "emotional_arc": "string",
  "scenes": [
    {
      "number": 1,
      "name": "GANCHO",
      "duration_seconds": 5,
      "description": "string",
      "narration": "string",
      "dialogue": "string or null",
      "frame_a_prompt": "Midjourney prompt for opening frame",
      "frame_b_prompt": "Midjourney prompt for closing frame"
    }
  ]
}
"""


class AnthropicService:
    def __init__(self) -> None:
        self.client = anthropic.AsyncAnthropic(api_key=settings.ANTHROPIC_API_KEY)
        self.model = "claude-sonnet-4-6"

    async def _log_usage(
        self,
        db: AsyncSession,
        agent: str,
        input_tokens: int,
        output_tokens: int,
        episode_id: str | None = None,
    ) -> None:
        # Approximate cost: $3 per 1M input, $15 per 1M output (Sonnet 4)
        cost = (input_tokens / 1_000_000) * 3.0 + (output_tokens / 1_000_000) * 15.0
        usage = ApiUsage(
            agent=agent,
            episode_id=episode_id,
            provider="anthropic",
            input_tokens=input_tokens,
            output_tokens=output_tokens,
            cost_usd=cost,
        )
        db.add(usage)
        await db.commit()

    async def generate_bible(
        self, project_brief: str, db: AsyncSession
    ) -> dict:
        """Generate a full series bible from a brief project description."""
        prompt = f"""Given this project brief, generate a complete series bible as JSON:

{project_brief}

The bible must include:
- series_title, tagline, logline
- genre, target_platform, total_episodes
- themes (list)
- characters (list with name, role, arc, personality)
- season_arcs (list with season number, title, summary)
- visual_style (description, color_palette, mood)
- narrative_rules (list of writing constraints)
- disclaimer: "Esta é uma obra de ficção."
"""
        message = await self.client.messages.create(
            model=self.model,
            max_tokens=4096,
            system=SHOW_DIRECTOR_SYSTEM,
            messages=[{"role": "user", "content": prompt}],
        )

        await self._log_usage(
            db,
            agent="show-director",
            input_tokens=message.usage.input_tokens,
            output_tokens=message.usage.output_tokens,
        )

        raw = message.content[0].text
        # Strip markdown code fences if present
        if raw.startswith("```"):
            raw = raw.split("```")[1]
            if raw.startswith("json"):
                raw = raw[4:]
        return json.loads(raw.strip())

    async def generate_episode_script(
        self,
        episode_data: dict,
        bible: str,
        db: AsyncSession,
        episode_id: str | None = None,
    ) -> dict:
        """Generate a structured episode script using the series bible."""
        prompt = f"""Series bible:
{bible}

Episode to write:
{json.dumps(episode_data, ensure_ascii=False, indent=2)}

Generate the full episode script following the scene structure and Frame A+B technique.
Each scene needs a Midjourney-ready prompt for frame_a and frame_b.
"""
        message = await self.client.messages.create(
            model=self.model,
            max_tokens=4096,
            system=SCRIPT_DIRECTOR_SYSTEM,
            messages=[{"role": "user", "content": prompt}],
        )

        await self._log_usage(
            db,
            agent="script-director",
            input_tokens=message.usage.input_tokens,
            output_tokens=message.usage.output_tokens,
            episode_id=episode_id,
        )

        raw = message.content[0].text
        if raw.startswith("```"):
            raw = raw.split("```")[1]
            if raw.startswith("json"):
                raw = raw[4:]
        return json.loads(raw.strip())

    async def interview_user(
        self, messages: list[dict], db: AsyncSession
    ) -> str:
        """Showrunner interview mode — asks questions before generating the bible."""
        system = (
            SHOW_DIRECTOR_SYSTEM
            + "\n\nYou are interviewing the creator to gather all information needed "
            "to produce the series bible. Ask one focused question at a time. "
            "When you have enough information, respond with 'READY_TO_GENERATE' "
            "followed by a JSON summary of everything gathered."
        )

        response = await self.client.messages.create(
            model=self.model,
            max_tokens=1024,
            system=system,
            messages=messages,
        )

        await self._log_usage(
            db,
            agent="showrunner-interview",
            input_tokens=response.usage.input_tokens,
            output_tokens=response.usage.output_tokens,
        )

        return response.content[0].text

    async def stream_bible(self, project_brief: str):
        """Streaming version of generate_bible for long responses."""
        prompt = f"Generate a series bible for:\n\n{project_brief}"
        async with self.client.messages.stream(
            model=self.model,
            max_tokens=4096,
            system=SHOW_DIRECTOR_SYSTEM,
            messages=[{"role": "user", "content": prompt}],
        ) as stream:
            async for text in stream.text_stream:
                yield text
