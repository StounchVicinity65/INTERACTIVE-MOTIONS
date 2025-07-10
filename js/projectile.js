let angleInput, lengthInput;
let angle = 0, aVel = 0, aAcc = 0;
let origin, bob;
let len = 200;
let g = 0.4;

function setup() {
  createCanvas(windowWidth - 240, windowHeight);
  angleInput = document.getElementById('angle');
  lengthInput = document.getElementById('length');
  origin = createVector(width / 2, 0);
  noLoop();
}

function simulateSHM() {
  len = float(lengthInput.value);
  angle = radians(float(angleInput.value));
  aVel = 0;
  loop();
}

function draw() {
  background('#15273C');

  // Physics
  aAcc = (-g / len) * sin(angle);
  aVel += aAcc;
  aVel *= 0.99; // damping
  angle += aVel;

  // Position of bob
  bob = createVector(
    origin.x + len * sin(angle),
    origin.y + len * cos(angle)
  );

  // Draw string
  stroke(255);
  strokeWeight(2);
  line(origin.x, origin.y, bob.x, bob.y);

  // Draw bob
  fill(255, 100, 100);
  noStroke();
  ellipse(bob.x, bob.y, 50);
}


