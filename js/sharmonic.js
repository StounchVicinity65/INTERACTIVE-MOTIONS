let kInput, massInput;
let x = 0, v = 0, a = 0, k = 0.5, m = 2;
let baseX, ballX;

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

  // Physics update
  a = -(k / m) * x;
  v += a;
  v *= 0.99; // damping
  x += v;

  baseX = width / 2 - 150;
  ballX = baseX + x;

  // Draw string
  stroke(0); // black string
  strokeWeight(3);
  line(baseX, height / 2, ballX, height / 2);

  // Draw ball
  noStroke();
  fill(255, 100, 100); // red-ish
  ellipse(ballX, height / 2, 50);
}
