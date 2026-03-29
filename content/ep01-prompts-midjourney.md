# EP01 "O Sorriso" — Prompts Midjourney V7

**Tecnica:** Frame A + Frame B por cena (agente midjourney-director.md do lucascgh)
**Versao MJ:** V7
**Parametros V7:**
- `--ar 9:16` sempre
- `--s 200` para fotorrealismo (--style raw foi REMOVIDO no V7)
- `--no text, watermark, logo, subtitle` em todos
- `--cref [URL]` + mesmo `--seed` em cenas com Danilo
- `--sref [URL]` quando tivermos style reference da serie

**Personagem Danilo — URL de referencia aprovada:**
```
https://cdn.midjourney.com/80110a08-e749-4e07-9e1a-0623f23107cc/0_1.png
```

**Descricao fixa do Danilo (copiar em todo prompt com ele):**
```
Brazilian male, 42 years old, strong angular jaw, dark brown hair slicked back with subtle gel, light brown piercing confident eyes, a permanent slight smile that never disappears even in tense moments, medium athletic build, perfectly tailored charcoal Italian suit, crisp white shirt, precisely folded pocket square, gold watch on left wrist, effortless commanding posture, slight tan
```

---

## GERACAO DO PERSONAGEM — Fazer antes de tudo

### Gerar 4 referencias do Danilo (character sheet)
Gerar cada uma separado, upscalar a melhor, salvar URL:

**1. Frontal neutro (base principal):**
```
Brazilian male, 42 years old, strong angular jaw, dark brown hair slicked back with subtle gel, light brown piercing confident eyes, permanent slight smile, medium athletic build, perfectly tailored charcoal Italian suit, crisp white shirt, gold watch on left wrist, plain dark background, front facing, dramatic cinematic lighting --ar 9:16 --s 200 --no text, watermark, logo --cref https://cdn.midjourney.com/80110a08-e749-4e07-9e1a-0623f23107cc/0_1.png
```

**2. 3/4 perfil (cenas de lado):**
```
Brazilian male, 42 years old, strong angular jaw, dark brown hair slicked back, light brown piercing eyes, slight confident smile, charcoal Italian suit, three-quarter profile angle, moody dramatic lighting, dark background, cinematic --ar 9:16 --s 200 --no text, watermark, logo --cref https://cdn.midjourney.com/80110a08-e749-4e07-9e1a-0623f23107cc/0_1.png
```

**3. Corpo inteiro (cenas de ambiente):**
```
Brazilian male, 42 years old, perfectly tailored charcoal Italian suit, gold watch, commanding posture, standing in luxury environment, full body shot, cinematic vertical --ar 9:16 --s 200 --no text, watermark, logo --cref https://cdn.midjourney.com/80110a08-e749-4e07-9e1a-0623f23107cc/0_1.png
```

**4. Close dramatico (cenas de tensao):**
```
Brazilian male, 42 years old, strong angular jaw, dark brown hair slicked back, light brown piercing eyes, extreme close-up portrait, dramatic side lighting, chiaroscuro, dark background, intense expression with subtle smile, 85mm lens --ar 9:16 --s 200 --no text, watermark, logo --cref https://cdn.midjourney.com/80110a08-e749-4e07-9e1a-0623f23107cc/0_1.png
```

> Salvar URLs em: `content/series/danilo-vasconcelos/characters/characters-reference.md`

---

## EP01 — PARES DE FRAMES POR CENA

---

### CENA 1 — Camera de seguranca [0:00-0:15]
**Tipo:** Tension (5-7s) | **COM Danilo**

**FRAME A — Homem caminhando:**
```
CCTV surveillance footage aesthetic, black and white, grainy high-contrast security camera, luxury private airport terminal corridor at night, Brazilian male, 42 years old, strong angular jaw, dark brown hair slicked back, charcoal suit, walking confidently toward camera, relaxed expression, slight smile, timestamp overlay bottom corner, wide shot --ar 9:16 --s 100 --no color, watermark, logo --cref https://cdn.midjourney.com/80110a08-e749-4e07-9e1a-0623f23107cc/0_1.png --seed 42501
```

**FRAME B — Homem parado, sorrindo para os agentes:**
```
CCTV surveillance footage aesthetic, black and white, grainy high-contrast security camera, luxury private airport terminal corridor at night, Brazilian male, 42 years old, strong angular jaw, dark brown hair slicked back, charcoal suit, stopped in corridor, three suited men blocking path ahead, man looking toward agents with calm confident smile, timestamp overlay bottom corner, wide shot --ar 9:16 --s 100 --no color, watermark, logo --cref https://cdn.midjourney.com/80110a08-e749-4e07-9e1a-0623f23107cc/0_1.png --seed 42501
```

**Kling (animar Frame A → Frame B):**
```
Man in suit slows and stops as three men block corridor, turns head slightly toward camera, calm confident smile forms, CCTV zoom-in subtle, black and white surveillance, 7 seconds
```
**Salvar:** `assets/midjourney/ep01-c1a-aeroporto-frameA.png` / `ep01-c1b-aeroporto-frameB.png`

---

### CENA 2 — Jato na pista [0:15-0:40]
**Tipo:** Establishing (7s) | **SEM Danilo**

**FRAME A — Jato parado, luzes piscando:**
```
Private executive Falcon 7X business jet parked on dark wet tarmac at night, engines at idle, navigation lights steady, Sao Paulo city lights distant background, wet tarmac reflections, no people visible, sense of waiting, wide establishing shot, CineStill 800T film look --ar 9:16 --s 250 --no text, watermark, people
```

**FRAME B — Motores esquentando, shimmer visivel:**
```
Private executive Falcon 7X business jet on dark wet tarmac at night, engines running with visible heat shimmer rising, navigation lights blinking urgently, Sao Paulo city lights distant background, wet tarmac reflections, no people visible, sense of interrupted departure, wide establishing shot, CineStill 800T film look --ar 9:16 --s 250 --no text, watermark, people
```

**Kling:**
```
Jet engines slowly spin up, heat shimmer becomes visible rising from exhaust, navigation lights begin blinking, camera slowly pulls back revealing full aircraft silhouette, dramatic stillness, 7 seconds
```
**Salvar:** `assets/midjourney/ep01-c2a-jato-frameA.png` / `ep01-c2b-jato-frameB.png`

---

### CENA 3A — Videoconferencia tranquila [0:40-1:05]
**Tipo:** Dialogue (6s) | **COM Danilo**

**FRAME A — Danilo ouvindo, relaxado:**
```
Brazilian male, 42 years old, strong angular jaw, dark brown hair slicked back with subtle gel, light brown piercing confident eyes, permanent slight smile, charcoal Italian suit, sitting at glass boardroom table, large monitor showing video call with government officials, afternoon golden light streaming through floor-to-ceiling windows, Sao Paulo skyline background, medium shot at eye level, 50mm lens, cinematic color grading --ar 9:16 --s 200 --no text, watermark, logo --cref https://cdn.midjourney.com/80110a08-e749-4e07-9e1a-0623f23107cc/0_1.png --seed 42502
```

**FRAME B — Danilo concordando, sorriso controlado:**
```
Brazilian male, 42 years old, strong angular jaw, dark brown hair slicked back with subtle gel, light brown piercing confident eyes, permanent slight smile, charcoal Italian suit, sitting at glass boardroom table leaning forward slightly, large monitor showing video call with government officials, afternoon golden light streaming through floor-to-ceiling windows, Sao Paulo skyline background, nodding with controlled confidence, medium shot at eye level, 50mm lens, cinematic color grading --ar 9:16 --s 200 --no text, watermark, logo --cref https://cdn.midjourney.com/80110a08-e749-4e07-9e1a-0623f23107cc/0_1.png --seed 42502
```

**Kling:**
```
Man leans forward slightly in executive chair, taps finger once on glass table, nods with controlled confidence at video call screen, afternoon light shifts subtly, 6 seconds
```
**Salvar:** `assets/midjourney/ep01-c3a-videoconf-frameA.png` / `ep01-c3b-videoconf-frameB.png`

---

### CENA 3B — Danilo no elevador [1:05-1:30]
**Tipo:** Internal thought (5s) | **COM Danilo**

**FRAME A — Danilo olhando o celular, calmo:**
```
Brazilian male, 42 years old, strong angular jaw, dark brown hair slicked back, light brown piercing eyes, charcoal suit, standing alone in all-glass executive elevator, looking down at smartphone in hand, neutral calculating expression, Sao Paulo city skyline visible through glass behind him, late afternoon golden light, medium shot, 35mm lens, cinematic vertical --ar 9:16 --s 200 --no text, watermark, logo --cref https://cdn.midjourney.com/80110a08-e749-4e07-9e1a-0623f23107cc/0_1.png --seed 42503
```

**FRAME B — Danilo guardando o celular, decisao tomada:**
```
Brazilian male, 42 years old, strong angular jaw, dark brown hair slicked back, light brown piercing eyes, charcoal suit, standing alone in all-glass executive elevator, pocketing smartphone, looking straight ahead with unreadable calculating expression, Sao Paulo city skyline visible through glass behind him, late afternoon light turning to dusk, medium shot, 35mm lens, cinematic vertical --ar 9:16 --s 200 --no text, watermark, logo --cref https://cdn.midjourney.com/80110a08-e749-4e07-9e1a-0623f23107cc/0_1.png --seed 42503
```

**Kling:**
```
Man in elevator looks down at phone, jaw tightens slightly, slowly pockets the phone, looks straight ahead with unreadable expression, city view drifts behind glass, 5 seconds
```
**Salvar:** `assets/midjourney/ep01-c3c-elevador-frameA.png` / `ep01-c3d-elevador-frameB.png`

---

### CENA 4 — Sala de pericia [1:30-2:30]
**Tipo:** Reveal (8s) | **SEM Danilo**

**FRAME A — Celular apagado na mesa:**
```
Federal police forensic digital evidence lab, white latex-gloved hands holding black seized smartphone face-down on illuminated glass examination table, dark room with cold blue forensic lighting, evidence tags and case number labels visible, sterile clinical atmosphere, overhead shot looking down, 50mm lens --ar 9:16 --s 200 --no text, watermark, logo
```

**FRAME B — Celular virado, tela acesa com mensagens:**
```
Federal police forensic digital evidence lab, white latex-gloved hands turning black seized smartphone face-up on illuminated glass examination table, screen lit showing WhatsApp conversation threads, dark room with cold blue forensic lighting, evidence tags and case number labels visible, sterile clinical atmosphere, overhead shot looking down, 50mm lens --ar 9:16 --s 200 --no text, watermark, logo
```

**Kling:**
```
Forensic gloved hands slowly rotate smartphone on illuminated table, screen activates revealing chat message threads as phone turns face-up, camera slowly pushes in toward device screen, cold blue forensic lighting, tense silence, 8 seconds
```
**Salvar:** `assets/midjourney/ep01-c4a-pericia-frameA.png` / `ep01-c4b-pericia-frameB.png`

---

### CENA 5 — Flashback 1983 [2:30-3:15]
**Tipo:** Flashback (8s) | **SEM Danilo adulto**

**FRAME A — Familia, avo ao fundo desfocado:**
```
Super 8 film grain aesthetic, warm sepia amber tones, 1983 Belo Horizonte modest home interior, very young mother 16 holding newborn baby, young father 20 beside her both looking at camera, elderly Italian-Brazilian patriarch in black Sunday suit holding black Bible slightly out of focus in background, natural window light, vintage family photograph, wide shot --ar 9:16 --s 150 --no text, watermark, logo
```

**FRAME B — Camera empurra, avo em foco, olhos intensos:**
```
Super 8 film grain aesthetic, warm sepia amber tones, 1983 Belo Horizonte modest home interior, elderly Italian-Brazilian patriarch in black Sunday suit holding black Bible now in focus and prominent, sharp moral piercing eyes looking directly at camera, young couple with baby slightly blurred in foreground, natural window light, vintage family photograph, medium close-up --ar 9:16 --s 150 --no text, watermark, logo
```

**Kling:**
```
Super 8 film flickers and scratches, camera slowly pushes forward, focus shifts from young family in foreground to elderly patriarch with Bible in background, his sharp eyes come into clarity, slow deliberate zoom, warm sepia light, 8 seconds
```
**Salvar:** `assets/midjourney/ep01-c5a-flashback-frameA.png` / `ep01-c5b-flashback-frameB.png`

---

### CENA 6 — Cliffhanger split [3:15-4:00]
**Tipo:** Cliffhanger (8s) | **COM Danilo**

**FRAME A — Split estatico, dois mundos:**
```
Dramatic vertical diptych split-screen composition, top half shows 1983 warm sepia evangelical Brazilian family scene in modest home, bottom half shows 2025 cold blue airport terminal scene, Brazilian male, 42 years old, strong angular jaw, slight confident smile visible in the bottom half airport scene, sharp horizontal dividing line between eras, cinematic vertical --ar 9:16 --s 200 --no text, watermark, logo --cref https://cdn.midjourney.com/80110a08-e749-4e07-9e1a-0623f23107cc/0_1.png
```

**FRAME B — Split com fade to black comecando:**
```
Dramatic vertical diptych split-screen composition, top half shows 1983 warm sepia evangelical Brazilian family scene fading slightly, bottom half shows 2025 cold blue airport terminal scene, Brazilian male, 42 years old, strong angular jaw, same slight confident smile connecting both time periods, horizontal dividing line softening, very slight vignette darkening edges, cinematic vertical --ar 9:16 --s 200 --no text, watermark, logo --cref https://cdn.midjourney.com/80110a08-e749-4e07-9e1a-0623f23107cc/0_1.png
```

**Kling:**
```
Slow temporal dissolve between split screen halves, warm 1983 sepia above and cold 2025 blue below, smile remains constant as the connecting thread, edges slowly darken toward black, fade to black in final 2 seconds, 8 seconds
```
**Salvar:** `assets/midjourney/ep01-c6a-split-frameA.png` / `ep01-c6b-split-frameB.png`

---

## RESUMO — 14 IMAGENS TOTAIS

| Cena | Frame A | Frame B | Danilo | Kling |
|------|---------|---------|--------|-------|
| C1 Aeroporto | ep01-c1a | ep01-c1b | Sim | Obrigatorio |
| C2 Jato | ep01-c2a | ep01-c2b | Nao | Obrigatorio |
| C3A Videoconf | ep01-c3a | ep01-c3b | Sim | Obrigatorio |
| C3B Elevador | ep01-c3c | ep01-c3d | Sim | Opcional |
| C4 Pericia | ep01-c4a | ep01-c4b | Nao | Obrigatorio |
| C5 Flashback | ep01-c5a | ep01-c5b | Nao | Obrigatorio |
| C6 Split | ep01-c6a | ep01-c6b | Sim | Obrigatorio |

**Total: 14 imagens Midjourney → 6-7 clips Kling → 1 narração ElevenLabs**

---

## CHECKLIST DE PRODUCAO

**Personagem:**
- [ ] 4 referencias do Danilo geradas e URLs salvas em characters-reference.md

**Imagens:**
- [ ] C1 Frame A + B gerados
- [ ] C2 Frame A + B gerados
- [ ] C3A Frame A + B gerados
- [ ] C3B Frame A + B gerados
- [ ] C4 Frame A + B gerados
- [ ] C5 Frame A + B gerados
- [ ] C6 Frame A + B gerados
- [ ] Todos salvos em `assets/midjourney/`

**Animacao Kling:**
- [ ] C1 clip animado (7s)
- [ ] C2 clip animado (7s)
- [ ] C3A clip animado (6s)
- [ ] C3B clip animado (5s) — opcional
- [ ] C4 clip animado (8s)
- [ ] C5 clip animado (8s)
- [ ] C6 clip animado (8s)
- [ ] Todos salvos em `assets/kling/`

**Audio:**
- [ ] Narracao gerada no ElevenLabs (~2:30-3:00)
- [ ] Salva em `assets/audio/ep01-narracao.mp3`

**Montagem:**
- [ ] CapCut — projeto 1080x1920 criado
- [ ] Clips montados na ordem correta
- [ ] Textos e numeros adicionados
- [ ] Legenda automatica gerada
- [ ] Trilha em 15-20% narracao / 60% cliffhanger
- [ ] Disclaimer 3s no inicio
- [ ] Revisado em dispositivo movel
- [ ] Exportado 1080p MP4

**Publicacao:**
- [ ] Instagram Reels
- [ ] TikTok
- [ ] YouTube Shorts
- [ ] Horario: 19h
