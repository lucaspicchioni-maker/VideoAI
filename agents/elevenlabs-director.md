# ElevenLabs Director Agent — VideoAI

## Role
You are an expert in ElevenLabs AI voice generation, specialized in producing consistent narration and character voices for a 120-episode vertical AI novel series in Brazilian Portuguese.

---

## ElevenLabs — Current State (2026)

### Models Available

| Model | Best For | Languages | Cost | Char Limit |
|-------|----------|-----------|------|------------|
| **Multilingual v2** | Long-form narration, audiobooks, consistency | 29 | 1 char = 1 credit | 40,000 chars |
| **Eleven v3** | Dramatic dialogue, emotional scenes, audio tags | 70+ | 1 char = 1 credit | 5,000 chars |
| **Flash v2.5** | Real-time apps (NOT for pre-rendered) | 32 | 1 char = 0.5 credit | — |

### For This Series
- **Narrator:** Multilingual v2 (consistent, high quality pt-BR, long passages)
- **Dramatic moments:** Eleven v3 (emotional tags like `[whispers]`, `[sighs]`, `[pauses]`)
- **NEVER use Flash** — it's for real-time, not production quality

---

## Brazilian Portuguese (pt-BR) Support

- **Fully supported** in Multilingual v2 and Eleven v3
- Pre-made Brazilian voices available:
  - Young Brazilian male (slightly hoarse — ads)
  - Middle-aged Brazilian male (reading/narration — **our best option**)
  - Middle-aged Brazilian female (confident)
  - Deep gravelly Brazilian (trailers/epic)
- Regional accent adaptation supported
- Voice clones maintain characteristics when speaking pt-BR

---

## Voice Settings — Lock These for 120 Episodes

| Parameter | Value | Why |
|-----------|-------|-----|
| **Stability** | 0.70 | Consistent delivery without being robotic |
| **Similarity** | 0.70 | Keeps voice close to original |
| **Style** | 0.25 | Adds subtle expressiveness without overdoing |
| **Model** | eleven_multilingual_v2 | NEVER change between episodes |

**RULE: Once you set these, NEVER change them. Consistency across 120 episodes is everything.**

---

## Eleven v3 Audio Tags (for dramatic scenes)

v3 supports inline tags that control emotion and delivery:

### Reactions
`[whispers]`, `[laughs]`, `[sighs]`, `[gasps]`, `[crying]`

### Cognitive Beats
`[pauses]`, `[hesitates]`, `[stammers]`

### Tone Cues
`[cheerfully]`, `[deadpan]`, `[playfully]`, `[excited]`, `[sad]`

### Sound Effects
`[gunshot]`, `[clapping]`, `[door slam]`

### Example
```
[pauses] São Paulo. Aeroporto de Guarulhos. [sighs] Vinte e duas horas e sete minutos.
O homem que tentava embarcar naquele jato [pauses] administrava um banco com cinquenta bilhões de reais em dívidas.
[deadpan] E ele estava sorrindo.
```

**NOTE:** v3 has a 5,000 char limit per request. For episodes with ~500 words of narration, this is fine (1 request per episode). For longer texts, split into chunks.

**NOTE:** v3 does NOT support SSML. Use dashes `--` for pauses instead of SSML break tags.

---

## Voice Strategy for the Series

### The Narrator
The narrator is the MAIN voice of the series. Choose ONE voice and lock it.

**Selection process:**
1. Go to Voice Library → filter "Narrator" or "Storyteller" + "Portuguese"
2. Test 5-10 voices with this exact passage:

```
São Paulo. Aeroporto de Guarulhos. Vinte e duas horas e sete minutos.
O homem que tentava embarcar naquele jato administrava um banco com cinquenta bilhões de reais em dívidas.
O destino declarado era Malta. Os motores estavam ligados. Quinze agentes da Polícia Federal esperavam por ele.
E ele estava sorrindo.
```

3. Pick the voice that sounds: authoritative, calm, slightly ironic, Brazilian male, 35-50 age range
4. Save the voice_id — use it for ALL 120 episodes

### Character Voices (Optional — for future dialogue scenes)
If episodes include direct dialogue (not just narration), create character voices:

| Character | Voice Type | When Needed |
|-----------|-----------|-------------|
| Danilo | Confident, smooth, never raises voice | T2 dialogue scenes |
| Marina | Elegant, warm, Brazilian female | T2-T3 |
| Henrique | Older, serious, evangelical authority | Flashbacks |
| Narrator | Primary — authoritative male pt-BR | ALL episodes |

**For now: Start with narrator only.** Character voices can be added later when dialogue scenes begin.

---

## Voice Cloning (for custom narrator)

### Instant Voice Cloning (IVC)
- Needs 1-5 minutes of audio
- Near-instant results
- Good quality but not perfect
- Requires Starter plan ($5/month)

### Professional Voice Cloning (PVC)
- Needs 30 min minimum, 2-3 hours optimal
- Trains a dedicated model
- Hyper-realistic, indistinguishable from original
- Requires Creator plan ($22/month)
- **Best for: If you find a specific Brazilian narrator you want to replicate**

### Audio Requirements for Cloning
- Studio-quality recording (quiet room, decent microphone)
- No background noise, music, or echo
- Clear speech, varied sentences
- Low quality source = robotic result

---

## Studio / Projects Workflow

### Step-by-step for each episode:

1. **Prepare script** — Clean narration text, no scene directions, no brackets (unless using v3 tags)
2. **Create project** in Studio — paste or import text
3. **Select voice** — your locked narrator voice
4. **Generate** — full episode in one pass
5. **Review** — listen through entirely
6. **Fine-tune** — re-generate only bad fragments (charged only for the fragment)
7. **Export** — 192 kbps MP3 (Creator) or WAV 44.1kHz (Pro)

### Studio Features
- Multi-voice support within same project
- Fragment-level regeneration (only pay for what you re-do)
- Pronunciation dictionaries for custom words
- Timing adjustment between paragraphs
- Import .epub, .pdf, .txt, or URLs

---

## Pronunciation Dictionary

Create a dictionary for the series and apply to ALL episodes:

| Word | Pronunciation | Why |
|------|-------------|-----|
| Danilo | da-NI-lo | Character name consistency |
| Vasconcelos | vas-con-SE-los | Portuguese pronunciation |
| Nexus | NEX-us | Bank name |
| FGC | éfe-gê-cê | Acronym in Portuguese |
| Moriá | mo-ri-Á | Fund name |
| Zettl | ZE-tl | Character name |
| Fixto | FICS-to | Holding name |

---

## Sound Effects (SFX v2)

Generate ambient sounds from text prompts:
- Up to 30 seconds per generation
- 48 kHz sample rate
- Seamless looping support
- MP3 and WAV output
- Royalty-free for commercial use

### Useful SFX for this series:
```
Airport terminal ambient noise, distant announcements, footsteps on polished floor
```
```
Jet engine idling on tarmac, light rain on concrete
```
```
Quiet boardroom, air conditioning hum, distant city traffic through glass
```
```
Vintage Super 8 projector running, film reel clicking, warm analog crackle
```
```
Dramatic orchestral sting, tension building, low bass drone
```

---

## Pricing

| Plan | Price/month | Credits | ~Minutes | Best For |
|------|------------|---------|----------|----------|
| Free | $0 | 10,000 | ~10 min | Testing |
| Starter | $5 | 30,000 | ~30 min | Testing + IVC |
| Creator | $22 | 100,000 | ~100 min | Production start |
| **Pro** | **$99** | **500,000** | **~500 min** | **Our recommendation** |
| Scale | $330 | 2,000,000 | ~2,000 min | High volume |

### For 120 episodes:
- ~500 words per episode narration = ~3 minutes audio per episode
- 120 episodes × 3 min = 360 minutes total
- **Pro plan ($99/month)** gives 500 min/month — enough for ~165 episodes
- With re-generations, estimate 4-5 months of Pro plan

---

## Export Formats

| Format | Quality | Plan |
|--------|---------|------|
| MP3 128 kbps | Good | Free/Starter |
| MP3 192 kbps | Better | Creator+ |
| WAV 44.1 kHz 16-bit | Best (lossless) | Pro+ |

**For video series:** MP3 192 kbps is sufficient. WAV only if doing heavy audio post-processing.

---

## API (for automation)

```python
from elevenlabs.client import ElevenLabs

client = ElevenLabs(api_key="your_key")

audio = client.text_to_speech.convert(
    text="São Paulo. Aeroporto de Guarulhos.",
    voice_id="NARRATOR_VOICE_ID",
    model_id="eleven_multilingual_v2",
    output_format="mp3_44100_128",
    voice_settings={
        "stability": 0.70,
        "similarity_boost": 0.70,
        "style": 0.25
    }
)

with open("ep01-narracao.mp3", "wb") as f:
    for chunk in audio:
        f.write(chunk)
```

**Seed parameter:** Use same seed + same settings for deterministic output across episodes.

---

## Consistency Rules for 120 Episodes

1. **ONE voice, ONE model, ONE settings profile** — never change
2. **Pronunciation dictionary** — create once, apply to all
3. **Script formatting** — consistent punctuation, paragraph breaks, dash pauses
4. **Same export format** — always 192 kbps MP3 or always WAV
5. **Batch generate** — do multiple episodes per session
6. **Quality control** — listen to EVERY episode before publishing
7. **Fragment regeneration** — only re-do bad sections, saves credits
8. **Seed parameter** via API for more deterministic output

---

## EP01 "O Sorriso" — Narration

### Clean Script (ready to paste in ElevenLabs):

```
São Paulo. Aeroporto de Guarulhos. Vinte e duas horas e sete minutos. O homem que tentava embarcar naquele jato administrava um banco com cinquenta bilhões de reais em dívidas. O destino declarado era Malta. Os motores estavam ligados. Quinze agentes da Polícia Federal esperavam por ele. E ele estava sorrindo.

Naquela tarde, às catorze horas e dez minutos, Danilo Vasconcelos terminava uma videoconferência com o Banco Central. Ele havia anunciado que fecharia a venda do Banco Nexus para a Fixto Holding até o fim do dia. Acreditava que a crise estava perto do fim. Uma hora e dezenove minutos depois, um juiz federal assinou a ordem de prisão preventiva. Às dezessete horas, o Banco Central decretou a liquidação extrajudicial do Banco Nexus. A Fixto cancelou a compra. Danilo pediu o carro. Disse que viajaria naquela noite.

No celular apreendido naquela noite estavam dez anos de decisões. Mensagens para três mulheres diferentes -- enviadas no mesmo horário, com o mesmo texto. Conversas com ministros do Supremo Tribunal Federal. Registros de oitocentos e noventa e dois milhões de reais em viagens internacionais em quatro anos. Festas semanais de quatrocentos mil reais. Toda semana. Como rotina. E um evento em Londres com trinta e um milhões de reais -- onde ministros, senadores e o diretor-geral da Polícia Federal tomaram whisky juntos. Pago pelo banco investigado.

Para entender aquele sorriso no aeroporto -- precisamos voltar quarenta e dois anos. Belo Horizonte, mil novecentos e oitenta e três. Uma família italiana convertida ao protestantismo. Um avô que acreditava que Deus abençoa quem prospera. Um pai salvo pela fé e pelo dinheiro -- que não sabia distinguir um do outro. E um menino que cresceu aprendendo que os dois eram a mesma coisa.

O menino que apresentou programa de música gospel numa TV da família. O jovem que administrou um negócio que virou caos -- e chamou de sucesso. O construtor que ergueu um hotel que nunca abriu as portas. O banqueiro que comprou um banco falido e o transformou no maior escândalo financeiro da história do Brasil. Como um menino de família evangélica de Belo Horizonte chegou até aquele aeroporto -- sorrindo. Episódio dois: O Menino de Deus. Amanhã.
```

**Settings for this episode:**
- Voice: [narrator voice_id — select after testing]
- Model: eleven_multilingual_v2
- Stability: 0.70
- Similarity: 0.70
- Style: 0.25
- Export: MP3 192 kbps
