let accelInput;
let x, v, a;

function setup() {
  createCanvas(windowWidth - 240, windowHeight);
  accelInput = document.getElementById('acceleration');
  noLoop();
  textSize(48);
  textAlign(CENTER, CENTER);
}

function simulateAcceleration() {
  a = -abs(parseFloat(accelInput.value));  // Negative to move left
  x = width - 50;  // Start near right edge
  v = 0;
  loop();
}

function draw() {
  background(240);
  fill(255, 0, 100);
  
  text("🚗", x, height / 2);

  v += a * 0.1;
  x += v;

  // Stop animation if car goes off screen left
  if (x < -50) {
    noLoop();
  }
}
