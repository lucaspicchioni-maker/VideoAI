from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
    )

    # Database & Cache
    DATABASE_URL: str = "postgresql+asyncpg://postgres:postgres@localhost:5432/videoai"
    REDIS_URL: str = "redis://localhost:6379/0"

    # Anthropic
    ANTHROPIC_API_KEY: str = ""

    # ElevenLabs
    ELEVENLABS_API_KEY: str = ""
    NARRATOR_VOICE_ID: str = ""

    # Kling AI
    KLING_API_KEY: str = ""
    KLING_API_SECRET: str = ""

    # Midjourney
    MIDJOURNEY_WEBHOOK_URL: str = ""

    # Storage
    STORAGE_DRIVER: str = "local"  # local | s3 | gdrive
    GDRIVE_CREDENTIALS_JSON: str = ""
    AWS_S3_BUCKET: str = ""
    AWS_ACCESS_KEY_ID: str = ""
    AWS_SECRET_ACCESS_KEY: str = ""
    AWS_REGION: str = "us-east-1"
    LOCAL_STORAGE_PATH: str = "./storage"

    # App
    ENVIRONMENT: str = "development"  # development | production

    # Budget guardrails (USD)
    BUDGET_WARN_USD: float = 5.0
    BUDGET_BLOCK_USD: float = 15.0


settings = Settings()
