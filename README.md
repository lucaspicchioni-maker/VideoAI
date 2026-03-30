# VideoAI Studio

Plataforma de produção de séries e vídeos virais com IA.

**Pipeline:** Anthropic → Midjourney V7 → ElevenLabs → Kling AI 3.0 → FFMPEG

---

## Setup em 5 passos

### 1. Variáveis de ambiente

```bash
cp .env.example .env
# Edite .env e preencha as chaves de API
```

### 2. Subir infra local (PostgreSQL + Redis)

```bash
docker compose up postgres redis -d
# Aguarda ~10s e verifica:
docker compose ps
```

### 3. Backend Python

```bash
cd backend
pip install -r requirements.txt
# Rodar migrations
alembic upgrade head
# Iniciar servidor
uvicorn main:app --reload --port 8000
```

### 4. Frontend Next.js

```bash
cd app
cp .env.local.example .env.local   # ou editar o .env.local existente
npm install
npm run dev
# Abre em http://localhost:3000
```

### 5. Verificar

- Frontend: http://localhost:3000
- Backend API: http://localhost:8000/docs
- pgAdmin (opcional): `docker compose --profile tools up pgadmin -d` → http://localhost:5050

---

## Estrutura do Projeto

```
VideoAI/
├── app/                    # Next.js frontend (TypeScript)
│   ├── src/
│   │   ├── app/            # App Router pages
│   │   ├── components/     # UI components
│   │   └── services/       # API client
│   └── prisma/             # Prisma schema
├── backend/                # FastAPI backend (Python)
│   └── app/
│       ├── models/         # SQLAlchemy models
│       ├── schemas/        # Pydantic schemas
│       ├── routers/        # API endpoints
│       └── services/       # Anthropic, ElevenLabs, Kling, FFMPEG
├── migrations/             # SQL migrations (run on docker compose up)
├── agents/                 # AI agent prompts (6 agents)
│   ├── show-director.md
│   ├── midjourney-director.md
│   ├── sound-director.md
│   ├── animation-director.md
│   ├── postproduction-director.md
│   └── dashboard-controller.md
├── content/                # Série Danilo Vasconcelos
├── docs/                   # PRD e documentação
├── tools/external/         # Repos de referência (não commitados)
├── docker-compose.yml
└── .env.example
```

---

## APIs utilizadas

| API | Uso | Documentação |
|---|---|---|
| Anthropic Claude | Roteiro, ideação, agentes | https://docs.anthropic.com |
| ElevenLabs | Narração, dublagem, SFX | https://elevenlabs.io/docs |
| Kling AI | Animação imagem→vídeo, Lip Sync | https://kling.ai/quickstart |
| Midjourney V7 | Geração de imagens 9:16 | https://docs.midjourney.com |

---

## Comandos úteis

```bash
# Backend
uvicorn main:app --reload              # dev server
celery -A app.worker worker            # job queue
alembic revision --autogenerate -m ""  # new migration
alembic upgrade head                   # apply migrations

# Frontend
npm run dev                            # dev server
npm run build                          # production build
npx prisma studio                      # DB browser

# Docker
docker compose up -d                   # start all services
docker compose logs -f backend         # watch backend logs
docker compose down -v                 # stop + remove volumes
```

---

## Produção atual

Série **Danilo Vasconcelos — O Anti-Herói** — EP01 "O Sorriso" em produção.

- Bíblia: `content/danilo_biblia_v2.md`
- Prompts MJ: `content/ep01-prompts-midjourney.md`
- Pipeline atual: Midjourney V7 → Kling AI → ElevenLabs → CapCut

> "Esta é uma obra de ficção. Todos os personagens e situações são fictícios."
