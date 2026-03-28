# VideoAI — AI Media Machine

## O que e este projeto
Plataforma de producao, distribuicao e monetizacao de conteudo digital com IA em escala.
Funciona como um Content Operating System (Content OS).

## Tech Stack
- **Framework**: Next.js (App Router) — frontend dashboard + API routes
- **Linguagem**: TypeScript
- **Banco de dados**: PostgreSQL + Prisma ORM
- **Fila/Jobs**: Redis + BullMQ
- **Pipelines de IA**: Python (scraping, geracao de video, narracao)
- **Estilizacao**: Tailwind CSS

## Modulos do Sistema
1. **Trend Intelligence** — scraping de plataformas, identificacao de virais, clusterizacao por nicho
2. **Ideacao e Roteirizacao** — geracao de ideias e roteiros com foco em retencao
3. **Producao de Conteudo** — geracao de video, narracao sintetica, edicao automatica
4. **Distribuicao** — upload automatico, multi-plataforma, agendamento, testes A/B
5. **Performance Analytics** — views, retencao, CTR, engajamento, dashboard central
6. **Engine de Otimizacao** — testes A/B, recomendacoes automaticas, escala de conteudo vencedor
7. **Gestao de Canais** — criacao, organizacao, identidade e branding
8. **Monetizacao** — ads, publicidade direta, segmentacao por audiencia

## Verticais de Conteudo Suportadas
- Entretenimento, Culinaria, Esportes, Tecnologia, Educacao, Infantil

## Fluxo Principal
Trend Detection → Ideacao → Roteirizacao → Producao IA → Distribuicao → Analise → Otimizacao → Escala

## Convencoes
- Codigo e commits em ingles
- Componentes React com function components + TypeScript
- API routes usando Next.js App Router (route handlers)
- Prisma para todas as queries ao banco
- Variaves de ambiente em `.env.local` (nunca commitar)

## Comandos
```bash
npm run dev       # Rodar em desenvolvimento
npm run build     # Build de producao
npm run lint      # Linting
npx prisma studio # Visualizar banco
```

## Colaboradores
- lucaspicchioni-maker (admin)
- lucascgh (write)

## Repo
https://github.com/lucaspicchioni-maker/VideoAI
