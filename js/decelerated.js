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
  x = width - 100; // Start on the right
  v = parseFloat(speedInput.value);
  a = -abs(parseFloat(decelInput.value)); // Deceleration is negative
  loop();
}

function draw() {
  // Sky and road background
  background('#15273C');
  fill(60);
  rect(0, height * 0.65, width, height * 0.35); // Road
  stroke(255);
  strokeWeight(2);
  line(0, height * 0.825, width, height * 0.825); // Lane

  // Draw turtle
  noStroke();
  fill(255);
  text("🐢", x, height * 0.65 - 25); // Turtle above the road

  v += a * 0.1;
  if (v < 0) v = 0;

  x -= v; // Move right to left

  if (v === 0 || x < -50) {
    noLoop(); // Stop when velocity is zero or off-screen
  }
}

