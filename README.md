# Cyclone (playable preview)

Public preview of [ccarella/cyclone](https://github.com/ccarella/cyclone) Charge AC v0.6 (Pip AC v0.5 + Tune AC v0.4 + WebAudio + hold-eye twister).

**Play:** https://htmlpreview.github.io/?https://github.com/ccarella/cyclone-play/blob/main/index.html

htmlpreview serves the inlined HTML/JS. It does **not** proxy `fetch()` of `.ogg`/`.mp3`. The game detects htmlpreview and loads beds from this repo’s public raw files (`assets/audio/music/level-N.ogg`, MP3 fallback).

**QA clear-assist (16s clock, production heat):** append `?qa=1` (hash fallback `#qa=1`).

Charge AC v0.6: hold the cyan eye to charge a twister; release (min fill) fires a screen-clear / big knock along the mouth aim. Short tap is still pulse. While charging the mouth rotates slower. Max hold auto-fires. Death cancels.
