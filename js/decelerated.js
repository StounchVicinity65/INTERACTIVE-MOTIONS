let accelInput, x = 0, v = 0, a = 2;

function setup() {
  createCanvas(windowWidth - 240, windowHeight);
  accelInput = document.getElementById('acceleration');
  noLoop();
}

function simulateAcceleration() {
  a = float(accelInput.value);
  x = 0;
  v = 0;
  loop();
}

function draw() {
  background(240);
  fill(255, 0, 100);
  ellipse(x, height / 2, 40);
  v += a * 0.1;
  x += v;
}
