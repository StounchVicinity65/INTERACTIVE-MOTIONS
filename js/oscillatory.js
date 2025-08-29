let amplitudeInput, freqInput;
let A = 50;
let f = 0.5;
let t = 0;
let baseY;
let running = false;

function setup() {
  createCanvas(windowWidth - 240, windowHeight * 0.6);
  amplitudeInput = document.getElementById('amplitude');
  freqInput = document.getElementById('frequency');
  baseY = height / 2;
  noLoop();

  textAlign(CENTER, CENTER);
  textSize(36);
}

function simulateOscillation() {
  A = parseFloat(amplitudeInput.value);
  f = parseFloat(freqInput.value);
  t = 0;
  running = true;
  loop();
}

function draw() {
  background('#dbeafe');

  // Draw equilibrium line
  stroke(0);
  strokeWeight(2);
  line(0, baseY, width, baseY);

  // Oscillation motion
  if (running) t += 0.05;
  let y = baseY + A * sin(TWO_PI * f * t);

  // Draw oscillating circle
  noStroke();
  fill(255, 100, 100);
  ellipse(width / 2, y, 60, 60);

  // Auto-stop safeguard
  if (t > 60) noLoop();

  // FPS display
  fill(0);
  textSize(16);
  textAlign(LEFT, TOP);
  text(`FPS: ${frameRate().toFixed(1)}`, 10, 30);
}

// Make canvas responsive
function windowResized() {
  resizeCanvas(windowWidth - 240, windowHeight * 0.6);
  baseY = height / 2;
}

