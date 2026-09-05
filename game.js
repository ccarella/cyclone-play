(() => {
  "use strict";

  const W = 270;
  const H = 480;
  const CX = 135;
  const CY = 258;
  const RING_R = 108;
  const EYE_R = 16;
  const DEATH_R = 24;
  const CONE_HALF = 0.38;
  const WAVE_S = 75;
  // QA clear-assist (default OFF). Shortens the wave *clock* only so Game
  // Design can reach LEVEL 2 without a full 75s clear. Production heat
  // (enemy speed / spawn dials + 75s ramp) stays unchanged.
  // Enable: ?qa=1 (also #qa=1, or set QA_ASSIST true).
  const QA_ASSIST = false;
  const QA_WAVE_S = 16;
