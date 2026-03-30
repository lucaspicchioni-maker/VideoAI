# MidIA Studio: VideoAI
**Versão:** 1.0
**Metodologia:** BMAD (Breakthrough Method for Agile AI-Driven Development)

---

> **Nota Editorial:** Este documento é o descritivo técnico INICIAL do sistema. Ele será atualizado continuamente conforme aprendizados práticos de produção. O objetivo é organizar e criar uma esteira (pipeline) para produção de vídeos por IA.

---

## 1. Visão Geral do Sistema

O **VideoAI Studio** é uma plataforma web (SaaS/Ferramenta Interna) desenhada para automatizar e escalar a produção de séries e vídeos virais (TikTok, Reels, Shorts) utilizando um pipeline 100% guiado por IA:

```
Anthropic (Roteiro/Agentes)
  → Midjourney V7 (Imagens)
  → ElevenLabs (Áudio)
  → Kling AI 3.0 (Vídeo)
  → Python + FFMPEG (Pós-produção)
```

### 1.1. Princípio de Consistência de Produção (Regra Inviolável)

O sistema deve SEMPRE pensar na produção completa do episódio ou vídeo antes de gerar qualquer cena individualmente. Para cada cena, o sistema obrigatoriamente avalia:

| Dimensão | Checklist |
|---|---|
| Personagem | Roupas consistentes ao longo da cena, sem troca não justificada |
| Corpo e movimento | Sem atravessar paredes, portas e viradas de corpo executadas corretamente |
| Cenário | Detalhes do ambiente mantidos, sem objetos surgindo aleatoriamente |
| Pessoas | Definir se há figurantes, quantos, posicionamento |
| Câmera | Ângulo definido antes da geração (close, plano aberto, over-the-shoulder, etc.) |
| Áudio | Se há fala, narração, trilha sonora ou silêncio — definido antes da geração |
| Distorções | Antecipação de possíveis artefatos de IA e mitigação via prompt |

Nada é gerado aleatoriamente ou genericamente. Toda cena é produzida com intenção.

---

### 1.2. Stack de Infraestrutura (Railway)

| Camada | Tecnologia | Motivo |
|---|---|---|
| Back-end | Python (FastAPI) | Ideal para scripts pesados de FFMPEG e orquestração de agentes |
| Front-end | React / Next.js | Interface de Chat fluida para o Diretor Geral + Dashboards |
| Banco de Dados | PostgreSQL (Railway) | Metadados, URLs de `--oref`, `voice_id`, status de tarefas |
| Storage de Mídia | Google Drive API ou Cloudflare R2 (S3-compatible) | Railway usa disco efêmero — arquivos `.mp4`, `.mp3`, `.png` ficam no storage externo |
| Orquestração LLM | Anthropic API (Claude Sonnet) | Agentes especialistas com contexto longo e raciocínio estruturado |

---

### 1.3. Manual de Boas Práticas por Ferramenta (Pré-requisito Obrigatório)

> **ATENÇÃO:** Antes de qualquer ação de produção, o sistema deve criar o Manual de Boas Práticas consultando a documentação oficial de cada ferramenta. As fontes a serem acessadas são:

| Ferramenta | Documentação Oficial |
|---|---|
| Kling AI (Quickstart) | https://kling.ai/quickstart |
| Kling AI (API) | https://kling.ai/document-api/quickStart/productIntroduction/overview |
| ElevenLabs | https://elevenlabs.io/docs/api-reference/introduction |
| Midjourney V7 | https://docs.midjourney.com/hc/en-us/articles/33329261836941-Getting-Started-Guide |

O Manual de Boas Práticas deve ser gerado com todas as informações extraídas dessas fontes, incluindo limites de API, parâmetros recomendados, restrições e casos de erro conhecidos.

---

## 2. Os Módulos do Sistema (Agentes Especialistas)

### Módulo 1 — Diretor Geral (Showrunner Chat)

**Interface:** Chat interativo estilo ChatGPT na tela inicial do projeto.

**Comportamento da IA:**
O Diretor (Claude via API) **NÃO** gera o manual imediatamente. Ele primeiro entrevista o usuário com perguntas precisas:

- Plataforma alvo e estratégia de retenção (ritmo dos 3 primeiros segundos)
- Estilo visual e paleta de cores
- Quantidade de episódios e duração média
- Tendências atuais do momento
- Personalidade profunda dos personagens
- Críticas e sugestões sobre a ideia apresentada

**Entregável:**
Após o brainstorming, o Diretor gera a **Bíblia do Projeto** estruturada e salva no banco de dados. Conteúdo da Bíblia:

- Mapa de produção completo
- Roteiro cena a cena com a estrutura: **Gancho → Âncora → Desenvolvimento → Virada → Cliffhanger**
- Prompts base para alimentar os demais agentes

---

### Módulo 2 — Diretor de Fotografia (Especialista Midjourney V7)

**Função:** Criar e manter a consistência visual de personagens e cenários.

**Regras Invioláveis:**

1. Sempre usar `--oref [URL_CDN]` para referência de personagens, com `--ow 150` para fidelidade facial.
2. **Nunca** descrever rosto, corpo ou cabelo no prompt quando usar `--oref`. O prompt foca em: roupa, ação, iluminação e câmera.
3. Para continuidade entre cenas: gera o **Frame A** → usuário aprova → a IA usa a URL gerada como `--sref [URL]` (com `--sw 200`) para gerar o **Frame B**.
4. Nenhuma imagem pode conter textos, números ou timestamps (exclusividade do Módulo 5 — Pós-produção).

---

### Módulo 3 — Diretor de Som (Especialista ElevenLabs)

**Função:** Casting de vozes, narração, dublagem e sonoplastia (SFX).

**Regras Invioláveis:**

1. O sistema consome a API da ElevenLabs e sugere **5 vozes de teste** para cada personagem recém-criado.
2. Após a escolha, o sistema **trava** o `voice_id` e os parâmetros (`stability`, `similarity`, `style`) no banco de dados — garantindo consistência em todos os episódios.
3. Modelos por uso:
   - `Multilingual v2` → narração longa
   - `Eleven v3` → diálogos dramáticos (suporta inline tags como `[whispers]`, `[sighs]`)
4. **Nunca** usar o modelo `Flash` (focado em tempo real — qualidade insuficiente para produção final).

---

### Módulo 4 — Diretor de Animação (Especialista Kling AI 3.0 / OMNi)

**Função:** Transformar frames estáticos em movimento cinemático e sincronizar fala (Lip Sync).

**Regras Invioláveis:**

1. **Prompt de movimento:** Descreve apenas o MOVIMENTO e a CÂMERA. Nunca redescreve a imagem. Deve ter um endpoint claro (ex: `...settling into stillness`).
2. **Negativas explícitas:** Sempre descrever o que não pode acontecer (ex: `no doors opening, no new objects appearing`).
3. **Configuração padrão:**
   - `enable_audio=False` por padrão
   - Duração flexível: 3–15 segundos
   - Testes em **Standard (720p)** / Renderização final em **Pro (1080p)**
4. **Lip Sync — critérios de acionamento:**
   - Áudio atrelado com mais de 2 segundos de duração
   - Rosto frontal na imagem (0–15 graus), sem oclusões
   - Encadeamento de requisições via `origin_task_id`

---

### Módulo 5 — Diretor de Pós-Produção (Motor Python + FFMPEG)

**Função:** Código utilitário no servidor (Railway) que monta o episódio final.

**Tarefas Automatizadas:**

| Tarefa | Detalhe |
|---|---|
| Padding de áudio | Se dublagem < 2 segundos, FFMPEG adiciona silêncio milimétrico antes do Lip Sync |
| Montagem do episódio | Concatena `.mp4` na Assembly Order definida pelo Diretor Geral |
| Text Overlays | Letreiros, mensagens de WhatsApp, contadores de dinheiro |
| Mix de trilha sonora | Volume a 15% durante narração → sobe para 60% no Cliffhanger |

---

### Módulo 6 — Dashboard & Controle Financeiro

**Função:** Evitar surpresas na fatura das APIs.

**Monitoramento em tempo real:**

| API | Métrica |
|---|---|
| ElevenLabs | Créditos por caracteres processados |
| Kling AI | Créditos por geração de vídeo e chamadas de Lip Sync |
| Midjourney | Horas de GPU Fast / Relax consumidas |
| Anthropic | Custo por conversa / tokens consumidos |

**Estimativa pré-produção:** O sistema calcula o custo total de renderização de um episódio **antes** de apertar o botão "Produzir".

---

## 3. Instruções para a IA — Método BMAD

> Se você é um LLM (Claude/Cursor) lendo este documento: estamos desenvolvendo este sistema com a metodologia ágil BMAD. Você deve assumir papéis sequenciais conforme os comandos do usuário.

### Papel: Product Manager (PM)

Leia este PRD e destrinche as **User Stories**. Prioridades sugeridas:

1. Tela de Chat do Showrunner (Módulo 1)
2. Conexão com banco PostgreSQL + modelagem inicial
3. Integração com a API da Anthropic para o agente Diretor Geral

### Papel: Arquiteto (Architect)

Responsabilidades:
- Modelagem do banco de dados (tabelas: `projects`, `characters`, `episodes`, `scenes`, `assets`)
- Estrutura de integração com Google Drive API / S3 (Cloudflare R2)
- Definição dos contratos entre os serviços de API

### Papel: Desenvolvedor (Dev)

Princípios:
- Código limpo, modular, seguindo princípios SOLID
- Serviços de API isolados das rotas web: `kling_service.py`, `elevenlabs_service.py`, `midjourney_service.py`, `anthropic_service.py`
- Nenhuma chave de API hardcoded — tudo via variáveis de ambiente

---

## 4. Primeiro Passo Recomendado

```
"IA, assuma o papel de Arquiteto e crie a modelagem do banco de dados
PostgreSQL e a estrutura de pastas do backend FastAPI com base neste PRD."
```

Este comando inicia o ciclo BMAD e produz:
1. Schema SQL das tabelas do banco
2. Estrutura de pastas do projeto FastAPI
3. Diagrama de dependências entre os módulos

---

*VideoAI Studio — MidIA — v1.0 — 2026-03-30*
