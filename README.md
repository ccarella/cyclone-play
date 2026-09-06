# Cyclone (playable preview)

Public preview of [ccarella/cyclone](https://github.com/ccarella/cyclone) Pip AC v0.5 (Tune AC v0.4 + WebAudio level music + racing pip).

**Play:** https://htmlpreview.github.io/?https://github.com/ccarella/cyclone-play/blob/main/index.html

htmlpreview serves the inlined HTML/JS. It does **not** proxy `fetch()` of `.ogg`/`.mp3`. The game detects htmlpreview and loads beds from this repo’s public raw files (`assets/audio/music/level-N.ogg`, MP3 fallback).

**QA clear-assist (16s clock, production heat):** append `?qa=1` (hash fallback `#qa=1`) to hear L2/L3 crossfades without a full 75s clear.

Pip AC v0.5: a bright pip races the ring during play. Tap/flick with it on an enemy or the gold marked wedge for a perfect stop (+200). Miss briefly stutters the storm.
