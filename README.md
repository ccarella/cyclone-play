# Cyclone (playable preview)

Public preview of [ccarella/cyclone](https://github.com/ccarella/cyclone) Pip polish AC v0.5.1 (Charge AC v0.6 + Pip AC v0.5 + Tune AC v0.4 + WebAudio).

**Play:** https://htmlpreview.github.io/?https://github.com/ccarella/cyclone-play/blob/main/index.html

htmlpreview serves the inlined HTML/JS. It does **not** proxy `fetch()` of `.ogg`/`.mp3`. The game detects htmlpreview and loads beds from this repo’s public raw files (`assets/audio/music/level-N.ogg`, MP3 fallback).

**QA clear-assist (16s clock, production heat):** append `?qa=1` (hash fallback `#qa=1`).

Pip polish AC v0.5.1: `PERFECT` / `+200` and `MISS` linger ≥0.8s with an ink outline. When the racing pip overlaps an enemy or the marked wedge, that window flashes hard *before* tap. Miss hitch stays brief and does not spam-stack.
