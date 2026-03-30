# Mapeamento: Agentes, Extensões e Repos por Módulo
**VideoAI Studio — Análise baseada no PRD-midia-studio.md**
*Gerado em 2026-03-30*

---

## Status Geral

| Módulo | Agente no Projeto | SDK/Repo Baixado | Pronto para Dev |
|---|---|---|---|
| M1 — Diretor Geral (Showrunner) | ✅ `agents/show-director.md` | ✅ anthropic-sdk-python | Parcial |
| M2 — Diretor de Fotografia (Midjourney) | ✅ `agents/midjourney-director.md` | ⚠️ Sem SDK oficial | Parcial |
| M3 — Diretor de Som (ElevenLabs) | ❌ Falta criar | ✅ elevenlabs-python | Falta agente |
| M4 — Diretor de Animação (Kling AI) | ❌ Falta criar | ❌ Falta SDK Kling | Falta tudo |
| M5 — Diretor de Pós-Produção (FFMPEG) | ❌ Falta criar | ✅ ffmpeg-python + moviepy | Falta agente |
| M6 — Dashboard & Controle Financeiro | ❌ Falta criar | ✅ Next-js-Boilerplate | Falta agente |

---

## 1. Agentes que Precisam ser Criados

Os arquivos abaixo devem ser criados em `agents/`:

### `agents/sound-director.md` — Módulo 3
Especialista ElevenLabs. Deve conter:
- Regras de casting de vozes (sugere 5 por personagem)
- Parâmetros travados por personagem: `voice_id`, `stability`, `similarity`, `style`
- Seleção de modelo: `Multilingual v2` (narração) vs `Eleven v3` (diálogos)
- Inline tags de emoção: `[whispers]`, `[sighs]`, `[laughs]`
- Regra anti-Flash: nunca usar modelo Flash em produção

### `agents/animation-director.md` — Módulo 4
Especialista Kling AI 3.0. Deve conter:
- Regra de prompt: descreve só MOVIMENTO + CÂMERA, nunca a imagem
- Endpoint obrigatório em cada prompt (ex: `...settling into stillness`)
- Negativas explícitas obrigatórias (ex: `no new objects, no door openings`)
- Configuração: `enable_audio=False`, testes em 720p, final em 1080p
- Critérios de Lip Sync: áudio > 2s, rosto frontal 0–15°, sem oclusão
- Encadeamento via `origin_task_id`

### `agents/postproduction-director.md` — Módulo 5
Motor Python + FFMPEG. Deve conter:
- Regra de padding: áudio < 2s → adicionar silêncio antes do Lip Sync
- Assembly Order: ordem de montagem definida pelo Diretor Geral
- Text Overlays: letreiros, mensagens WhatsApp, contadores
- Mix de trilha: 15% narração → 60% no Cliffhanger

### `agents/dashboard-controller.md` — Módulo 6
Dashboard financeiro. Deve conter:
- Coleta de uso por API: ElevenLabs (chars), Kling (gerações), MJ (GPU hours), Anthropic (tokens)
- Estimativa de custo pré-produção antes de apertar "Produzir"

---

## 2. Repos GitHub — O que Já Está e o que Falta

### ✅ Já Baixados (30 repos em `tools/external/`)

**Video Pipelines (estudar arquitetura):**
- `MoneyPrinterTurbo` — pipeline mais completo: script → voz → vídeo 9:16
- `ShortGPT` — ContentShortEngine: roteiro → narração → b-roll
- `auto-shorts`, `short-video-maker`, `MoneyPrinterV2`, `shortfactory`
- `Director`, `MovieAgent`, `VideoAgent`, `MM_StoryAgent` — agentes de direção
- `ViMax`, `carocut`, `montage-ai`, `autoclip`, `video-avatars-agent`

**Backend FastAPI:**
- `full-stack-fastapi-template` — base oficial com PostgreSQL + Docker
- `FastAPI-boilerplate` — Pydantic V2 + SQLAlchemy 2.0 + Redis
- `minimal-fastapi-postgres-template` — minimalista, Alembic, asyncpg

**Frontend:**
- `Next-js-Boilerplate` — Next.js 16 + Tailwind + App Router
- `nextjs-fastapi-template` — type safety end-to-end Zod ↔ Pydantic

**SDKs de IA:**
- `anthropic-sdk-python` — Claude API (Módulo 1)
- `claude-cookbooks` — RAG + tool use com Claude
- `claude-quickstarts` — projetos de referência com Claude
- `claude-agent-sdk-python` — Agent SDK oficial
- `elevenlabs-python` — SDK ElevenLabs oficial (Módulo 3)
- `elevenlabs-examples` — exemplos práticos ElevenLabs

**FFMPEG:**
- `ffmpeg-python` — padrão de mercado para Python
- `moviepy` — alto nível: cortes, concatenação, texto sobre vídeo

**Job Queues:**
- `bullmq` — fila Redis para pipeline assíncrono
- `fastapi-celery` — FastAPI + Celery + Docker

**BMAD Framework:**
- `bmad-method/` — framework completo com todos os agentes de desenvolvimento

### ❌ Falta Baixar

| Repo | URL | Por quê |
|---|---|---|
| **fal-ai/fal-js** ou **fal-ai/fal-python** | github.com/fal-ai/fal | Alternativa ao Kling API — geração de vídeo por API REST (mais documentado) |
| **Stability-AI/stable-video-diffusion** | github.com/Stability-AI/generative-models | Referência técnica para animação de imagens estáticas |
| **openai/whisper** | github.com/openai/whisper | Transcrição de áudio para geração de legendas automáticas (SRT) no Módulo 5 |
| **jdepoix/youtube-transcript-api** | github.com/jdepoix/youtube-transcript-api | Extração de transcrições para análise de tendências (Trend Intelligence) |
| **aiortc/aiortc** ou **livekit/livekit** | github.com/livekit/livekit | Streaming de preview em tempo real no Dashboard |
| **dagster-io/dagster** | github.com/dagster-io/dagster | Orquestração visual do pipeline — alternativa ao BullMQ para pipelines complexos |

---

## 3. BMAD Agents — O que Já Está Disponível

O `bmad-method/` já contém todos os agentes de desenvolvimento prontos para uso:

| Agente BMAD | Localização | Uso no VideoAI |
|---|---|---|
| `bmad-agent-pm` | `src/bmm-skills/2-plan-workflows/bmad-agent-pm` | Destrinchar User Stories do PRD |
| `bmad-agent-architect` | `src/bmm-skills/3-solutioning/bmad-agent-architect` | Modelar banco + estrutura de pastas |
| `bmad-agent-dev` | `src/bmm-skills/4-implementation/bmad-agent-dev` | Escrever código dos serviços |
| `bmad-agent-qa` | `src/bmm-skills/4-implementation/bmad-agent-qa` | Testes e2e dos módulos |
| `bmad-agent-sm` | `src/bmm-skills/4-implementation/bmad-agent-sm` | Sprint planning e retrospectiva |
| `bmad-agent-analyst` | `src/bmm-skills/1-analysis/bmad-agent-analyst` | Análise de requisitos |
| `bmad-agent-ux-designer` | `src/bmm-skills/2-plan-workflows/bmad-agent-ux-designer` | UI do Showrunner Chat + Dashboard |
| `bmad-brainstorming` | `src/core-skills/bmad-brainstorming` | Sessões de ideação com o Diretor Geral |

---

## 4. Extensões VSCode Recomendadas

Para trabalhar no VideoAI com máxima produtividade:

| Extensão | ID | Módulo |
|---|---|---|
| Prisma | `Prisma.prisma` | Banco de dados (syntax + autocomplete) |
| Python | `ms-python.python` | Backend FastAPI + FFMPEG scripts |
| Pylance | `ms-python.vscode-pylance` | Type checking Python |
| REST Client | `humao.rest-client` | Testar APIs Kling/ElevenLabs/Anthropic |
| Thunder Client | `rangav.vscode-thunder-client` | Alternativa ao Postman no VSCode |
| Tailwind CSS IntelliSense | `bradlc.vscode-tailwindcss` | Frontend Next.js |
| ES7+ React Snippets | `dsznajder.es7-react-js-snippets` | Componentes do Dashboard |
| Docker | `ms-azuretools.vscode-docker` | Deploy Railway |
| GitLens | `eamodio.gitlens` | Histórico e colaboração |
| Error Lens | `usernamehw.errorlens` | Debug inline |

---

## 5. Próximas Ações (Ordem Sugerida)

```
1. Criar agents/sound-director.md       (Módulo 3 — ElevenLabs)
2. Criar agents/animation-director.md   (Módulo 4 — Kling AI)
3. Criar agents/postproduction-director.md (Módulo 5 — FFMPEG)
4. Criar agents/dashboard-controller.md (Módulo 6 — Financeiro)
5. Baixar repos faltantes (whisper, fal-python)
6. Executar primeiro passo BMAD: "Arquiteto → modelar PostgreSQL + estrutura FastAPI"
```
