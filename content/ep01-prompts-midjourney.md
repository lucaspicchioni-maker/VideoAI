# EP01 "O Sorriso" — Prompts Midjourney V7

**Personagem Danilo — URL de referencia:**
```
https://cdn.midjourney.com/80110a08-e749-4e07-9e1a-0623f23107cc/0_1.png
```

**Regras para MJ V7:**
- Usar `--ar 9:16 --style raw` em todos
- NAO usar `--cw` nem `--hd` (nao existem no V7)
- Adicionar `--cref [URL]` apenas nas cenas com o Danilo
- Para mais qualidade: adicionar `--q 2`
- Cenas sem Danilo: nao usar `--cref`

---

## GERACAO DO PERSONAGEM — Fazer primeiro

### Prompt base do Danilo (gerar 4-6 variacoes, escolher as melhores 3)
```
Brazilian male, 42 years old, strong angular jaw, dark brown hair slicked back with subtle gel, light brown piercing confident eyes, a permanent slight smile that never disappears even in tense moments, medium athletic build, perfectly tailored charcoal Italian suit, crisp white shirt, precisely folded pocket square, gold watch on left wrist, effortless commanding posture, slight tan, photorealistic, dramatic cinematic lighting --ar 9:16 --style raw
```

### Variacao — Close dramatico (para cenas de tensao)
```
Close portrait of man, dramatic side lighting, dark background, charcoal suit, intense piercing gaze, slight confident smile, photorealistic cinematic --cref https://cdn.midjourney.com/80110a08-e749-4e07-9e1a-0623f23107cc/0_1.png --ar 9:16 --style raw
```

### Variacao — Corpo inteiro (para cenas de ambiente)
```
Full body shot of man in tailored charcoal suit, executive office lobby, confident stance, hands relaxed, photorealistic cinematic --cref https://cdn.midjourney.com/80110a08-e749-4e07-9e1a-0623f23107cc/0_1.png --ar 9:16 --style raw
```

> Salvar URLs das melhores variacoes em: `content/series/danilo-vasconcelos/characters/danilo-cref.txt`
> Usar todas as URLs aprovadas juntas: `--cref URL1 URL2 URL3`

---

## 7 IMAGENS DO EP01

### IMG 1 — Camera de seguranca [0:00-0:15]
**COM Danilo | Usar --cref**
```
CCTV security camera aesthetic, black and white grainy surveillance footage, luxury airport private terminal at night, elegant man in dark suit pausing in corridor, three other suited men standing in front of him, calm tense scene, security camera grain effect, cinematic high contrast, timestamp bottom corner --cref https://cdn.midjourney.com/80110a08-e749-4e07-9e1a-0623f23107cc/0_1.png --ar 9:16 --style raw
```
**Salvar como:** `assets/midjourney/ep01-img01-aeroporto.png`

**Prompt alternativo se bloquear:**
```
Grainy black and white CCTV footage style, luxury private terminal corridor night, businessman in dark suit pausing, three men in suits standing ahead, cinematic surveillance aesthetic, high contrast grain, timestamp overlay --ar 9:16 --style raw
```

**Kling (animacao):**
```
Man in suit pauses as three men block corridor, turns head slowly, slight confident smile forms, CCTV subtle zoom-in, black and white, 7 seconds
```

---

### IMG 2 — Jato na pista [0:15-0:40]
**SEM Danilo | Sem --cref**
```
Private executive Falcon 7X business jet on dark wet tarmac at night, both engines running with visible heat shimmer, red and white navigation lights blinking, city lights visible in background through airport fence, wet tarmac reflections, sense of interrupted departure, no people visible, cinematic vertical --ar 9:16 --style raw
```
**Salvar como:** `assets/midjourney/ep01-img02-jato.png`

**Kling:**
```
Jet engines glowing orange-white in dark night, camera pulls back slowly revealing full aircraft, navigation lights blink rhythmically, heat shimmer rises from engines, dramatic stillness, 7 seconds
```

---

### IMG 3A — Videoconferencia [0:40-1:05]
**COM Danilo | Usar --cref**
```
Man in sleek all-glass executive boardroom, large screen monitor showing government video call with multiple faces, afternoon golden light streaming through floor-to-ceiling windows, charcoal tailored suit, slight confident smile, photorealistic cinematic --cref https://cdn.midjourney.com/80110a08-e749-4e07-9e1a-0623f23107cc/0_1.png --ar 9:16 --style raw
```
**Salvar como:** `assets/midjourney/ep01-img03a-videoconf.png`

**Kling:**
```
Man leans back slightly in executive chair, taps finger once on glass table, nods with controlled confidence at video call screen, afternoon light shifts subtly, 6 seconds
```

---

### IMG 3B — Elevador [1:05-1:30]
**COM Danilo | Usar --cref**
```
Man standing alone in glass-walled executive elevator, looking down at phone in hand, expression unreadable and calculating, Sao Paulo city skyline visible through glass behind him, late afternoon light turning to dusk, dark tailored suit --cref https://cdn.midjourney.com/80110a08-e749-4e07-9e1a-0623f23107cc/0_1.png --ar 9:16 --style raw
```
**Salvar como:** `assets/midjourney/ep01-img03b-elevador.png`

**Kling (opcional):**
```
Man in elevator looks down at phone screen, slight jaw tension visible, city view shifts behind glass, subtle elevator descent implied, 5 seconds
```

---

### IMG 4 — Sala de pericia [1:30-2:30]
**SEM Danilo | Sem --cref**
```
Federal police forensic digital evidence lab, white latex-gloved hands slowly examining seized black smartphone on illuminated glass examination table, dark room with cold blue forensic work lighting, phone screen showing partial chat message threads, evidence tags and case numbers visible beside device, sterile clinical atmosphere, cinematic vertical --ar 9:16 --style raw
```
**Salvar como:** `assets/midjourney/ep01-img04-pericia.png`

**Kling:**
```
Forensic gloved hands slowly rotate smartphone on illuminated table, screen lights up revealing message threads, camera slowly pushes in toward device screen, cold blue lighting, tense silence, 8 seconds
```

---

### IMG 5 — Flashback 1983 [2:30-3:15]
**SEM Danilo adulto | Sem --cref**
```
Super 8 film grain aesthetic, warm sepia amber tones, 1983 Brazilian modest lower-middle-class home interior, very young mother 16 years old holding newborn baby, young father 20 beside her both looking at camera, in background slightly out of focus stern elderly Italian-Brazilian patriarch in black Sunday suit holding black leather Bible, natural window light, vintage family photograph aesthetic --ar 9:16 --style raw
```
**Salvar como:** `assets/midjourney/ep01-img05-flashback.png`

**Kling:**
```
Super 8 film flickers and scratches, camera slowly pushes forward toward elderly man with Bible in soft background, his sharp eyes gradually catch warm light, slow deliberate zoom, 8 seconds
```

---

### IMG 6 — Split cliffhanger [3:15-4:00]
**COM Danilo | Usar --cref**
```
Dramatic vertical diptych composition, top half shows 1983 warm sepia evangelical family scene in Brazilian home, bottom half shows 2025 cold blue airport terminal scene, slight confident smile is the visual thread connecting both eras across the horizontal frame split, cinematic vertical format, high contrast between warm past and cold present --cref https://cdn.midjourney.com/80110a08-e749-4e07-9e1a-0623f23107cc/0_1.png --ar 9:16 --style raw
```
**Salvar como:** `assets/midjourney/ep01-img06-split.png`

**Kling:**
```
Slow temporal dissolve from warm sepia 1983 family scene to cold blue 2025 airport scene, smile remains constant across the transition, gradual fade to black in final 2 seconds, 8 seconds
```

---

## ORDEM DE GERACAO RECOMENDADA

1. Gerar variacoes do Danilo (3-4 imagens via "Vary Subtle")
2. IMG 2 — Jato (sem Danilo, mais facil)
3. IMG 4 — Pericia (sem Danilo)
4. IMG 5 — Flashback (sem Danilo)
5. IMG 3A — Videoconferencia (com Danilo)
6. IMG 3B — Elevador (com Danilo)
7. IMG 1 — Aeroporto (com Danilo, camera longe ajuda)
8. IMG 6 — Split (com Danilo, mais complexo)

---

## CHECKLIST

- [ ] Variacoes do Danilo geradas e URLs salvas
- [ ] IMG 1 gerada e aprovada
- [ ] IMG 2 gerada e aprovada
- [ ] IMG 3A gerada e aprovada
- [ ] IMG 3B gerada e aprovada
- [ ] IMG 4 gerada e aprovada
- [ ] IMG 5 gerada e aprovada
- [ ] IMG 6 gerada e aprovada
- [ ] Todas salvas em `assets/midjourney/`
- [ ] Prontas para enviar ao Kling
