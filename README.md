# Cyclone (playable preview)

Public preview of [ccarella/cyclone](https://github.com/ccarella/cyclone) v0 (Tune AC v0.4 + WebAudio level music).

**Play:** https://htmlpreview.github.io/?https://github.com/ccarella/cyclone-play/blob/main/index.html

htmlpreview serves the inlined HTML/JS. It does **not** proxy `fetch()` of `.ogg`/`.mp3`. The game detects htmlpreview and loads beds from this repo’s public raw files (`assets/audio/music/level-N.ogg`, MP3 fallback).

**QA clear-assist (16s clock, production heat):** append `?qa=1` (hash fallback `#qa=1`) to hear L2/L3 crossfades without a full 75s clear.
