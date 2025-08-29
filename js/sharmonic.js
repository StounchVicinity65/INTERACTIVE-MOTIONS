let theta = 0;      // current angle (radians)
let omega = 0;      // angular velocity
let alpha = 0;      // angular acceleration
const g = 9.8;      // gravity
const L = 200;      // pendulum length (pixels)
const damping = 0.995;

function setup() {
  createCanvas(windowWidth - 240, windowHeight * 0.6);
  noLoop();
  textSize(16);
  textAlign(LEFT, TOP);
}

function simulateSHM() {
  const angleInput = document.getElementById('angle');
  let angleDeg = parseFloat(angleInput.value);

  const max = parseFloat(angleInput.max);
  const min = parseFloat(angleInput.min);

  if (isNaN(angleDeg)) angleDeg = 0;

  if (angleDeg > max) { angleDeg = max; alert(`⚠️ Maximum angle is ${max}°`); }
  if (angleDeg < min) { angleDeg = min; alert(`⚠️ Minimum angle is ${min}°`); }

  angleInput.value = angleDeg;

  theta = radians(angleDeg);
  omega = 0;
  loop();
}

function draw() {
  background('#dbeafe');

  alpha = -(g / L) * theta;
  omega += alpha;
  omega *= damping;
  theta += omega;

  let originX = width / 2;
  let originY = 40;

  let bobX = originX + L * sin(theta);
  let bobY = originY + L * cos(theta);

  stroke(0);
  strokeWeight(2);
  line(originX, originY, bobX, bobY);

  noStroke();
  fill(255, 100, 100);
  ellipse(bobX, bobY, 40);

  push();
  fill(0);
  textSize(16);
  textAlign(LEFT, TOP);
  text(`FPS: ${frameRate().toFixed(1)}`, 10, 30);
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth - 240, windowHeight * 0.6);
}





