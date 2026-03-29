# GUIA PASSO A PASSO — EPISODIO 1 "O SORRISO"

Tempo estimado: 2-3 horas (primeira vez) | 1-1.5h (com pratica)

---

## ANTES DE COMECAR

### Contas necessarias
- [ ] Midjourney V8 (plano Standard ou Pro) — discord.gg/midjourney
- [ ] Kling AI (plano Pro) — klingai.com
- [ ] ElevenLabs (plano Creator) — elevenlabs.io
- [ ] CapCut (versao desktop gratuita) — capcut.com

### Arquivos de referencia
- Roteiro completo: `episodes/T1/EP01-O-Sorriso.md`
- Biblia da serie: `bible/BIBLE-v2.md`

---

## PASSO 1 — CRIAR O PERSONAGEM DANILO (Midjourney)
**Tempo: 15-20 min | Ferramenta: Midjourney V8 (Discord ou Web)**

### 1.1 Gerar a imagem base do Danilo
No Midjourney, digite `/imagine` e cole:

```
Brazilian male, 42 years old, strong angular jaw, dark brown hair slicked back with subtle gel, light brown piercing confident eyes, a permanent slight smile that never disappears even in tense moments, medium athletic build, perfectly tailored charcoal Italian suit, crisp white shirt, precisely folded pocket square, gold watch on left wrist, effortless commanding posture, slight tan, photorealistic, dramatic cinematic lighting --ar 9:16 --style raw --hd
```

### 1.2 Selecionar e upscalar
- Das 4 opcoes geradas, escolha a que melhor representa o Danilo
- Clique em **U1/U2/U3/U4** para upscalar a escolhida
- Clique na imagem upscalada e copie a **URL da imagem**

### 1.3 Salvar a URL como referencia permanente
- Cole a URL num arquivo `characters/danilo-cref.txt`
- Esta URL sera usada como `--cref [URL]` em TODOS os episodios
- **NUNCA perca esta URL** — e a consistencia visual da serie inteira

> **DICA**: Gere 2-3 variantes e escolha com calma. Este personagem vai aparecer em 120 episodios.

---

## PASSO 2 — GERAR AS 6 IMAGENS DO EPISODIO (Midjourney)
**Tempo: 20-30 min | Ferramenta: Midjourney V8**

Gere cada imagem com `/imagine`. Substitua `[URL DANILO APROVADO]` pela URL salva no Passo 1.

### IMG 1 — Camera de seguranca
```
Security camera footage grain, black and white, Brazilian executive airport terminal night 2025, well-dressed man in dark tailored suit walking confidently, three plain-clothes federal agents blocking path, man stops and forms a slight calm smile, surveillance grain effect, high contrast, dramatic --ar 9:16 --style raw --hd
```
> Salvar como: `assets/midjourney/ep01-img01-seguranca.png`

### IMG 2 — Jato na pista
```
Private executive Falcon 7X jet on dark tarmac at night, engines running with heat shimmer, navigation lights blinking, Sao Paulo airport lights in background, wet tarmac reflections, sense of interrupted escape, cinematic vertical --ar 9:16 --style raw --hd
```
> Salvar como: `assets/midjourney/ep01-img02-jato.png`

### IMG 3 — Videoconferencia
```
Brazilian male banker 42 years old, dark slicked back hair, light confident eyes, slight smile, sleek Sao Paulo boardroom, video call with regulators on screen, afternoon golden light, charcoal tailored suit, photorealistic cinematic --ar 9:16 --style raw --hd --cref [URL DANILO APROVADO]
```
> Salvar como: `assets/midjourney/ep01-img03-videoconf.png`

### IMG 4 — Sala de pericia
```
Forensic digital evidence lab, white gloved hands examining seized smartphone on illuminated glass table, dark room blue forensic lighting, messages and data visible on screen, evidence aesthetic, cinematic vertical --ar 9:16 --style raw --hd
```
> Salvar como: `assets/midjourney/ep01-img04-pericia.png`

### IMG 5 — Flashback 1983
```
Super 8 film grain aesthetic, warm sepia tones, 1983 Belo Horizonte modest middle class home, very young mother 16 holding newborn, young father 20 beside her, stern elderly Italian-Brazilian man in black Sunday suit holding Bible visible in background, vintage family portrait --ar 9:16 --style raw
```
> Salvar como: `assets/midjourney/ep01-img05-flashback.png`

### IMG 6 — Cliffhanger (contraste temporal)
```
Dramatic vertical split composition, top half 1983 evangelical family scene in Belo Horizonte warm sepia, bottom half 2025 airport arrest cold blue light, the same confident smile visible across both time periods, cinematic --ar 9:16 --style raw --hd
```
> Salvar como: `assets/midjourney/ep01-img06-cliffhanger.png`

### Dicas de qualidade
- Se a imagem nao ficou boa, clique no botao de **re-roll** ou ajuste o prompt
- Para teste rapido use `--ar 9:16 --style raw` (sem --hd, economiza GPU)
- Para versao final use `--ar 9:16 --style raw --hd` (mais detalhes)
- **NAO use `--hd --q 4` juntos** a menos que seja a versao final aprovada (16x mais GPU)

---

## PASSO 3 — ANIMAR AS IMAGENS (Kling AI)
**Tempo: 30-40 min | Ferramenta: Kling AI (klingai.com)**

### Para cada imagem:

1. Acesse **klingai.com** > **Image to Video**
2. Faca upload da imagem gerada no Midjourney
3. Cole o prompt de movimento correspondente
4. Configure: **Duracao 5s** | **Modo Professional** | **Aspect Ratio 9:16**
5. Clique **Generate**
6. Aguarde (2-5 min por clip)
7. Baixe o MP4

### Prompts de movimento para cada clip:

**CLIP 1** (ep01-img01-seguranca.png):
```
Man stops as agents approach, turns head slowly toward camera, slight confident smile forms, surveillance camera subtle zoom-in, black and white, dramatic stillness
```
> Salvar como: `assets/kling/ep01-clip01-seguranca.mp4`

**CLIP 2** (ep01-img02-jato.png):
```
Jet engines glowing in dark, camera pulls back slowly revealing full aircraft waiting, lights blinking, dramatic stillness, heat shimmer from engines
```
> Salvar como: `assets/kling/ep01-clip02-jato.mp4`

**CLIP 3** (ep01-img03-videoconf.png):
```
Man leans back in executive chair, taps finger once on glass table, nods at screen with controlled confidence, afternoon light streams from floor-to-ceiling windows
```
> Salvar como: `assets/kling/ep01-clip03-videoconf.mp4`

**CLIP 4** (ep01-img04-pericia.png):
```
Forensic technician slowly turns smartphone on table, screen lights up revealing chat messages, camera pushes in toward device, tense silence
```
> Salvar como: `assets/kling/ep01-clip04-pericia.mp4`

**CLIP 5** (ep01-img05-flashback.png):
```
Super 8 film flickers, camera slowly pushes toward elderly man with Bible in background, his stern eyes catch the light, slow significant zoom
```
> Salvar como: `assets/kling/ep01-clip05-flashback.mp4`

**CLIP 6** (ep01-img06-cliffhanger.png):
```
Slow temporal fade from 1983 childhood scene to 2025 airport, man's smile connecting both eras, dramatic music implied, final fade to black
```
> Salvar como: `assets/kling/ep01-clip06-cliffhanger.mp4`

### Dicas Kling
- Se o movimento ficou estranho, regere com prompt ajustado
- Movimentos simples funcionam melhor (zoom, pan, tilt)
- Evite pedir acoes complexas (andar, correr) — Kling ainda distorce rostos em movimento
- Prefira "slow zoom in", "subtle camera movement", "dramatic stillness"

---

## PASSO 4 — GERAR A NARRACAO (ElevenLabs)
**Tempo: 5-10 min | Ferramenta: ElevenLabs (elevenlabs.io)**

### 4.1 Configurar a voz
1. Acesse **elevenlabs.io** > **Speech Synthesis**
2. Escolha uma voz masculina brasileira (recomendado: **Antoni** ou **Daniel** em portugues BR)
3. Ou clone uma voz propria em **Voice Lab** > **Instant Voice Cloning**

### 4.2 Configuracoes de voz
- **Stability**: 0.50 (nem muito robotico, nem muito variado)
- **Similarity Boost**: 0.75 (manter consistencia)
- **Style**: 0.30 (sutil dramaticidade)
- **Model**: Eleven Multilingual v2

### 4.3 Gerar o audio
Cole o texto abaixo INTEIRO no campo de texto:

```
Sao Paulo. Aeroporto de Guarulhos. 22 horas e 7 minutos. O homem que tentava embarcar naquele jato administrava um banco com cinquenta bilhoes de reais em dividas. O destino declarado era Malta. Os motores estavam ligados. Quinze agentes da Policia Federal esperavam por ele. E ele estava sorrindo.

Naquela tarde, as 14 horas e 10 minutos, Danilo Vasconcelos terminava uma videoconferencia com o Banco Central. Ele havia anunciado que fecharia a venda do Banco Nexus para a Fixto Holding ate o fim do dia. Acreditava que a crise estava perto do fim. Uma hora e dezenove minutos depois, um juiz federal assinou a ordem de prisao preventiva. As 17 horas, o Banco Central decretou a liquidacao extrajudicial do Banco Nexus. A Fixto cancelou a compra. Danilo pediu o carro. Disse que viajaria naquela noite.

No celular apreendido naquela noite estavam dez anos de decisoes. Mensagens para tres mulheres diferentes — enviadas no mesmo horario, com o mesmo texto. Conversas com ministros do Supremo Tribunal Federal. Registros de oitocentos e noventa e dois milhoes de reais em viagens internacionais em quatro anos. Festas semanais de quatrocentos mil reais. Toda semana. Como rotina. E um evento em Londres com trinta e um milhoes de reais — onde ministros, senadores e o diretor-geral da Policia Federal tomaram whisky juntos. Pago pelo banco investigado.

Para entender aquele sorriso no aeroporto — precisamos voltar quarenta e dois anos. Belo Horizonte, 1983. Uma familia italiana convertida ao protestantismo. Um avo que acreditava que Deus abencoa quem prospera. Um pai salvo pela fe e pelo dinheiro — que nao sabia distinguir um do outro. E um menino que cresceu aprendendo que os dois eram a mesma coisa.

O menino que apresentou programa de musica gospel numa TV da familia. O jovem que administrou um negocio que virou caos — e chamou de sucesso. O construtor que ergueu um hotel que nunca abriu as portas. O banqueiro que comprou um banco falido e o transformou no maior escandalo financeiro da historia do Brasil. Como um menino de familia evangelica de Belo Horizonte chegou ate aquele aeroporto — sorrindo. Episodio 2: O Menino de Deus. Amanha.
```

### 4.4 Baixar
- Clique **Generate**
- Ouca o resultado
- Se necessario, ajuste Stability/Style e regere
- Baixe como MP3
- Salvar como: `assets/audio/ep01-narracao.mp3`

### Dicas ElevenLabs
- A narracao deve ter entre 2:30 e 3:00 de duracao
- Se ficou muito rapido, aumente a Stability para 0.60
- Nao adicione musica aqui — a trilha vai no CapCut
- Ouca com fone de ouvido para verificar qualidade

---

## PASSO 5 — MONTAR O VIDEO (CapCut Desktop)
**Tempo: 30-45 min | Ferramenta: CapCut Desktop (gratis)**

### 5.1 Criar o projeto
1. Abra o CapCut Desktop
2. **New Project** > Tamanho **1080x1920** (vertical 9:16)
3. Nome: `EP01-O-Sorriso`

### 5.2 Importar arquivos
Arraste para a Media Library:
- 6 clips MP4 do Kling (`assets/kling/`)
- 1 audio MP3 do ElevenLabs (`assets/audio/`)
- 1 trilha dramatica orquestral (buscar em: Artlist, Epidemic Sound, ou biblioteca do CapCut)

### 5.3 Montar na timeline — SEGUIR ESTA ORDEM EXATA

**FAIXA DE VIDEO (V1):**

| Posicao | Arquivo | Duracao | Notas |
|---------|---------|---------|-------|
| 0:00 | `tela-preta-disclaimer.png` | 3 seg | Texto branco: "Esta e uma obra de ficcao..." |
| 0:03 | `ep01-clip01-seguranca.mp4` | 12 seg | Loopear se necessario |
| 0:15 | `ep01-clip02-jato.mp4` | 25 seg | Velocidade 80% para dramaticidade |
| 0:40 | `ep01-clip03-videoconf.mp4` | 50 seg | |
| 1:30 | `ep01-clip04-pericia.mp4` | 60 seg | |
| 2:30 | `ep01-clip05-flashback.mp4` | 45 seg | |
| 3:15 | `ep01-clip06-cliffhanger.mp4` | 45 seg | Fade to black nos ultimos 5 seg |

> **DICA**: Se algum clip for curto demais, use **Speed > Slow motion** ou duplique o clip com transicao suave.

**FAIXA DE AUDIO (A1) — Narracao:**
- Arraste `ep01-narracao.mp3` para A1
- Alinhe inicio da narracao em **0:15** (apos o gancho visual)
- A narracao NAO comeca no segundo 0 — os primeiros 15 seg sao so visual + texto

**FAIXA DE AUDIO (A2) — Trilha:**
- Arraste a trilha orquestral para A2
- Volume: **15-20%** durante narracao
- Volume: **60%** no cliffhanger (3:15-4:00)
- Fade in no inicio, fade out no final

### 5.4 Adicionar textos na tela

**Texto 1** (0:08 - aparece numero por numero):
```
R$ 50.000.000.000
```
- Fonte: Bold, tamanho 120, branca, sombra preta
- Animacao: Type-in (aparece digitando)
- Posicao: Centro da tela

**Texto 2** (0:10):
```
O maior rombo financeiro da historia do Brasil.
Ele estava sorrindo.
```
- Fonte: Regular, tamanho 60, branca
- Animacao: Fade in
- Posicao: Abaixo do valor

**Texto 3** (0:15):
```
DANILO VASCONCELOS
```
- Fonte: Bold, tamanho 90, branca
- Animacao: Fade in + Fade out (3 seg)

**Texto 4** (0:16):
```
Uma historia baseada em fatos de dominio publico
```
- Fonte: Regular, tamanho 40, branca
- Posicao: Abaixo do nome

**Texto 5** (1:05):
```
15h29 — 1 hora e 19 minutos depois
```
- Fonte: Bold, tamanho 70, branca, sombra
- Animacao: Type-in

**Texto 6** (2:05 — sequencial, um por um):
```
R$ 400.000 por semana em festas
```
(2 seg depois):
```
R$ 31.400.000 — uma noite em Londres
```
(2 seg depois):
```
R$ 50.000.000.000 — o que o povo vai pagar
```
- Fonte: Bold, tamanho 80, branca
- Animacao: Pop-up, cada um substitui o anterior

**Texto 7** (3:40 — apos silencio de 3 seg):
```
Como um menino de familia evangelica
de Belo Horizonte chegou ate
aquele aeroporto — sorrindo.
```
- Fonte: Regular, tamanho 55, branca
- Animacao: Fade in lento (2 seg)

**Texto 8** (3:55):
```
Episodio 2: O Menino de Deus. Amanha.
```
- Fonte: Bold, tamanho 65, branca

**Texto 9** (fade to black, ultimos 3 seg):
```
Obra de ficcao. Personagens e situacoes sao ficticios.
```
- Fonte: Regular, tamanho 35, branca

### 5.5 Legendas automaticas
1. Selecione a faixa de narracao
2. Va em **Text** > **Auto Captions** > **Portuguese (Brazil)**
3. Gere automaticamente
4. Ajuste o estilo:
   - Fonte: **Branca, tamanho 85, centralizada**
   - Sombra preta
   - Background: transparente ou preto 30%
   - Posicao: terco inferior da tela

### 5.6 Transicoes
- Entre clips: **Cross dissolve** (0.5 seg)
- Clip 1 para Clip 2: **Glitch** (efeito de camera cortando)
- Clip 4 para Clip 5 (pericia para flashback): **Flash branco** (corte brusco temporal)
- Final: **Fade to black** (2 seg)

---

## PASSO 6 — REVIEW FINAL
**Tempo: 10 min**

### Checklist de qualidade

- [ ] Duracao total entre 3:30 e 4:00
- [ ] Disclaimer no inicio (3 seg, branco no preto)
- [ ] Audio da narracao limpo, sem cortes
- [ ] Narracao sincronizada com os clips corretos
- [ ] Trilha nao abafa a narracao (15-20%)
- [ ] Trilha sobe no cliffhanger (60%)
- [ ] Todos os textos legiveis no celular (testar em tela pequena!)
- [ ] Numeros aparecem com impacto (animacao type-in)
- [ ] Legendas automaticas corretas (revisar palavras-chave)
- [ ] Fade to black no final
- [ ] Disclaimer final presente
- [ ] Sem erros de portugues nos textos

### Testar em dispositivo movel
- Exporte uma versao draft
- Envie para o celular via WhatsApp
- Assista na vertical — se os textos sao legiveis, se o audio esta bom

---

## PASSO 7 — EXPORTAR
**Tempo: 5 min**

1. **Export** > **Resolution: 1080p** > **Frame Rate: 30fps**
2. **Format: MP4**
3. **Quality: High**
4. Salvar como: `assets/final/EP01-O-Sorriso-FINAL.mp4`

---

## PASSO 8 — PUBLICAR
**Horario fixo: 19h**

### Instagram Reels
1. Upload do MP4
2. Caption:
```
EP 01 — O SORRISO

R$ 50.000.000.000.
O maior rombo da historia do Brasil.
Ele estava sorrindo.

Serie completa: 120 episodios.
EP 02 amanha as 19h.

#DaniloVasconcelos #TrueCrime #SerieVertical #BancoNexus
#LoboDeWallStreetBrasileiro #CrimesFinanceiros #SerieOriginal
```
3. Cover: Frame do Danilo sorrindo no aeroporto
4. Pin comment: "EP 02 amanha as 19h"

### TikTok
1. Mesmo MP4
2. Mesma caption (adaptar para 150 chars no TikTok)
3. Sons: usar audio original (nao adicionar musica do TikTok)
4. Hashtags TikTok: #truecrimebr #serievertical #banqueiro #ficção

### YouTube Shorts
1. Mesmo MP4
2. Titulo: `EP 01 — O SORRISO | Danilo Vasconcelos — O Anti-Heroi`
3. Descricao: Caption completa + links para proximos episodios
4. Tags: true crime brasil, serie vertical, ficcao financeira

---

## RESUMO RAPIDO — COLA NA PAREDE

```
1. MIDJOURNEY  → Gerar 6 imagens (20-30 min)
2. KLING       → Animar 6 clips (30-40 min)
3. ELEVENLABS  → Gerar narracao (5-10 min)
4. CAPCUT      → Montar tudo (30-45 min)
5. REVIEW      → Checar qualidade (10 min)
6. EXPORTAR    → 1080p MP4 (5 min)
7. PUBLICAR    → IG + TikTok + YT as 19h
```

**Total: ~2 horas**
