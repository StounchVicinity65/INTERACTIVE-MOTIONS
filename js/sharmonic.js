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
  background(240);
  a = -(k / m) * x;
  v += a;
  x += v;

  fill(255, 100, 100);
  ellipse(width / 2 + x, height / 2, 50);
}
