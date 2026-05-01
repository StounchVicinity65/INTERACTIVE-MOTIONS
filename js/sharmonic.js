<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Simple Harmonic Motion</title>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+Bengali:wght@400;700&family=Share+Tech+Mono&family=Exo+2:wght@300;400;700;900&display=swap" rel="stylesheet"/>
  <style>
    :root {
      --blue:   #90cdf4;
      --blue-d: #4a90e2;
      --green:  #68d391;
      --yellow: #f6e05e;
      --orange: #f6ad55;
      --bg:     #04080f;
      --card:   rgba(5,14,32,0.88);
      --dim:    #8ba3bb;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      font-family: 'Exo 2', sans-serif;
      background: var(--bg);
      color: #f0f0f0;
      min-height: 100vh;
      overflow-x: hidden;
    }
    body.bangla { font-family: 'Noto Serif Bengali', sans-serif; }

    /* animated bg */
    #bgLayer {
      position: fixed; inset: 0; z-index: 0;
      background:
        radial-gradient(ellipse at 20% 50%, rgba(74,144,226,0.06) 0%, transparent 60%),
        radial-gradient(ellipse at 80% 20%, rgba(104,211,145,0.04) 0%, transparent 55%),
        linear-gradient(145deg, rgba(9,32,63,0.95), rgba(4,12,26,0.97));
    }
    /* subtle grid */
    #bgGrid {
      position: fixed; inset: 0; z-index: 0;
      background-image:
        linear-gradient(rgba(144,205,244,0.025) 1px, transparent 1px),
        linear-gradient(90deg, rgba(144,205,244,0.025) 1px, transparent 1px);
      background-size: 40px 40px;
    }

    .wrapper { position: relative; z-index: 1; display: flex; flex-direction: column; min-height: 100vh; padding-bottom: 2rem; }

    /* TOP BAR */
    .topbar {
      display: flex; align-items: center; justify-content: space-between;
      padding: 0.75rem 1.5rem;
      background: rgba(0,0,0,0.65);
      backdrop-filter: blur(14px);
      border-bottom: 1px solid rgba(144,205,244,0.12);
      position: sticky; top: 0; z-index: 100;
    }
    .back-btn {
      text-decoration: none; color: var(--dim);
      background: rgba(0,0,0,0.4);
      padding: 0.4rem 0.9rem; border-radius: 6px;
      font-size: 0.85rem; border: 1px solid rgba(144,205,244,0.18);
      transition: all 0.2s; font-family: 'Share Tech Mono', monospace;
    }
    .back-btn:hover { color: var(--blue); border-color: var(--blue); background: rgba(74,144,226,0.12); }
    .page-title {
      font-family: 'Exo 2', sans-serif;
      font-size: 1.35rem; font-weight: 900; font-style: italic;
      color: var(--green);
      text-shadow: 0 0 22px rgba(104,211,145,0.35);
    }
    #languageToggle {
      background: rgba(0,0,0,0.5); color: white;
      padding: 0.4rem 0.9rem; border: 1px solid rgba(144,205,244,0.28);
      border-radius: 20px; font-size: 0.78rem; font-weight: 700;
      cursor: pointer; font-family: 'Share Tech Mono', monospace;
      transition: all 0.2s; letter-spacing: 0.04em;
    }
    #languageToggle:hover { background: var(--blue-d); border-color: transparent; }

    /* MODE TABS */
    .mode-tabs {
      display: flex; gap: 0; margin: 1.1rem auto 0;
      background: rgba(0,0,0,0.45);
      border: 1px solid rgba(144,205,244,0.14);
      border-radius: 10px; overflow: hidden;
      width: fit-content;
    }
    .tab-btn {
      padding: 0.55rem 2rem; border: none; background: transparent;
      color: var(--dim); font-family: 'Exo 2', sans-serif;
      font-size: 0.9rem; font-weight: 700; cursor: pointer;
      transition: all 0.22s; letter-spacing: 0.04em; border-right: 1px solid rgba(144,205,244,0.1);
    }
    .tab-btn:last-child { border-right: none; }
    .tab-btn.active {
      background: linear-gradient(135deg, rgba(74,144,226,0.22), rgba(104,211,145,0.12));
      color: var(--blue);
    }
    .tab-btn:hover:not(.active) { background: rgba(255,255,255,0.06); color: #ccc; }

    /* MAIN LAYOUT */
    .main { display: flex; gap: 1.2rem; padding: 1.1rem 1.5rem; flex: 1; }

    /* LEFT PANEL */
    .left-panel { display: flex; flex-direction: column; gap: 0.9rem; width: 282px; min-width: 282px; }

    .panel {
      background: var(--card);
      border: 1px solid rgba(144,205,244,0.14);
      border-radius: 12px;
      padding: 1.15rem 1.25rem;
      backdrop-filter: blur(10px);
      box-shadow: 0 0 22px rgba(0,0,0,0.45);
    }
    .panel-label {
      font-family: 'Share Tech Mono', monospace;
      font-size: 0.6rem; letter-spacing: 0.16em; text-transform: uppercase;
      color: rgba(144,205,244,0.45); margin-bottom: 0.62rem;
    }

    /* Definition */
    .def-text { font-size: 0.86rem; line-height: 1.72; color: var(--dim); }
    .def-text strong { color: var(--blue); }
    .def-text em { color: var(--yellow); font-style: normal; font-family: 'Share Tech Mono', monospace; font-size: 0.81rem; }

    /* Formula */
    .formula-block {
      margin-top: 0.75rem;
      background: rgba(0,0,0,0.38);
      border-radius: 8px;
      padding: 0.7rem 0.9rem;
      border-left: 2px solid var(--green);
    }
    .formula-row {
      display: flex; align-items: baseline; gap: 0.5rem;
      margin-bottom: 0.3rem;
    }
    .formula-row:last-child { margin-bottom: 0; }
    .formula-label { font-size: 0.67rem; color: var(--dim); font-family: 'Share Tech Mono', monospace; min-width: 42px; }
    .formula-eq { font-family: 'Share Tech Mono', monospace; font-size: 0.88rem; color: var(--yellow); }
    .formula-note { font-size: 0.67rem; color: rgba(139,163,187,0.6); font-family: 'Share Tech Mono', monospace; }

    /* Controls */
    .control-row { display: flex; flex-direction: column; gap: 0.18rem; margin-bottom: 0.8rem; }
    .control-row label { font-size: 0.79rem; color: var(--dim); font-weight: 500; }
    .control-row input[type="range"] { width: 100%; accent-color: var(--blue-d); cursor: pointer; height: 4px; }
    .range-val { font-family: 'Share Tech Mono', monospace; font-size: 0.88rem; color: var(--blue); margin-left: 0.5rem; min-width: 40px; }
    .range-row { display: flex; align-items: center; }

    .btn-row { display: flex; gap: 0.55rem; margin-top: 0.25rem; }
    .btn {
      flex: 1; padding: 0.58rem 0; border: none; border-radius: 7px;
      font-size: 0.88rem; font-weight: 700; cursor: pointer;
      font-family: 'Exo 2', sans-serif; transition: all 0.22s; letter-spacing: 0.03em;
    }
    .btn-sim { background: linear-gradient(135deg, #4a90e2, #1d4ed8); color: white; }
    .btn-sim:hover { filter: brightness(1.18); transform: translateY(-2px); box-shadow: 0 6px 22px rgba(74,144,226,0.42); }
    .btn-stop { background: rgba(246,173,85,0.18); color: var(--orange); border: 1px solid rgba(246,173,85,0.3); }
    .btn-stop:hover { background: rgba(246,173,85,0.28); }
    .btn-reset { background: rgba(255,255,255,0.07); color: var(--dim); border: 1px solid rgba(255,255,255,0.13); }
    .btn-reset:hover { background: rgba(255,255,255,0.13); color: white; }

    /* Stats */
    .stats-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.58rem; }
    .stat-card {
      background: rgba(0,0,0,0.38);
      border: 1px solid rgba(144,205,244,0.11);
      border-radius: 8px; padding: 0.55rem 0.7rem;
    }
    .stat-label { font-size: 0.64rem; color: var(--dim); font-family: 'Share Tech Mono', monospace; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 0.18rem; }
    .stat-val { font-size: 1.18rem; font-weight: 700; color: var(--blue); font-family: 'Share Tech Mono', monospace; }
    .stat-unit { font-size: 0.64rem; color: var(--dim); margin-left: 0.15rem; }
    .stat-card.hi1 { border-color: rgba(104,211,145,0.3); }
    .stat-card.hi1 .stat-val { color: var(--green); }
    .stat-card.hi2 { border-color: rgba(246,224,94,0.28); }
    .stat-card.hi2 .stat-val { color: var(--yellow); }

    /* CANVAS AREA */
    .canvas-area { flex: 1; display: flex; flex-direction: column; gap: 0.75rem; min-width: 0; }
    .canvas-wrap {
      background: var(--card);
      border: 1px solid rgba(144,205,244,0.14);
      border-radius: 12px; overflow: hidden;
      box-shadow: 0 0 30px rgba(0,0,0,0.55);
      flex: 1; min-height: 280px; position: relative;
    }
    .canvas-wrap canvas { display: block; }

    /* Graph row */
    .graph-row { display: flex; gap: 0.75rem; }
    .graph-wrap {
      background: var(--card);
      border: 1px solid rgba(144,205,244,0.13);
      border-radius: 12px; overflow: hidden;
      box-shadow: 0 0 16px rgba(0,0,0,0.35);
      height: 155px; flex: 1; min-width: 0;
    }
    .graph-label {
      font-family: 'Share Tech Mono', monospace;
      font-size: 0.6rem; letter-spacing: 0.12em; text-transform: uppercase;
      color: rgba(144,205,244,0.42); padding: 0.4rem 0.8rem 0;
    }
    canvas.graph { display: block; width: 100%; height: 122px; }

    .hidden { display: none !important; }

    @media (max-width: 920px) {
      .main { flex-direction: column; }
      .left-panel { width: 100%; min-width: auto; flex-direction: row; flex-wrap: wrap; }
      .panel { flex: 1; min-width: 240px; }
      .graph-row { flex-direction: column; }
    }
  </style>
</head>
<body>
<div id="bgLayer"></div>
<div id="bgGrid"></div>

<div class="wrapper">
  <!-- TOP BAR -->
  <div class="topbar">
    <a href="index.html" class="back-btn">← <span class="lang-en">Back</span><span class="lang-bn hidden">পিছনে</span></a>
    <div class="page-title">
      <span class="lang-en">〜 Simple Harmonic Motion</span>
      <span class="lang-bn hidden">〜 সরল স্পন্দন গতি</span>
    </div>
    <button id="languageToggle">বাংলা / EN</button>
  </div>

  <!-- MODE TABS -->
  <div class="mode-tabs" id="modeTabs">
    <button class="tab-btn active" id="tabPendulum" onclick="switchMode('pendulum')">
      <span class="lang-en">🔵 Pendulum</span><span class="lang-bn hidden">🔵 দোলক</span>
    </button>
    <button class="tab-btn" id="tabSpring" onclick="switchMode('spring')">
      <span class="lang-en">🟢 Spring</span><span class="lang-bn hidden">🟢 স্প্রিং</span>
    </button>
  </div>

  <div class="main">
    <!-- LEFT PANEL -->
    <div class="left-panel">

      <!-- Definition -->
      <div class="panel">
        <div class="panel-label"><span class="lang-en">Definition</span><span class="lang-bn hidden">সংজ্ঞা</span></div>

        <!-- Pendulum definition -->
        <div id="defPendulum">
          <p class="def-text lang-en">
            A <strong>pendulum</strong> undergoes SHM when displaced from its equilibrium — gravity acts as the restoring force pulling it back. The period depends only on <em>length</em> and <em>gravity</em>, not mass.
          </p>
          <p class="def-text lang-bn hidden">
            একটি <strong>দোলক</strong> তার সাম্যাবস্থান থেকে সরানো হলে সরল স্পন্দন গতি করে — মাধ্যাকর্ষণ পুনরুদ্ধারকারী বল হিসেবে কাজ করে। পর্যায়কাল শুধু <em>দৈর্ঘ্য</em> ও <em>অভিকর্ষ</em>-এর উপর নির্ভর করে।
          </p>
          <div class="formula-block">
            <div class="formula-row">
              <span class="formula-label">Period</span>
              <span class="formula-eq">T = 2π √(L/g)</span>
            </div>
            <div class="formula-row">
              <span class="formula-label">Accel</span>
              <span class="formula-eq">α = −(g/L) sinθ</span>
            </div>
            <div class="formula-row" style="margin-top:0.4rem">
              <span class="formula-note">L = length · g = 9.8 m/s² · θ = angle</span>
            </div>
          </div>
        </div>

        <!-- Spring definition -->
        <div id="defSpring" class="hidden">
          <p class="def-text lang-en">
            A <strong>spring-mass system</strong> oscillates because the spring's restoring force is proportional to displacement — Hooke's Law. Heavier mass means slower oscillation; stiffer spring means faster.
          </p>
          <p class="def-text lang-bn hidden">
            একটি <strong>স্প্রিং-ভর সিস্টেম</strong> দোলে কারণ স্প্রিংয়ের পুনরুদ্ধারকারী বল সরণের সমানুপাতিক — হুকের সূত্র। বেশি ভর মানে ধীর, শক্তিশালী স্প্রিং মানে দ্রুত।
          </p>
          <div class="formula-block">
            <div class="formula-row">
              <span class="formula-label">Period</span>
              <span class="formula-eq">T = 2π √(m/k)</span>
            </div>
            <div class="formula-row">
              <span class="formula-label">Force</span>
              <span class="formula-eq">F = −kx</span>
            </div>
            <div class="formula-row" style="margin-top:0.4rem">
              <span class="formula-note">m = mass (kg) · k = spring constant · x = displacement</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Controls -->
      <div class="panel">
        <div class="panel-label"><span class="lang-en">Parameters</span><span class="lang-bn hidden">প্যারামিটার</span></div>

        <!-- Pendulum controls -->
        <div id="ctrlPendulum">
          <div class="control-row">
            <label>
              <span class="lang-en">Initial Angle (°)</span>
              <span class="lang-bn hidden">প্রারম্ভিক কোণ (°)</span>
            </label>
            <div class="range-row">
              <input type="range" id="angleSlider" min="-80" max="80" value="30" step="1" oninput="syncP()">
              <span class="range-val" id="angleDisplay">30°</span>
            </div>
          </div>
          <div class="control-row">
            <label>
              <span class="lang-en">Pendulum Length (m)</span>
              <span class="lang-bn hidden">দোলকের দৈর্ঘ্য (m)</span>
            </label>
            <div class="range-row">
              <input type="range" id="lengthSlider" min="80" max="300" value="180" step="5" oninput="syncP()">
              <span class="range-val" id="lengthDisplay">180</span>
            </div>
          </div>
          <div class="control-row">
            <label>
              <span class="lang-en">Damping</span>
              <span class="lang-bn hidden">অবমন্দন</span>
            </label>
            <div class="range-row">
              <input type="range" id="dampingSlider" min="0.98" max="1.00" value="0.995" step="0.001" oninput="syncP()">
              <span class="range-val" id="dampingDisplay">0.995</span>
            </div>
          </div>
        </div>

        <!-- Spring controls -->
        <div id="ctrlSpring" class="hidden">
          <div class="control-row">
            <label>
              <span class="lang-en">Displacement (m)</span>
              <span class="lang-bn hidden">সরণ (m)</span>
            </label>
            <div class="range-row">
              <input type="range" id="dispSlider" min="20" max="180" value="80" step="5" oninput="syncS()">
              <span class="range-val" id="dispDisplay">80</span>
            </div>
          </div>
          <div class="control-row">
            <label>
              <span class="lang-en">Mass (kg)</span>
              <span class="lang-bn hidden">ভর (kg)</span>
            </label>
            <div class="range-row">
              <input type="range" id="massSlider" min="0.5" max="5" value="1" step="0.1" oninput="syncS()">
              <span class="range-val" id="massDisplay">1.0</span>
            </div>
          </div>
          <div class="control-row">
            <label>
              <span class="lang-en">Spring Constant k (N/m)</span>
              <span class="lang-bn hidden">স্প্রিং ধ্রুবক k</span>
            </label>
            <div class="range-row">
              <input type="range" id="stiffSlider" min="1" max="20" value="5" step="0.5" oninput="syncS()">
              <span class="range-val" id="stiffDisplay">5.0</span>
            </div>
          </div>
          <div class="control-row">
            <label>
              <span class="lang-en">Damping</span>
              <span class="lang-bn hidden">অবমন্দন</span>
            </label>
            <div class="range-row">
              <input type="range" id="sdampSlider" min="0.96" max="1.00" value="0.998" step="0.001" oninput="syncS()">
              <span class="range-val" id="sdampDisplay">0.998</span>
            </div>
          </div>
        </div>

        <div class="btn-row">
          <button class="btn btn-sim" onclick="startSim()">
            <span class="lang-en">▶ Simulate</span>
            <span class="lang-bn hidden">▶ সিমুলেট</span>
          </button>
          <button class="btn btn-stop" onclick="pauseSim()">
            <span class="lang-en">⏸ Pause</span>
            <span class="lang-bn hidden">⏸ বিরতি</span>
          </button>
          <button class="btn btn-reset" onclick="resetSim()">
            <span class="lang-en">↺</span><span class="lang-bn hidden">↺</span>
          </button>
        </div>
      </div>

      <!-- Live Stats -->
      <div class="panel">
        <div class="panel-label">
          <span class="lang-en">Live Readout</span>
          <span class="lang-bn hidden">লাইভ তথ্য</span>
        </div>
        <div class="stats-grid">
          <div class="stat-card hi1">
            <div class="stat-label"><span class="lang-en">Period</span><span class="lang-bn hidden">পর্যায়কাল</span></div>
            <div><span class="stat-val" id="statPeriod">—</span><span class="stat-unit">s</span></div>
          </div>
          <div class="stat-card hi2">
            <div class="stat-label"><span class="lang-en">Frequency</span><span class="lang-bn hidden">কম্পাঙ্ক</span></div>
            <div><span class="stat-val" id="statFreq">—</span><span class="stat-unit">Hz</span></div>
          </div>
          <div class="stat-card">
            <div class="stat-label"><span class="lang-en">Displacement</span><span class="lang-bn hidden">সরণ</span></div>
            <div><span class="stat-val" id="statDisp">0.0</span><span class="stat-unit">px</span></div>
          </div>
          <div class="stat-card">
            <div class="stat-label"><span class="lang-en">Velocity</span><span class="lang-bn hidden">বেগ</span></div>
            <div><span class="stat-val" id="statVel">0.0</span><span class="stat-unit">px/s</span></div>
          </div>
        </div>
      </div>
    </div><!-- /left-panel -->

    <!-- CANVAS AREA -->
    <div class="canvas-area">
      <div class="canvas-wrap" id="canvasWrap"></div>
      <div class="graph-row">
        <div class="graph-wrap">
          <div class="graph-label">
            <span class="lang-en">Displacement – Time</span>
            <span class="lang-bn hidden">সরণ – সময়</span>
          </div>
          <canvas id="gDisp" class="graph"></canvas>
        </div>
        <div class="graph-wrap">
          <div class="graph-label">
            <span class="lang-en">Phase Space (x vs v)</span>
            <span class="lang-bn hidden">দশা স্থান (x – v)</span>
          </div>
          <canvas id="gPhase" class="graph"></canvas>
        </div>
      </div>
    </div>

  </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/p5@1.9.0/lib/p5.min.js"></script>
<script>
// ── LANGUAGE ──────────────────────────────────────────────────────────────
let currentLang = 'en';
document.getElementById('languageToggle').addEventListener('click', () => {
  currentLang = currentLang === 'en' ? 'bn' : 'en';
  document.querySelectorAll('.lang-en').forEach(el => el.classList.toggle('hidden', currentLang !== 'en'));
  document.querySelectorAll('.lang-bn').forEach(el => el.classList.toggle('hidden', currentLang !== 'bn'));
  document.body.classList.toggle('bangla', currentLang === 'bn');
});

// ── MODE ──────────────────────────────────────────────────────────────────
let mode = 'pendulum';

function switchMode(m) {
  mode = m;
  document.getElementById('tabPendulum').classList.toggle('active', m === 'pendulum');
  document.getElementById('tabSpring').classList.toggle('active', m === 'spring');
  document.getElementById('defPendulum').classList.toggle('hidden', m !== 'pendulum');
  document.getElementById('defSpring').classList.toggle('hidden', m !== 'spring');
  document.getElementById('ctrlPendulum').classList.toggle('hidden', m !== 'pendulum');
  document.getElementById('ctrlSpring').classList.toggle('hidden', m !== 'spring');
  resetSim();
}

// ── SLIDER SYNC ───────────────────────────────────────────────────────────
function syncP() {
  document.getElementById('angleDisplay').textContent = document.getElementById('angleSlider').value + '°';
  document.getElementById('lengthDisplay').textContent = document.getElementById('lengthSlider').value;
  document.getElementById('dampingDisplay').textContent = parseFloat(document.getElementById('dampingSlider').value).toFixed(3);
}

function syncS() {
  document.getElementById('dispDisplay').textContent = document.getElementById('dispSlider').value;
  document.getElementById('massDisplay').textContent = parseFloat(document.getElementById('massSlider').value).toFixed(1);
  document.getElementById('stiffDisplay').textContent = parseFloat(document.getElementById('stiffSlider').value).toFixed(1);
  document.getElementById('sdampDisplay').textContent = parseFloat(document.getElementById('sdampSlider').value).toFixed(3);
}

// ── SIMULATION STATE ──────────────────────────────────────────────────────
let simRunning = false;
let physTheta = 0, physOmega = 0;
let physX = 0, physV = 0;
let elapsedT = 0;
let dispHistory = [];
let phaseHistory = [];
const MAX_HIST = 400;

function getPeriodPendulum(L) { 
  return 2 * Math.PI * Math.sqrt(L / 980); 
}

function getPeriodSpring(m, k) { 
  return 2 * Math.PI * Math.sqrt(m / k); 
}

function updateStats(disp, vel, period) {
  document.getElementById('statDisp').textContent = disp.toFixed(1);
  document.getElementById('statVel').textContent = vel.toFixed(1);
  document.getElementById('statPeriod').textContent = period > 0 ? period.toFixed(3) : '—';
  document.getElementById('statFreq').textContent = period > 0 ? (1 / period).toFixed(3) : '—';
}

// Global control functions (will be used by buttons)
window.startSim = function() {
  simRunning = true;
  if (typeof sketch !== 'undefined' && sketch) sketch.loop();
};

window.pauseSim = function() {
  simRunning = false;
};

window.resetSim = function() {
  simRunning = false;
  physTheta = physOmega = 0;
  physX = physV = 0;
  elapsedT = 0;
  dispHistory = [];
  phaseHistory = [];
  updateStats(0, 0, 0);
  if (typeof sketch !== 'undefined' && sketch) {
    sketch.noLoop();
    sketch.redraw();
  }
};

// ── P5 SKETCH ─────────────────────────────────────────────────────────────
let sketch;

new p5(function(p) {
  let trailP = [];
  let trailS = [];

  p.setup = function() {
    const wrap = document.getElementById('canvasWrap');
    const cnv = p.createCanvas(wrap.clientWidth, Math.max(280, window.innerHeight * 0.44));
    cnv.parent('canvasWrap');
    p.noLoop();
  };

  // Update physics + draw
  function drawPendulum() {
    const L = parseFloat(document.getElementById('lengthSlider').value);
    const damp = parseFloat(document.getElementById('dampingSlider').value);
    const g = 980;
    const dt = 1/60;

    if (simRunning) {
      const alpha = -(g / L) * Math.sin(physTheta);
      physOmega += alpha * dt;
      physOmega *= damp;
      physTheta += physOmega * dt;
      elapsedT += dt;
    }

    const originX = p.width / 2;
    const originY = p.height * 0.18;
    const bobX = originX + L * Math.sin(physTheta);
    const bobY = originY + L * Math.cos(physTheta);

    // ... (keep your beautiful drawing code here - I removed it for brevity)

    // Record data for graphs
    if (simRunning) {
      const disp = physTheta * L;
      const vel = physOmega * L;
      dispHistory.push({ t: elapsedT, x: disp });
      phaseHistory.push({ x: disp, v: vel });
      if (dispHistory.length > MAX_HIST) dispHistory.shift();
      if (phaseHistory.length > MAX_HIST) phaseHistory.shift();
    }

    const T = getPeriodPendulum(L);
    updateStats(physTheta * L, physOmega * L, T);
  }

  function drawSpring() {
    // ... your spring drawing code
    // (same logic)

    if (simRunning) {
      const mass = parseFloat(document.getElementById('massSlider').value);
      const k = parseFloat(document.getElementById('stiffSlider').value);
      const damp = parseFloat(document.getElementById('sdampSlider').value);
      const dt = 1/60;

      const F = -k * (physX / 100);
      const a = F / mass;
      physV += a * dt * 100;
      physV *= damp;
      physX += physV * dt;
      elapsedT += dt;

      dispHistory.push({ t: elapsedT, x: physX });
      phaseHistory.push({ x: physX, v: physV });
      if (dispHistory.length > MAX_HIST) dispHistory.shift();
      if (phaseHistory.length > MAX_HIST) phaseHistory.shift();
    }

    const T = getPeriodSpring(
      parseFloat(document.getElementById('massSlider').value),
      parseFloat(document.getElementById('stiffSlider').value)
    );
    updateStats(physX, physV, T);
  }

  p.draw = function() {
    if (mode === 'pendulum') drawPendulum();
    else drawSpring();
  };

  p.windowResized = function() {
    const wrap = document.getElementById('canvasWrap');
    p.resizeCanvas(wrap.clientWidth, Math.max(280, window.innerHeight * 0.44));
  };

}, 'canvasWrap');
</script>
</body>
</html>
