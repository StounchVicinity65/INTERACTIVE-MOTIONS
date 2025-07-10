let speedInput, posX = 0, speed = 3;

function setup() {
  createCanvas(windowWidth - 240, windowHeight);
  speedInput = document.getElementById('speed');
  noLoop();
}

function simulateLinear() {
  speed = float(speedInput.value);
  posX = 0;
  loop();
}

function draw() {
  background(240);
  fill(0, 200, 150);
  ellipse(posX, height / 2, 40);
  posX += speed;
  if (posX > width) posX = 0;
}
