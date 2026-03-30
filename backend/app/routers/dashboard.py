from datetime import datetime, timezone

from fastapi import APIRouter, Depends
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.config import settings
from app.database import get_db
from app.models.api_usage import ApiUsage
from app.models.episode import Episode
from app.schemas.dashboard import (
    AlertResponse,
    CostBreakdown,
    CostEstimateRequest,
    UsageCurrentResponse,
    UsageHistoryEntry,
    UsageHistoryResponse,
)
from app.services.cost_estimator import check_guardrails, estimate_episode_cost
from app.services.elevenlabs_service import ElevenLabsService

router = APIRouter(prefix="/dashboard", tags=["dashboard"])
_elevenlabs = ElevenLabsService()


@router.get("/usage/current", response_model=UsageCurrentResponse)
async def get_current_usage(db: AsyncSession = Depends(get_db)):
    """Return today's API consumption and costs across all providers."""
    today_start = datetime.now(timezone.utc).replace(
        hour=0, minute=0, second=0, microsecond=0
    )

    async def _sum(provider: str, column):
        result = await db.execute(
            select(func.sum(column)).where(
                ApiUsage.provider == provider,
                ApiUsage.created_at >= today_start,
            )
        )
        return result.scalar() or 0

    anthropic_tokens = await _sum("anthropic", ApiUsage.input_tokens + ApiUsage.output_tokens)
    anthropic_cost = float(await _sum("anthropic", ApiUsage.cost_usd))

    el_chars = await _sum("elevenlabs", ApiUsage.characters)
    el_cost = float(await _sum("elevenlabs", ApiUsage.cost_usd))

    kling_credits = await _sum("kling", ApiUsage.credits)
    kling_cost = float(await _sum("kling", ApiUsage.cost_usd))

    el_usage = await _elevenlabs.get_usage()
    remaining = el_usage.get("remaining")

    return UsageCurrentResponse(
        anthropic_tokens_today=int(anthropic_tokens),
        anthropic_cost_today_usd=anthropic_cost,
        elevenlabs_characters_today=int(el_chars),
        elevenlabs_cost_today_usd=el_cost,
        kling_credits_today=int(kling_credits),
        kling_cost_today_usd=kling_cost,
        total_cost_today_usd=round(anthropic_cost + el_cost + kling_cost, 4),
        elevenlabs_remaining_characters=remaining,
    )


@router.get("/usage/history", response_model=UsageHistoryResponse)
async def get_usage_history(db: AsyncSession = Depends(get_db)):
    """Return per-episode cost history across all providers."""
    result = await db.execute(
        select(ApiUsage, Episode.title)
        .outerjoin(Episode, ApiUsage.episode_id == Episode.id)
        .order_by(ApiUsage.created_at.desc())
        .limit(200)
    )
    rows = result.all()

    entries = [
        UsageHistoryEntry(
            episode_id=str(row.ApiUsage.episode_id or ""),
            episode_title=row.title or "—",
            provider=row.ApiUsage.provider,
            cost_usd=float(row.ApiUsage.cost_usd),
            created_at=row.ApiUsage.created_at.isoformat(),
        )
        for row in rows
    ]

    total = sum(e.cost_usd for e in entries)
    return UsageHistoryResponse(entries=entries, total_cost_usd=round(total, 4))


@router.post("/estimate", response_model=CostBreakdown)
async def estimate_cost(payload: CostEstimateRequest):
    """Return a cost estimate breakdown for the given episode parameters."""
    est = estimate_episode_cost(payload.model_dump())
    guard = check_guardrails(est)

    return CostBreakdown(
        anthropic_usd=est["anthropic_usd"],
        elevenlabs_usd=est["elevenlabs_usd"],
        kling_usd=est["kling_usd"],
        total_usd=est["total_usd"],
        guardrail=guard["guardrail"],
        message=guard["message"],
    )


@router.get("/alerts", response_model=list[AlertResponse])
async def get_alerts(db: AsyncSession = Depends(get_db)):
    """Return budget alerts based on total spend today."""
    today_start = datetime.now(timezone.utc).replace(
        hour=0, minute=0, second=0, microsecond=0
    )
    result = await db.execute(
        select(func.sum(ApiUsage.cost_usd)).where(ApiUsage.created_at >= today_start)
    )
    total_today = float(result.scalar() or 0)

    alerts: list[AlertResponse] = []

    if total_today >= settings.BUDGET_BLOCK_USD:
        alerts.append(
            AlertResponse(
                level="critical",
                message=(
                    f"Daily spend ${total_today:.2f} has reached the hard limit "
                    f"(${settings.BUDGET_BLOCK_USD:.2f}). New production jobs are blocked."
                ),
                current_spend_usd=total_today,
                limit_usd=settings.BUDGET_BLOCK_USD,
            )
        )
    elif total_today >= settings.BUDGET_WARN_USD:
        alerts.append(
            AlertResponse(
                level="warn",
                message=(
                    f"Daily spend ${total_today:.2f} has exceeded the soft limit "
                    f"(${settings.BUDGET_WARN_USD:.2f}). Review before continuing."
                ),
                current_spend_usd=total_today,
                limit_usd=settings.BUDGET_WARN_USD,
            )
        )
    else:
        alerts.append(
            AlertResponse(
                level="info",
                message=f"Daily spend ${total_today:.2f} is within budget.",
                current_spend_usd=total_today,
                limit_usd=settings.BUDGET_WARN_USD,
            )
        )

    return alerts
