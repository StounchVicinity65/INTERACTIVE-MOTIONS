let angleInput;
let theta = 0;        // current angle (radians)
let omega = 0;        // angular velocity
let alpha = 0;        // angular acceleration
const g = 9.8;        // gravity
const L = 200;        // length of pendulum arm (pixels)
const damping = 0.995;

function setup() {
  createCanvas(windowWidth - 240, windowHeight);
  angleInput = document.getElementById('angle');
  noLoop();
}

function simulateSHM() {
  // Convert degrees to radians for initial angle
  theta = radians(parseFloat(angleInput.value));
  omega = 0;
  loop();
}

function draw() {
  background(255);

  // Pendulum physics (small angle approx)
  alpha = -(g / L) * theta;
  omega += alpha;
  omega *= damping; // some damping
  theta += omega;

  // Origin point (fixed)
  let originX = width / 2;
  let originY = height / 4;

  // Position of the ball
  let ballX = originX + L * sin(theta);
  let ballY = originY + L * cos(theta);

  // Draw string
  stroke(0);
  strokeWeight(2);
  line(originX, originY, ballX, ballY);

  // Draw bob
  noStroke();
  fill(255, 100, 100);
  ellipse(ballX, ballY, 50);
}
