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

  // Oscillation
  if (running) t += 0.05;
  let y = baseY + A * sin(TWO_PI * f * t);

  // Draw object (oscillating circle)
  noStroke();
  fill(255, 100, 100);
  ellipse(width / 2, y, 60, 60);

  // Stop after a long duration if needed
  if (t > 60) noLoop();
}

