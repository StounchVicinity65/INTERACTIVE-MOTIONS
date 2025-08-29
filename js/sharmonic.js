let angleInput;
let theta = 0;      // current angle (radians)
let omega = 0;      // angular velocity
let alpha = 0;      // angular acceleration
const g = 9.8;      // gravity
const L = 200;      // pendulum length (pixels)
const damping = 0.995;

function setup() {
  createCanvas(windowWidth - 240, windowHeight * 0.6);
  angleInput = document.getElementById('angle');
  noLoop();
}

function simulateSHM() {
  let angleDeg = parseFloat(angleInput.value);

  // Check input range
  if (angleDeg > 90 || angleDeg < -90) {
    alert("⚠️ Maximum allowed angle is ±90°.");
    angleDeg = Math.max(-90, Math.min(90, angleDeg));
    angleInput.value = angleDeg;
  }

  theta = radians(angleDeg);
  omega = 0;
  loop();
}

function draw() {
  background('#dbeafe');

  // SHM physics
  alpha = -(g / L) * theta;
  omega += alpha;
  omega *= damping;
  theta += omega;

  // Origin (lowered a bit so bob doesn’t clip)
  let originX = width / 2;
  let originY = 40;

  // Pendulum bob position
  let bobX = originX + L * sin(theta);
  let bobY = originY + L * cos(theta);

  // Draw pendulum
  stroke(0);
  strokeWeight(2);
  line(originX, originY, bobX, bobY);

  noStroke();
  fill(255, 100, 100);
  ellipse(bobX, bobY, 40);

  // FPS Display
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


