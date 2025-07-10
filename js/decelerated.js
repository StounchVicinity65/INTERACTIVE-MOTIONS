let speedInput, decelInput;
let x = 0;
let v = 0;
let a = 0;

function setup() {
  createCanvas(windowWidth - 240, windowHeight);
  speedInput = document.getElementById('speed');
  decelInput = document.getElementById('deceleration');
  noLoop();
  textSize(48);
  textAlign(CENTER, CENTER);
}

function simulateDeceleration() {
  x = 100; // Start on the left
  v = parseFloat(speedInput.value);
  a = -abs(parseFloat(decelInput.value)); // Deceleration is negative
  loop();
}

function draw() {
  background(240);

  fill(0);
  text("🐢", x, height / 2); // Turtle emoji to suggest slowing down

  v += a * 0.1;
  if (v < 0) v = 0; // Don't allow it to reverse direction

  x += v;

  if (v === 0 || x > width + 50) {
    noLoop(); // Stop if motion ends or goes off-screen
  }
}
