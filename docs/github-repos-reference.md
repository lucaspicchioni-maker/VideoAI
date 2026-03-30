# GitHub Repos de Referência — VideoAI Studio

> Atualizado em 2026-03-30. Total: 38 repos em `tools/external/`.

---

## TOP 10 — Clonar Primeiro

| # | Repo | Stars | Motivo |
|---|------|-------|--------|
| 1 | [harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) | ~23k | Pipeline mais próximo do VideoAI: tema → script → voz → legenda → vídeo vertical 9:16 |
| 2 | [fastapi/full-stack-fastapi-template](https://github.com/fastapi/full-stack-fastapi-template) | ~30k | Template oficial do criador do FastAPI. PostgreSQL, Docker, CI/CD — base do backend |
| 3 | [RayVentura/ShortGPT](https://github.com/RayVentura/ShortGPT) | ~6k | ContentShortEngine: Roteiro → Voz → Vídeo. Referência direta de pipeline |
| 4 | [vintasoftware/nextjs-fastapi-template](https://github.com/vintasoftware/nextjs-fastapi-template) | ~1.5k | Next.js + FastAPI com type safety end-to-end (Zod + Pydantic) |
| 5 | [kkroening/ffmpeg-python](https://github.com/kkroening/ffmpeg-python) | ~11k | Binding padrão Python para FFMPEG — pós-produção e composição de vídeo |
| 6 | [Zulko/moviepy](https://github.com/Zulko/moviepy) | ~12k | Alto nível sobre FFMPEG. Cortes, concatenação, texto sobre vídeo |
| 7 | [elevenlabs/elevenlabs-python](https://github.com/elevenlabs/elevenlabs-python) | ~2.5k | SDK oficial ElevenLabs — narração e dublagem dos episódios |
| 8 | [anthropics/anthropic-sdk-python](https://github.com/anthropics/anthropic-sdk-python) | ~3k | SDK oficial Claude — agente roteirista, ideação, Diretor Geral |
| 9 | [taskforcesh/bullmq](https://github.com/taskforcesh/bullmq) | ~16k | Fila Redis para orquestrar pipeline assíncrono (imagem → vídeo → áudio) |
| 10 | [anthropics/claude-cookbooks](https://github.com/anthropics/claude-cookbooks) | ~1.5k | Receitas: tool use + RAG com Claude — agente de roteirização com bíblia da série |

---

## Por Categoria

### Boilerplates FastAPI + PostgreSQL

| Repo | Stars | Destaque |
|------|-------|----------|
| [fastapi/full-stack-fastapi-template](https://github.com/fastapi/full-stack-fastapi-template) | ~30k | Oficial. SQLModel, Docker, Traefik, CI/CD |
| [benavlabs/FastAPI-boilerplate](https://github.com/benavlabs/FastAPI-boilerplate) | ~5k | Async, Pydantic V2, SQLAlchemy 2.0, Redis integrado |
| [rafsaf/minimal-fastapi-postgres-template](https://github.com/rafsaf/minimal-fastapi-postgres-template) | ~1.5k | Minimalista. asyncpg, Alembic, Dockerfile pronto |

### AI Video Generation Pipelines

| Repo | Stars | Destaque |
|------|-------|----------|
| [harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) | ~23k | **#1 de referência**. Vídeos verticais 9:16 com IA completo |
| [RayVentura/ShortGPT](https://github.com/RayVentura/ShortGPT) | ~6k | ContentShortEngine — pipeline de Shorts automatizado |
| [hpcaitech/Open-Sora](https://github.com/hpcaitech/Open-Sora) | ~22k | Referência técnica de geração de vídeo com IA (como o Kling funciona) |
| [alamshafil/auto-shorts](https://github.com/alamshafil/auto-shorts) | ~1.2k | Web UI Next.js + Express para geração de vídeo |
| [gyoridavid/short-video-maker](https://github.com/gyoridavid/short-video-maker) | ~900 | TTS + legendas + música. API compatível com agentes IA / n8n |

### FFMPEG Python

| Repo | Stars | Destaque |
|------|-------|----------|
| [kkroening/ffmpeg-python](https://github.com/kkroening/ffmpeg-python) | ~11k | Padrão de mercado. Filter graphs complexos |
| [Zulko/moviepy](https://github.com/Zulko/moviepy) | ~12k | Alto nível. Usado em ShortGPT e MoneyPrinterTurbo |
| [python-ffmpegio/python-ffmpegio](https://github.com/python-ffmpegio/python-ffmpegio) | ~300 | Mais moderno. Streams de áudio/vídeo, I/O de dados |

### ElevenLabs

| Repo | Stars | Destaque |
|------|-------|----------|
| [elevenlabs/elevenlabs-python](https://github.com/elevenlabs/elevenlabs-python) | ~2.5k | SDK oficial. TTS, streaming async, múltiplos formatos |
| [elevenlabs/elevenlabs-examples](https://github.com/elevenlabs/elevenlabs-examples) | ~800 | Exemplos oficiais: TTS, agents, integrações |
| [GabrielLaxy/TikTokAIVideoGenerator](https://github.com/GabrielLaxy/TikTokAIVideoGenerator) | ~400 | ElevenLabs + imagens + legendas para vídeo vertical |

### Anthropic Claude Agents

| Repo | Stars | Destaque |
|------|-------|----------|
| [anthropics/anthropic-sdk-python](https://github.com/anthropics/anthropic-sdk-python) | ~3k | SDK oficial Python |
| [anthropics/claude-quickstarts](https://github.com/anthropics/claude-quickstarts) | ~2k | Projetos prontos: agente de suporte, analista de dados |
| [anthropics/claude-cookbooks](https://github.com/anthropics/claude-cookbooks) | ~1.5k | RAG, tool use, Skills, MCP — receitas práticas |
| [anthropics/claude-agent-sdk-python](https://github.com/anthropics/claude-agent-sdk-python) | ~500 | Agent SDK oficial (o mesmo que roda o Claude Code) |

### Next.js + FastAPI Fullstack

| Repo | Stars | Destaque |
|------|-------|----------|
| [vintasoftware/nextjs-fastapi-template](https://github.com/vintasoftware/nextjs-fastapi-template) | ~1.5k | Type safety end-to-end Zod ↔ Pydantic |
| [ixartz/Next-js-Boilerplate](https://github.com/ixartz/Next-js-Boilerplate) | ~10k | Next.js 16 + App Router + Tailwind CSS 4 + Drizzle ORM |

### Job Queues

| Repo | Stars | Destaque |
|------|-------|----------|
| [taskforcesh/bullmq](https://github.com/taskforcesh/bullmq) | ~16k | O próprio BullMQ. Rate limiting, retry, prioridade |
| [testdrivenio/fastapi-celery](https://github.com/testdrivenio/fastapi-celery) | ~1k | FastAPI + Celery + Docker. Padrão para background tasks |

### Video Content Automation

| Repo | Stars | Destaque |
|------|-------|----------|
| [FujiwaraChoki/MoneyPrinterV2](https://github.com/FujiwaraChoki/MoneyPrinterV2) | ~15.7k | Pipeline + Twitter bot + multi-canal. Ollama local |
| [FujiwaraChoki/MoneyPrinter](https://github.com/FujiwaraChoki/MoneyPrinter) | ~12k | Versão original. Código mais simples para estudar a lógica |
| [vvinniev34/RedditReels](https://github.com/vvinniev34/RedditReels) | ~600 | Gerador + uploader automático TikTok/Shorts/Reels |
| [realwarpie/shortfactory](https://github.com/realwarpie/shortfactory) | ~400 | Plataforma modular inspirada no ShortGPT |

---

---

## Rodada 2 — Repos Adicionados (2026-03-30)

| Repo | Stars | Módulo | Uso |
|---|---|---|---|
| [openai/whisper](https://github.com/openai/whisper) | ~75k | M5 Pós-produção | Gera legendas SRT automáticas a partir do áudio da narração |
| [ManimCommunity/manim](https://github.com/ManimCommunity/manim) | ~20k | M5 Pós-produção | Animações programáticas: contadores de dinheiro, gráficos, overlays |
| [guoyww/AnimateDiff](https://github.com/guoyww/AnimateDiff) | ~10k | M4 Animação | Alternativa local ao Kling para animar imagens Midjourney |
| [Stability-AI/generative-models](https://github.com/Stability-AI/generative-models) | ~24k | M4 Animação | SVD (Stable Video Diffusion) — referência técnica de animação |
| [WyattBlue/auto-editor](https://github.com/WyattBlue/auto-editor) | ~12k | M5 Pós-produção | Edição automática por silêncio/movimento — corte de cenas mortas |
| [coqui-ai/TTS](https://github.com/coqui-ai/TTS) | ~36k | M3 Som | TTS open source — alternativa gratuita ao ElevenLabs para testes locais |
| [suno-ai/bark](https://github.com/suno-ai/bark) | ~37k | M3 Som | Gera fala + trilha sonora + SFX via texto — música dos episódios |
| [remotion-dev/remotion](https://github.com/remotion-dev/remotion) | ~22k | M6 Dashboard | Vídeo programático com React — overlays animados via código |

**Skips:** FFmpeg/FFmpeg (código fonte C, gigabytes) · moviepy (já existia)

---

## Todos os Repos em `tools/external/` (38 total)

**Video Pipelines:** MoneyPrinterTurbo · ShortGPT · auto-shorts · short-video-maker · MoneyPrinterV2 · shortfactory · Director · MovieAgent · VideoAgent · ViMax · MM_StoryAgent · autoclip · carocut · montage-ai · video-avatars-agent · AnimateDiff · generative-models · auto-editor

**Backend FastAPI:** full-stack-fastapi-template · FastAPI-boilerplate · minimal-fastapi-postgres-template · fastapi-celery

**Frontend:** Next-js-Boilerplate · nextjs-fastapi-template · remotion

**SDKs de IA:** anthropic-sdk-python · claude-cookbooks · claude-quickstarts · claude-agent-sdk-python · elevenlabs-python · elevenlabs-examples

**Áudio / TTS:** coqui-tts · bark

**FFMPEG / Vídeo:** ffmpeg-python · moviepy · whisper · manim

**Job Queues:** bullmq · fastapi-celery

*(todos em `.gitignore` — não serão commitados)*
