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

  // Original text settings for the oscillating circle (if it were text)
  textAlign(CENTER, CENTER);
  textSize(36); // This is likely for the circle, not the FPS

  // --- Setup for FPS Display ---
  // We'll set text size and alignment for FPS within draw using push/pop for isolation.
  // This setup primarily ensures any fonts are loaded if text sizes vary greatly.
  // --- End Setup for FPS Display ---
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
  ellipse(width / 2, y, 60, 60); // No text used here, so push/pop less critical but still good for consistency

  // Stop after a long duration if needed
  if (t > 60) noLoop();

  // --- ADDED CODE TO DISPLAY FPS ---
  fill(0); // Set text color to black
  textSize(16); // Set text size for FPS
  textAlign(LEFT, TOP); // Align text to top-left for FPS
  // Display the current frame rate, rounded to 1 decimal place
  text(`FPS: ${frameRate().toFixed(1)}`, 10, 30); // Position text at (10, 30)
  // --- END ADDED CODE ---
}
