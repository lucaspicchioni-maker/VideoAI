-- VideoAI Studio — Initial Migration
-- Runs automatically on first: docker compose up
-- Or manually: psql -U videoai -d videoai -f migrations/001_initial.sql

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enums
CREATE TYPE project_status AS ENUM ('PLANNING','PRODUCTION','PAUSED','COMPLETED');
CREATE TYPE episode_status AS ENUM ('SCRIPTED','IMAGES','AUDIO','ANIMATION','ASSEMBLY','DONE','PUBLISHED');
CREATE TYPE scene_status AS ENUM ('PENDING','IMAGES_GENERATING','IMAGES_DONE','AUDIO_GENERATING','AUDIO_DONE','ANIMATING','ANIMATION_DONE','DONE');
CREATE TYPE asset_type AS ENUM ('IMAGE','VIDEO_STD','VIDEO_PRO','AUDIO_NARRATION','AUDIO_DIALOGUE','AUDIO_SFX','AUDIO_MIXED','SRT','FINAL_VIDEO');
CREATE TYPE job_type AS ENUM ('FULL_EPISODE','GENERATE_SCRIPT','GENERATE_IMAGES','GENERATE_AUDIO','ANIMATE_SCENE','LIPSYNC_SCENE','ASSEMBLE_EPISODE');
CREATE TYPE job_status AS ENUM ('QUEUED','RUNNING','DONE','FAILED','CANCELLED');
CREATE TYPE provider_type AS ENUM ('ANTHROPIC','ELEVENLABS','KLING','MIDJOURNEY');

CREATE TABLE projects (
    id              TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    name            TEXT NOT NULL,
    description     TEXT,
    genre           TEXT NOT NULL,
    target_platform TEXT NOT NULL,
    total_episodes  INT NOT NULL DEFAULT 0,
    status          project_status NOT NULL DEFAULT 'PLANNING',
    bible           TEXT,
    style_ref_url   TEXT,
    cover_image_url TEXT,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE characters (
    id               TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    project_id       TEXT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    name             TEXT NOT NULL,
    real_inspiration TEXT,
    description      TEXT NOT NULL,
    physical_profile TEXT,
    cref_url         TEXT,
    voice_id         TEXT,
    voice_model      TEXT,
    voice_settings   JSONB,
    approved         BOOLEAN NOT NULL DEFAULT FALSE,
    created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_characters_project ON characters(project_id);

CREATE TABLE episodes (
    id                TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    project_id        TEXT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    season            INT NOT NULL DEFAULT 1,
    number            INT NOT NULL,
    title             TEXT NOT NULL,
    slug              TEXT NOT NULL,
    period            TEXT,
    emotional_arc     TEXT,
    key_revelation    TEXT,
    script            TEXT,
    narration_text    TEXT,
    status            episode_status NOT NULL DEFAULT 'SCRIPTED',
    cost_estimate_usd NUMERIC(10,4),
    cost_actual_usd   NUMERIC(10,4),
    final_video_url   TEXT,
    published_at      TIMESTAMPTZ,
    created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(project_id, season, number)
);
CREATE INDEX idx_episodes_project ON episodes(project_id);
CREATE INDEX idx_episodes_status ON episodes(status);

CREATE TABLE scenes (
    id                    TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    episode_id            TEXT NOT NULL REFERENCES episodes(id) ON DELETE CASCADE,
    character_id          TEXT REFERENCES characters(id),
    number                INT NOT NULL,
    name                  TEXT NOT NULL,
    duration_seconds      INT NOT NULL DEFAULT 5,
    description           TEXT,
    frame_a_prompt        TEXT,
    frame_b_prompt        TEXT,
    frame_a_url           TEXT,
    frame_b_url           TEXT,
    motion_prompt         TEXT,
    negative_prompt       TEXT,
    video_std_url         TEXT,
    video_pro_url         TEXT,
    audio_narration_url   TEXT,
    audio_dialogue_url    TEXT,
    lip_sync_eligible     BOOLEAN NOT NULL DEFAULT FALSE,
    lip_sync_applied      BOOLEAN NOT NULL DEFAULT FALSE,
    kling_task_id         TEXT,
    kling_lipsync_task_id TEXT,
    status                scene_status NOT NULL DEFAULT 'PENDING',
    created_at            TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at            TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(episode_id, number)
);
CREATE INDEX idx_scenes_episode ON scenes(episode_id);
CREATE INDEX idx_scenes_status ON scenes(status);

CREATE TABLE assets (
    id               TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    episode_id       TEXT REFERENCES episodes(id),
    scene_id         TEXT,
    type             asset_type NOT NULL,
    provider         TEXT NOT NULL,
    url              TEXT,
    local_path       TEXT,
    size_bytes       BIGINT,
    duration_seconds FLOAT,
    metadata         JSONB,
    created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_assets_episode ON assets(episode_id);

CREATE TABLE production_jobs (
    id             TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    episode_id     TEXT NOT NULL REFERENCES episodes(id) ON DELETE CASCADE,
    type           job_type NOT NULL,
    status         job_status NOT NULL DEFAULT 'QUEUED',
    celery_task_id TEXT,
    progress       INT NOT NULL DEFAULT 0,
    current_step   TEXT,
    started_at     TIMESTAMPTZ,
    finished_at    TIMESTAMPTZ,
    error_message  TEXT,
    metadata       JSONB,
    created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_jobs_episode ON production_jobs(episode_id);
CREATE INDEX idx_jobs_status ON production_jobs(status);

CREATE TABLE api_usage (
    id            TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    agent         TEXT NOT NULL,
    project_id    TEXT REFERENCES projects(id),
    episode_id    TEXT REFERENCES episodes(id),
    provider      provider_type NOT NULL,
    input_tokens  INT NOT NULL DEFAULT 0,
    output_tokens INT NOT NULL DEFAULT 0,
    characters    INT NOT NULL DEFAULT 0,
    credits       INT NOT NULL DEFAULT 0,
    fast_minutes  FLOAT NOT NULL DEFAULT 0,
    cost_usd      NUMERIC(10,6) NOT NULL DEFAULT 0,
    created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_usage_provider ON api_usage(provider);
CREATE INDEX idx_usage_episode ON api_usage(episode_id);
CREATE INDEX idx_usage_created_at ON api_usage(created_at);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS '
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
';
CREATE TRIGGER trg_projects_upd   BEFORE UPDATE ON projects   FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_characters_upd BEFORE UPDATE ON characters FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_episodes_upd   BEFORE UPDATE ON episodes   FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_scenes_upd     BEFORE UPDATE ON scenes     FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Seed: Danilo Vasconcelos project
INSERT INTO projects (id, name, description, genre, target_platform, total_episodes, status) VALUES (
    'danilo-vasconcelos-001',
    'Danilo Vasconcelos — O Anti-Herói',
    'Serie vertical de drama. 3 temporadas, 120 episodios, 9:16.',
    'drama', 'tiktok', 120, 'PRODUCTION'
);

SELECT 'Migration 001 complete.' AS result;
