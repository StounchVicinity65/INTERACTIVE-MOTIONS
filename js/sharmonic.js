let kInput, massInput;
let x = 0, v = 0, a = 0, k = 0.5, m = 2;

function setup() {
  createCanvas(windowWidth - 240, windowHeight);
  kInput = document.getElementById('k');
  massInput = document.getElementById('mass');
  noLoop();
}

function simulateSHM() {
  k = float(kInput.value);
  m = float(massInput.value);
  x = 100;
  v = 0;
  loop();
}

function draw() {
  background('#15273C');

  // Physics
  a = -(k / m) * x;
  v += a;
  v *= 0.99; // Damping
  x += v;

  // Anchor point (left fixed)
  let baseX = width / 2 - 150;
  let ballX = baseX + x;

  // Draw "string"
  stroke(255);
  strokeWeight(3);
  line(baseX, height / 2, ballX, height / 2);

  // Draw mass (ball)
  noStroke();
  fill(255, 100, 100);
  ellipse(ballX, height / 2, 50);
}

