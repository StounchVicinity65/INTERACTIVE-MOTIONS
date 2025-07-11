let positionInput, velocityInput;
let x = 0;
let v = 0;
let running = false;

function setup() {
  createCanvas(windowWidth - 240, windowHeight * 0.6);
  positionInput = document.getElementById('position');
  velocityInput = document.getElementById('velocity');
  noLoop();
}

function startTranslation() {
  x = parseFloat(positionInput.value);
  v = parseFloat(velocityInput.value);
  running = true;
  loop();
}

function stopTranslation() {
  running = false;
  noLoop();
}

function draw() {
  background('#dbeafe');

  if (!running) return;

  // Draw ground line
  stroke(100);
  strokeWeight(2);
  line(0, height / 2 + 50, width, height / 2 + 50);

  // Draw moving object (circle)
  fill(255, 100, 100);
  noStroke();
  ellipse(x, height / 2 + 50, 40);

  // Update position
  x += v;

  // Bounce back if hitting edges
  if (x > width - 20 || x < 20) {
    v = -v;
  }
}

