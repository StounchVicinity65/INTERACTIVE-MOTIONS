let radiusInput, speedInput;
let angle = 0, radius = 100, speed = 5;

function setup() {
  createCanvas(windowWidth - 240, windowHeight);
  radiusInput = document.getElementById('radius');
  speedInput = document.getElementById('speed');
  noLoop();
}

function simulateCircular() {
  radius = float(radiusInput.value);
  speed = float(speedInput.value);
  angle = 0;
  loop();
}

function draw() {
  background(240);
  let x = width / 2 + radius * cos(angle);
  let y = height / 2 + radius * sin(angle);
  fill(255, 200, 0);
  ellipse(x, y, 40);
  angle += speed * 0.01;
}
