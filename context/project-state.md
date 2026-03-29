# VideoAI — Estado Atual do Projeto

**Ultima atualizacao:** 2026-03-28
**Responsavel:** lucaspicchioni-maker
**Colaborador:** lucascgh

---

## 1. O QUE E ESSE PROJETO

VideoAI e uma plataforma de producao, distribuicao e monetizacao de conteudo digital com IA em escala — um Content Operating System (Content OS). A primeira producao em andamento e a serie "Danilo Vasconcelos — O Anti-Heroi".

---

## 2. ESTADO DA PLATAFORMA (app/)

### Ja feito
- Next.js 16.2.1 + TypeScript + Tailwind CSS 4 configurados
- Prisma schema com 4 modelos: Channel, Trend, Content, Analytics
- BullMQ + Redis — 4 filas definidas: trend-detection, content-production, distribution, analytics
- Estrutura de pastas para todos os 8 modulos criada
- Prisma client configurado em `src/lib/db/prisma.ts`
- Redis connection em `src/lib/queue/connection.ts`
- Type definitions em `src/types/content.ts`

### Pendente (nao implementado ainda)
- Pagina home ainda e o template padrao do Next.js
- Nenhuma API route implementada
- Nenhum componente React criado
- Nenhum servico implementado (trend intelligence, content production, etc.)
- Dashboard nao existe ainda

---

## 3. PRIMEIRA PRODUCAO — SERIE "DANILO VASCONCELOS"

### Localizacao dos arquivos
```
content/series/danilo-vasconcelos/
  bible/BIBLE-v2.md              — Biblia completa da serie (120 eps, 3 temporadas)
  characters/danilo-cref.txt     — URL de referencia do personagem principal
  episodes/T1/EP01-O-Sorriso.md  — Roteiro completo + prompts + montagem EP01
  production/GUIA-PASSO-A-PASSO-EP01.md  — Guia detalhado de producao
  production/ANALISE-FERRAMENTAS-GITHUB.md — Analise dos 10 repos clonados
  assets/midjourney/             — Salvar imagens geradas aqui
  assets/kling/                  — Salvar clips animados aqui
  assets/audio/                  — Salvar narracoes ElevenLabs aqui
  assets/final/                  — Video final exportado aqui
```

### A Serie
- **Titulo:** Danilo Vasconcelos — O Anti-Heroi
- **Formato:** Vertical 9:16, 3:30 a 4:00 min por episodio
- **Total:** 120 episodios / 3 temporadas de 40 eps cada
- **Tom:** Lobo de Wall Street brasileiro — luxo, ambicao, sem pedir desculpas
- **Plataformas:** Instagram Reels + TikTok + YouTube Shorts
- **Horario:** Publicacao diaria as 19h
- **Disclaimer obrigatorio:** "Esta e uma obra de ficcao. Todos os personagens e situacoes sao ficticios." (3s no inicio)

### Temporadas
- T1 "A Ascensao" (40 eps): 1983-2018
- T2 "O Imperio" (40 eps): 2018-2024
- T3 "A Queda" (40 eps): 2024-2026

---

## 4. ESTADO DO EP01 — "O SORRISO"

### Status: EM PRODUCAO — FASE DE GERACAO DE IMAGENS

### O que ja foi feito
- Roteiro completo finalizado (6 cenas, 3:30-4:00)
- Personagem Danilo aprovado no Midjourney V7
- URL de referencia salva: `https://cdn.midjourney.com/80110a08-e749-4e07-9e1a-0623f23107cc/0_1.png`
- 7 prompts Midjourney escritos e otimizados para V7
- 6 prompts Kling escritos (animacao de cada imagem)
- Narracao limpa pronta para ElevenLabs
- Guia de montagem CapCut com timecodes definidos

### Proximo passo imediato
Gerar as 7 imagens no Midjourney V7. Ver arquivo: `content/ep01-prompts-midjourney.md`

### Plano de producao EP01
1. Gerar 2-4 variacoes adicionais do Danilo para usar como multi-cref
2. Gerar 7 imagens no Midjourney V7 (prompts em `content/ep01-prompts-midjourney.md`)
3. Enviar imagens ao Kling para animacao (6 clips de 5-8s)
4. Gerar narracao no ElevenLabs (~2:30-3:00 de audio)
5. Montar no CapCut (1080x1920, trilha 15-20%, legenda auto tamanho 85)
6. Exportar 1080p MP4 e publicar as 19h

---

## 5. PERSONAGEM DANILO VASCONCELOS

### Referencia visual aprovada
- **URL Midjourney:** `https://cdn.midjourney.com/80110a08-e749-4e07-9e1a-0623f23107cc/0_1.png`
- **Versao MJ:** V7
- **Status:** APROVADO

### Prompt base do personagem
```
Brazilian male, 42 years old, strong angular jaw, dark brown hair slicked back with subtle gel, light brown piercing confident eyes, a permanent slight smile that never disappears even in tense moments, medium athletic build, perfectly tailored charcoal Italian suit, crisp white shirt, precisely folded pocket square, gold watch on left wrist, effortless commanding posture, slight tan, photorealistic, dramatic cinematic lighting --ar 9:16 --style raw
```

### Como usar em cenas
- Sempre adicionar `--cref https://cdn.midjourney.com/80110a08-e749-4e07-9e1a-0623f23107cc/0_1.png` nos prompts com o Danilo
- MJ V7 NAO suporta `--cw` nem `--hd` — nao usar esses parametros
- Multiplas refs: aceita `--cref URL1 URL2 URL3` para maior consistencia
- Para maior consistencia: gerar variacoes via "Vary (Subtle)" e usar todas como cref

### Negative prompt (para Leonardo AI)
```
cartoon, anime, illustration, painting, blurry, deformed, ugly, bad anatomy, extra limbs, cloned face, disfigured, gross proportions, malformed limbs, missing arms, missing legs, extra arms, extra legs, fused fingers, too many fingers, long neck, mutation, mutated
```

---

## 6. PIPELINE DE PRODUCAO DEFINIDO

```
Midjourney V7 (imagens 9:16)
        ↓
    Kling AI (image-to-video, 5-8s por clip)
        ↓
  ElevenLabs (narracao voz masculina BR)
        ↓
 CapCut Desktop (montagem 1080x1920)
        ↓
IG Reels + TikTok + YouTube Shorts (19h)
```

### Regras do pipeline
- MJ sempre `--ar 9:16 --style raw`
- Kling: modo Professional, 9:16, 5-8s por clip
- ElevenLabs: Eleven Multilingual v2, voz masculina BR, Stability 0.50
- CapCut: trilha 15-20% durante narracao, 60% no cliffhanger
- Legenda: branca tamanho 85, centralizada, sombra preta

### Problema resolvido: Consistencia de personagem
O Midjourney varia o personagem entre cenas. Solucoes em ordem:
1. `--cref URL` nos prompts — primaria
2. Multiplas refs `--cref URL1 URL2 URL3` — mais robusto
3. InsightFace no Discord (face swap gratuito) — fallback
4. Leonardo AI Character Reference (~$12/mes) — melhor consistencia nativa

---

## 7. FERRAMENTAS EXTERNAS CLONADAS

Localizacao: `tools/external/` (nao commitado no git — ver .gitignore)

| Repo | Stars | Uso planejado |
|------|-------|--------------|
| ShortGPT | 7.2k | Base do pipeline automatizado — ElevenLabs built-in |
| ViMax | 2.5k | Script2Video — roteiro vira video automaticamente |
| carocut (Bilibili) | 27 | Referencia de arquitetura — Next.js/TS igual nossa stack |
| Director (VideoDB) | 1.3k | Camada de orquestracao de agentes |
| MovieAgent | 308 | Tecnica de LoRA para consistencia de personagem |
| VideoAgent (HKUDS) | 551 | Graph-based workflows multi-model |
| montage-ai | 21 | Pos-producao automatizada — pode substituir CapCut |
| MM_StoryAgent | 305 | Pattern de coordenacao cross-modal |
| video-avatars-agent | 138 | Consistencia de personagem em chunks |
| autoclip | 3.2k | Highlight detection para otimizacao |

### Plano de integracao
- **Fase 1 (agora):** Producao manual com MJ + Kling + ElevenLabs + CapCut
- **Fase 2 (semana 2-3):** Adaptar ShortGPT + ViMax para semi-automatizar
- **Fase 3 (mes 2):** Agentes customizados VideoAI (Roteirista, Visual, Audio, Editor, Publisher)
- **Fase 4 (mes 3+):** Pipeline 100% automatizado, 3-5 eps/dia

---

## 8. TABELA DE NOMES FICTICIOS (uso interno, nao publicar)

| Real | Ficticio |
|------|----------|
| Daniel Vorcaro | Danilo Vasconcelos |
| Martha Graeff | Marina Gracie |
| Fabiano Zettel | Fabricio Zettl |
| Banco Master | Banco Nexus |
| Dias Toffoli | Ministro Teixeira |
| Alexandre de Moraes | Ministro Alessandro Moura |
| Atletico Mineiro | Atletico das Montanhas |
| BRB | Banco da Capital |

Tabela completa em: `content/series/danilo-vasconcelos/bible/BIBLE-v2.md`

---

## 9. DECISOES TECNICAS TOMADAS

| Decisao | Escolha | Motivo |
|---------|---------|--------|
| Geracao de imagem | Midjourney V7 | Melhor qualidade, usuario ja tem conta |
| Geracao de video | Kling AI | Melhor image-to-video do mercado atual |
| Narracao | ElevenLabs | Qualidade superior, suporte PT-BR, API disponivel |
| Edicao | CapCut Desktop | Gratuito, facil, suporta 1080x1920 |
| Consistencia personagem | --cref + multi-ref | Solucao nativa MJ, sem custo extra |
| Stack plataforma | Next.js + TypeScript + Prisma | Ja configurado, igual ao carocut |
| Fila de jobs | BullMQ + Redis | Ja configurado na plataforma |
| Parametros MJ V7 | --ar 9:16 --style raw | V7 nao suporta --cw nem --hd |

---

## 10. PROXIMOS PASSOS PRIORITARIOS

### Imediato (EP01)
1. Gerar variacoes adicionais do Danilo para multi-cref
2. Gerar 7 imagens no Midjourney V7
3. Animar no Kling (6 clips)
4. Narrar no ElevenLabs
5. Montar e publicar no CapCut

### Curto prazo
- Integrar API do Kling para automacao de animacao
- Escrever roteiro do EP02 "O Menino de Deus"
- Definir estrategia de trafego pago para eps 1-5

### Medio prazo
- Adaptar ShortGPT para nosso pipeline
- Estudar arquitetura do carocut para o dashboard VideoAI
- Implementar API routes basicas na plataforma

---

## 11. ESTRUTURA DE ARQUIVOS DO PROJETO

```
VideoAI/
├── CLAUDE.md                    — Instrucoes para Claude Code
├── .gitignore                   — Inclui tools/external/
├── app/                         — Next.js app (plataforma)
│   ├── prisma/schema.prisma     — Schema do banco
│   ├── src/lib/db/prisma.ts     — Cliente Prisma
│   ├── src/lib/queue/           — BullMQ + Redis
│   └── src/types/content.ts     — Types TypeScript
├── bmad-method/                 — Framework BMAD (skills, agentes)
├── content/
│   ├── series/danilo-vasconcelos/
│   │   ├── bible/BIBLE-v2.md
│   │   ├── characters/danilo-cref.txt
│   │   ├── episodes/T1/EP01-O-Sorriso.md
│   │   ├── production/
│   │   └── assets/
│   └── ep01-prompts-midjourney.md  — Prompts prontos para copiar
├── context/
│   └── project-state.md         — ESTE ARQUIVO
└── tools/
    └── external/                — Repos clonados (nao commitado)
        ├── ShortGPT/
        ├── ViMax/
        ├── carocut/
        ├── Director/
        └── ...
```
