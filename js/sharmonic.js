let kInput, massInput;
let x = 0, v = 0, a = 0, k = 0.5, m = 2;

function setup() {
  createCanvas(windowWidth - 240, windowHeight);
  kInput = document.getElementById('k');
  massInput = document.getElementById('mass');
  noLoop();
}

function simulateSHM() {
  k = parseFloat(kInput.value);
  m = parseFloat(massInput.value);
  x = 100;
  v = 0;
  loop();
}

function draw() {
  background('#15273C');

  // SHM calculation
  a = -(k / m) * x;
  v += a;
  v *= 0.99;
  x += v;

  const anchorX = width / 2;
  const anchorY = 100;
  const stringLength = 200;

  const ballX = anchorX + x;
  const ballY = anchorY + stringLength;

  // Draw fixed vertical string
  stroke(255);
  strokeWeight(3);
  line(anchorX, anchorY, anchorX, anchorY + stringLength);

  // Draw ball (moves horizontally only)
  noStroke();
  fill(255, 100, 100);
  ellipse(ballX, ballY, 50);
}
