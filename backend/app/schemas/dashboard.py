from pydantic import BaseModel


class UsageCurrentResponse(BaseModel):
    anthropic_tokens_today: int
    anthropic_cost_today_usd: float
    elevenlabs_characters_today: int
    elevenlabs_cost_today_usd: float
    kling_credits_today: int
    kling_cost_today_usd: float
    total_cost_today_usd: float
    elevenlabs_remaining_characters: int | None = None


class UsageHistoryEntry(BaseModel):
    episode_id: str
    episode_title: str
    provider: str
    cost_usd: float
    created_at: str


class UsageHistoryResponse(BaseModel):
    entries: list[UsageHistoryEntry]
    total_cost_usd: float


class CostEstimateRequest(BaseModel):
    episode_id: str | None = None
    scene_count: int = 10
    avg_duration_seconds: int = 7
    use_pro_animation: bool = False
    include_lipsync: bool = False
    narration_chars_per_scene: int = 300


class CostBreakdown(BaseModel):
    anthropic_usd: float
    elevenlabs_usd: float
    kling_usd: float
    total_usd: float
    guardrail: str  # proceed | warn | block
    message: str


class AlertResponse(BaseModel):
    level: str  # info | warn | critical
    message: str
    current_spend_usd: float
    limit_usd: float
