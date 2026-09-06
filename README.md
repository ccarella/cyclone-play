# Cyclone (playable preview)

Public preview of [ccarella/cyclone](https://github.com/ccarella/cyclone) Boss seed AC v0.7 (Pip polish v0.5.1 + Charge AC v0.6 + WebAudio).

**Play:** https://htmlpreview.github.io/?https://github.com/ccarella/cyclone-play/blob/main/index.html

htmlpreview serves the inlined HTML/JS. It does **not** proxy `fetch()` of `.ogg`/`.mp3`. The game detects htmlpreview and loads beds from this repo’s public raw files (`assets/audio/music/level-N.ogg`, MP3 fallback).

**QA clear-assist (16s clock, production heat):** append `?qa=1` (hash fallback `#qa=1`). Three QA waves reach the L4 Rim Wraith.

**QA boss skip:** `?qa=boss` (hash `#qa=boss`) starts the credit on Level 4.

Boss seed AC v0.7: Rim Wraith every 4 levels (first at L4). Higher HP + magenta LUNGE / gold SLAM rim telegraphs. Beat it to steal **Freeze Spin** (flick modifier — ices a slice of the ring) for the rest of the credit.
