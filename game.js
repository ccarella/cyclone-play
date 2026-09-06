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
  // ?qa=boss starts the credit on the L4 Rim Wraith (boss still at L4).
  const QA_ASSIST = false;
  const QA_WAVE_S = 16;
  // Tune AC v0.4: +25% opening vs v0.3 (11.2/15.4 * 1.25). First/early muls
  // stay 0.94 so the first crawler is a clean +25% (13.16–18.10 vs 10.53–14.48).
  const ENEMY_SPD_MIN = 14;
  const ENEMY_SPD_MAX = 19.25;
  const FIRST_ENEMY_SPD_MUL = 0.94;
  const EARLY_SPD_MUL = 0.94;
  const LATE_SPD_MUL = 2.25;
  const SPD_RAMP_POW = 1.2;
  const FIRST_EXTRA_SPAWN_S = 1.45;
  const SPAWN_INTERVAL_EARLY = 1.05;
  const SPAWN_INTERVAL_LATE = 0.28;
  // Next level opens at this level's late mul: late / early ≈ 2.3936.
  const LEVEL_CARRY_MUL = LATE_SPD_MUL / EARLY_SPD_MUL;
  const MUSIC_MAX_CUE = 3;
  const MUSIC_FADE_S = 0.75;
  const MUSIC_GAIN = 0.22;
  // Pip AC v0.5: same pip on L1+. Intensity can scale later.
  const PIP_SPD = 5.8;
  const PIP_HIT = 0.4;
  const PIP_BONUS = 200;
  const PIP_STOP_S = 0.1;
  const STUTTER_S = 0.15;
  const STUTTER_SCALE = 0.28;
  const WEDGE_SPD = 0.72;
  const WEDGE_HALF = 0.4;
  // Pip polish AC v0.5.1: linger / hot-window / no miss-stack. Rules unchanged.
  const PIP_POP_S = 0.92;
  const PIP_POP_HOLD_S = 0.28;
  const PIP_POP_RISE = 12;
  const MISS_LOCK_S = 0.85;
  // Charge AC v0.6: hold eye to charge; short tap stays pulse.
  const CHARGE_MIN_S = 0.22;
  const CHARGE_MAX_S = 1.05;
  const CHARGE_AIM_RATE = 2.4;
  const CHARGE_CD_S = 0.55;
  const CHARGE_SWIRL_MUL = 0.32;
  const TWISTER_CONE = 1.15;
  const TWISTER_KNOCK = 48;
  // Boss seed AC v0.7: one Rim Wraith every 4 levels (first at L4).
  // Steal for this thin seed is Freeze Spin (not Volt Chain) — a flick
  // modifier that ices a slice of the ring. Not a new mode.
  const BOSS_EVERY = 4;
  const BOSS_HP = 10;
  const BOSS_CHIP = 100;
  const BOSS_KILL = 800;
  const BOSS_CLEAR_S = 1.35;
  const BOSS_ORBIT = 0.62;
  const LUNGE_WIND_S = 1.15;
  const LUNGE_SPD = 52;
  const SLAM_WIND_S = 1.4;
  const SLAM_SHARDS = 5;
  const SLAM_SPD = 40;
  const STEAL_ID = "freeze";
  const STEAL_NAME = "FREEZE SPIN";
  const ICE_LIFE = 1.4;
  const ICE_HALF = CONE_HALF + 0.28;
  const PAL = {
    bg: "#14081c",
    arena: "#1c0c28",
    ring: "#ff3cac",
    ringDim: "#6b184c",
    cyan: "#3cf3ff",
    cyanDim: "#17808a",
    magenta: "#ff3cac",
    enemy: "#ff4d6d",
    gold: "#ffd84a",
    white: "#f4f1e8",
    ink: "#0a0410",
    ice: "#9ef6ff",
    iceDim: "#4ab8c8",
  };

  const canvas = document.getElementById("game");
  const ctx = canvas.getContext("2d", { alpha: false });

  const state = {
    mode: "title",
    t: 0,
    score: 0,
    level: 1,
    levelSpeedMul: 1,
    timeLeft: WAVE_S,
    spawnAcc: 0,
    pickupAcc: 0,
    aim: -Math.PI / 2,
    enemies: [],
    pickups: [],
    gusts: [],
    fx: [],
    pops: [],
    swirl: [],
    shake: 0,
    hintT: 0,
    pulseCd: 0,
    gustCd: 0,
    pipA: -Math.PI / 2,
    wedgeA: Math.PI / 2,
    stopT: 0,
    stutterT: 0,
    missLockT: 0,
    pipFlash: 0,
    chargeT: 0,
    chargeCd: 0,
    chargeFlash: 0,
    boss: null,
    steal: "",
    ice: null,
    endReason: "",
    input: null,
  };

  const input = {
    down: false,
    x: 0,
    y: 0,
    px: 0,
    py: 0,
    fromEye: false,
    moved: 0,
    samples: [],
    wantAim: null,
    charging: false,
  };

  let audioCtx = null;
  const music = {
    buffers: Object.create(null),
    loads: Object.create(null),
    current: null,
    outgoing: null,
    gen: 0,
  };

  const GLYPH = {
    " ": "000000000000000",
    "0": "111101101101111",
    "1": "010110010010111",
    "2": "111001111100111",
    "3": "111001111001111",
    "4": "101101111001001",
    "5": "111100111001111",
    "6": "111100111101111",
    "7": "111001010010010",
    "8": "111101111101111",
    "9": "111101111001111",
    A: "010101111101101",
    B: "110101110101110",
    C: "011100100100011",
    D: "110101101101110",
    E: "111100110100111",
    F: "111100110100100",
    G: "011100101101011",
    H: "101101111101101",
    I: "111010010010111",
    K: "101101110101101",
    L: "100100100100111",
    M: "101111111101101",
    N: "101111111111101",
    O: "010101101101010",
    P: "110101110100100",
    R: "110101110101101",
    S: "011100010001110",
    T: "111010010010010",
    U: "101101101101111",
    V: "101101101101010",
    W: "101101111111101",
    X: "101010010010101",
    Y: "101101010010010",
    Z: "111001010100111",
    Q: "011101101111001",
    "+": "000010111010000",
    ":": "000010000010000",
    ".": "000000000000010",
    "/": "001001010100100",
    "-": "000000111000000",
  };

  function resize() {
    const vw = window.visualViewport ? window.visualViewport.width : window.innerWidth;
    const vh = window.visualViewport ? window.visualViewport.height : window.innerHeight;
    const scale = Math.min(vw / W, vh / H);
    canvas.style.width = `${Math.floor(W * scale)}px`;
    canvas.style.height = `${Math.floor(H * scale)}px`;
  }
