import logging

from app.config import settings

logger = logging.getLogger(__name__)

# Pricing constants (USD, approximate)
ANTHROPIC_COST_PER_1K_INPUT = 0.003   # Sonnet 4
ANTHROPIC_COST_PER_1K_OUTPUT = 0.015
ELEVENLABS_COST_PER_CHAR = 0.00030     # Creator plan
KLING_STD_COST_PER_SEC = 0.010
KLING_PRO_COST_PER_SEC = 0.020
KLING_LIPSYNC_COST_FLAT = 0.010        # per scene


def estimate_episode_cost(episode_data: dict) -> dict:
    """
    Estimate the full cost of producing an episode before rendering.

    episode_data keys (all optional with sensible defaults):
      - scene_count: int
      - avg_duration_seconds: int
      - use_pro_animation: bool
      - include_lipsync: bool
      - narration_chars_per_scene: int
      - script_input_tokens: int
      - script_output_tokens: int
    """
    scene_count: int = episode_data.get("scene_count", 10)
    avg_duration: int = episode_data.get("avg_duration_seconds", 7)
    use_pro: bool = episode_data.get("use_pro_animation", False)
    include_lipsync: bool = episode_data.get("include_lipsync", False)
    chars_per_scene: int = episode_data.get("narration_chars_per_scene", 300)

    # Script generation (Anthropic)
    script_input_tokens: int = episode_data.get("script_input_tokens", 2000)
    script_output_tokens: int = episode_data.get("script_output_tokens", 4000)
    anthropic_cost = (
        (script_input_tokens / 1000) * ANTHROPIC_COST_PER_1K_INPUT
        + (script_output_tokens / 1000) * ANTHROPIC_COST_PER_1K_OUTPUT
    )

    # Narration audio (ElevenLabs)
    total_chars = scene_count * chars_per_scene
    elevenlabs_cost = total_chars * ELEVENLABS_COST_PER_CHAR

    # Animation (Kling)
    rate = KLING_PRO_COST_PER_SEC if use_pro else KLING_STD_COST_PER_SEC
    kling_animation_cost = scene_count * avg_duration * rate

    # Lip-sync (Kling)
    kling_lipsync_cost = (scene_count * KLING_LIPSYNC_COST_FLAT) if include_lipsync else 0.0

    kling_cost = kling_animation_cost + kling_lipsync_cost

    total = anthropic_cost + elevenlabs_cost + kling_cost

    return {
        "scene_count": scene_count,
        "avg_duration_seconds": avg_duration,
        "anthropic_usd": round(anthropic_cost, 4),
        "elevenlabs_usd": round(elevenlabs_cost, 4),
        "kling_animation_usd": round(kling_animation_cost, 4),
        "kling_lipsync_usd": round(kling_lipsync_cost, 4),
        "kling_usd": round(kling_cost, 4),
        "total_usd": round(total, 4),
    }


def check_guardrails(estimate: dict) -> dict:
    """
    Evaluate the cost estimate against configured budget guardrails.

    Returns:
      proceed  — safe to run
      warn     — above soft limit, proceed with caution
      block    — above hard limit, require explicit override
    """
    total = estimate.get("total_usd", 0.0)
    warn_limit = settings.BUDGET_WARN_USD
    block_limit = settings.BUDGET_BLOCK_USD

    if total >= block_limit:
        level = "block"
        message = (
            f"Estimated cost ${total:.2f} exceeds the hard limit of ${block_limit:.2f}. "
            "Reduce scene count or disable Pro animation before proceeding."
        )
    elif total >= warn_limit:
        level = "warn"
        message = (
            f"Estimated cost ${total:.2f} is above the soft limit of ${warn_limit:.2f}. "
            "Review the breakdown before starting production."
        )
    else:
        level = "proceed"
        message = f"Estimated cost ${total:.2f} is within budget limits."

    return {
        "guardrail": level,
        "message": message,
        "total_usd": total,
        "warn_limit_usd": warn_limit,
        "block_limit_usd": block_limit,
    }
