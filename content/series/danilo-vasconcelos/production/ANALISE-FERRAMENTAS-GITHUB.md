# Analise de Ferramentas GitHub para VideoAI

Data: 2026-03-28

---

## RANKING POR RELEVANCIA PARA O VIDEOAI

### TIER S — USAR AGORA

#### 1. ShortGPT (7.2k stars)
**O que faz:** Framework completo para automatizar criacao de Shorts/Reels/TikTok. Pipeline end-to-end: script -> voiceover -> assets -> edicao -> video final.
**Stack:** Python | GPT/Gemini | ElevenLabs | MoviePy | Gradio UI
**Por que e TIER S:** Faz exatamente o que precisamos. Ja integra ElevenLabs, gera legendas automaticas, suporta 30+ idiomas. Docker pronto. E o mais maduro (7.2k stars).
**Limitacao:** Usa stock footage (Pexels) em vez de imagens geradas por IA. Precisamos adaptar para usar Midjourney/Kling.
**Acao:** Clonar, rodar, entender a arquitetura. Adaptar o asset sourcing para nosso pipeline MJ+Kling.

#### 2. ViMax (2.5k stars)
**O que faz:** Sistema agentico end-to-end: conceito -> script -> storyboard -> personagem -> video. Tem modulos Idea2Video, Novel2Video, Script2Video e AutoCameo.
**Stack:** Python 3.12 | Gemini 2.5 Flash | Google Veo API | uv
**Por que e TIER S:** O Script2Video e exatamente nosso caso — roteiro pronto vira video. O AutoCameo pode manter consistencia do Danilo. Novel2Video pode converter a biblia inteira em episodios automaticamente.
**Limitacao:** Usa Veo (Google) para video, nao Kling. Precisaria adaptar.
**Acao:** Clonar, testar Script2Video com roteiro do EP01. Avaliar qualidade do Veo vs Kling.

---

### TIER A — INTEGRAR NO PIPELINE

#### 3. MovieAgent (308 stars)
**O que faz:** Gera filmes multi-cena com agentes simulando equipe de producao (diretor, roteirista, storyboard artist). Consistencia de personagem via LoRA.
**Stack:** Python 3.8 | GPT-4o | HunyuanVideo-I2V | Diffusers
**Por que e TIER A:** O sistema multi-agente e o que queremos para escalar — agentes especializados por funcao. Consistencia de personagem com LoRA resolve nosso problema de manter o Danilo igual em 120 episodios (melhor que --cref do MJ).
**Limitacao:** Setup pesado (precisa GPU, baixar modelos). Academico, menos production-ready.
**Acao:** Estudar a arquitetura multi-agente. Extrair o pattern de agentes por funcao (Director, Screenwriter, etc) para o VideoAI.

#### 4. Director by VideoDB (1.3k stars)
**O que faz:** Framework para construir video agents com chat. 20+ agentes pre-built (summarization, generation, search, dubbing, subtitling).
**Stack:** Python + Node/Vue | VideoDB | OpenAI
**Por que e TIER A:** Arquitetura extensivel. Podemos criar nossos proprios agentes (Roteirista, Diretor Visual, Produtor) dentro dele. Interface chat ja pronta. Multi-agent orchestration built-in.
**Limitacao:** Depende do VideoDB (servico pago). Interface web, nao CLI.
**Acao:** Avaliar se o custo do VideoDB compensa. Se sim, usar como base do dashboard do VideoAI.

#### 5. VideoAgent by HKUDS (551 stars)
**O que faz:** Framework integrado para entender, editar e criar videos via linguagem natural. Usa Claude para routing, GPT-4o para edicao, DeepSeek para remixing.
**Stack:** Python 3.10 | Claude + GPT-4o + DeepSeek + Gemini | CosyVoice | Whisper
**Por que e TIER A:** Multi-model approach inteligente — cada modelo faz o que faz melhor. Graph-based workflows com feedback loops. Pode automatizar a montagem dos episodios.
**Limitacao:** Setup complexo (muitos modelos para baixar). 551 stars = comunidade menor.
**Acao:** Estudar o sistema de graph-based workflows. Extrair o pattern de intent decomposition.

---

### TIER B — COMPONENTES UTEIS

#### 6. MM-StoryAgent (305 stars)
**O que faz:** Framework multi-agente para storytelling: gera texto + imagem + audio + musica + video coordenados.
**Stack:** Python | GPT-4 | Multi-agent modular
**Por que e TIER B:** A ideia de coordenar geracao de imagem + audio + musica e relevante. Sistema de avaliacao de qualidade incluso.
**Limitacao:** Ultimo update agosto 2024. Menos ativo.
**Acao:** Extrair o sistema de avaliacao de qualidade e o pattern de coordenacao cross-modal.

#### 7. Video Avatars Agent (138 stars)
**O que faz:** Gera videos educacionais longos com avatares customizados usando Google ADK. Converte documentacao tecnica em scripts de video.
**Stack:** Python 3.11 | Gemini Flash | Veo 3.1 | Google Cloud | ADK
**Por que e TIER B:** Consistencia de personagem em chunks de 8 segundos e exatamente nosso desafio. Multi-agent com Google ADK e uma abordagem moderna.
**Limitacao:** Depende 100% do ecossistema Google (Vertex AI, Cloud Run, GCS).
**Acao:** Estudar como mantém consistencia de personagem ao longo do video. Extrair o pattern de chunking.

---

### TIER C — REFERENCIA

#### 8. Awesome Text-to-Video Generation (259 stars)
**O que e:** Lista curada de papers e ferramentas de text-to-video. Referencia academica.
**Util para:** Descobrir novos modelos e tecnicas. AnimateDiff, LaVIE, DynamiCrafter sao relevantes.
**Limitacao:** Ultimo update fev 2024. Desatualizado.

#### 9. VideoAgent (video-as-agent) (77 stars)
**O que faz:** Treino de politicas de video para controle robotico. NAO e relevante para producao de conteudo.
**Acao:** Ignorar.

#### 10. GitHub Topics: ai-video-editor
**O que e:** Pagina de topicos do GitHub. Agrega projetos com a tag ai-video-editor.
**Util para:** Descobrir novos projetos periodicamente.

---

### NOVO — DESCOBERTAS DO GITHUB TOPICS

#### bilibili/carocut (27 stars) — POTENCIAL TIER S
**O que faz:** Plataforma de producao automatizada de video da Bilibili. Transforma materiais brutos (PDFs, imagens, texto) em videos profissionais via multi-agent.
**Stack:** Next.js + React + TypeScript (67.5%) | Node 18+ | Python 3.9+ | Remotion | OpenCode AI SDK | ffmpeg
**Por que importa:** MESMA STACK QUE A NOSSA (Next.js/TypeScript). 5 agentes especializados, 12 skills, checkpoint/recovery com progress.yaml, render via Remotion (React-based). Da Bilibili (plataforma real, nao academico).
**Status:** Novo (marco 2026), 19 commits. Early stage mas de empresa grande.
**Acao:** Estudar arquitetura multi-agente e adaptar para nosso pipeline. Substituir Pexels/Pixabay por MJ/Kling, edge-tts por ElevenLabs.

#### mfahsold/montage-ai (21 stars) — TIER A para post-producao
**O que faz:** Ferramenta de post-producao automatizada: beat-sync, legendas, conversao 16:9->9:16, export para DaVinci/Premiere.
**Stack:** Python 86% | Docker | ffmpeg | Ollama/Gemini/OpenAI
**Por que importa:** Pode SUBSTITUIR o CapCut no pipeline. 7 templates de estilo, smart aspect ratio, audio ducking, voice isolation, quality profiles ate 4K.
**Status:** 523 commits, ativo (fev 2026). O mais maduro dos novos.
**Acao:** Testar como substituto do CapCut para automatizar a montagem.

#### zhouxiaoka/autoclip (3.2k stars) — TIER B para otimizacao
**O que faz:** Deteccao de highlights com IA, auto-clipping, compilacao automatica.
**Stack:** FastAPI + Celery + Redis | React 18 + TypeScript | Qwen AI | Docker
**Por que importa:** Arquitetura FastAPI+Celery+Redis similar ao nosso BullMQ. Util para fase de otimizacao (detectar melhores momentos dos videos).
**Status:** Ativo, 63 commits.

---

## ESTRATEGIA RECOMENDADA

### Fase 1 — AGORA (Producao manual otimizada)
Usar o pipeline atual (MJ + Kling + ElevenLabs + CapCut) com os guias que ja criamos.
Produzir os primeiros 5-10 episodios manualmente para validar o conteudo.

### Fase 2 — SEMI-AUTOMATIZADO (Semana 2-3)
- **Clonar ShortGPT** e adaptar para gerar narracoes + legendas automaticamente
- **Clonar ViMax** e testar Script2Video com nossos roteiros
- Integrar ElevenLabs via API (ja suportado pelo ShortGPT)

### Fase 3 — FULL PIPELINE (Mes 2)
- Extrair arquitetura multi-agente do **MovieAgent** e **Director**
- Criar agentes VideoAI customizados:
  - **Roteirista Agent** — gera roteiro a partir da biblia
  - **Visual Agent** — gera prompts MJ + Kling automaticamente
  - **Audio Agent** — gera narracao + trilha
  - **Editor Agent** — monta o video final
  - **Publisher Agent** — publica em 3 plataformas
- Treinar LoRA do Danilo para consistencia perfeita (tecnica do MovieAgent)

### Fase 4 — ESCALA (Mes 3+)
- Pipeline 100% automatizado: biblia -> episodios -> publicacao
- Meta: 3-5 episodios/dia com 1 pessoa revisando
- Dashboard web (baseado no Director) para monitorar producao
