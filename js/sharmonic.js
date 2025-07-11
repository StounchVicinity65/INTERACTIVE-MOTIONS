let angleInput;
let theta = 0;        // current angle (radians)
let omega = 0;        // angular velocity
let alpha = 0;        // angular acceleration
const g = 9.8;        // gravity
const L = 200;        // pendulum length (pixels)
const damping = 0.995;

function setup() {
  createCanvas(windowWidth - 240, windowHeight * 0.6); // consistent height
  angleInput = document.getElementById('angle');
  noLoop();
}

function simulateSHM() {
  theta = radians(parseFloat(angleInput.value));
  omega = 0;
  loop();
}

function draw() {
  background('#dbeafe');  // Soft blue background

  // SHM physics
  alpha = -(g / L) * theta;
  omega += alpha;
  omega *= damping;
  theta += omega;

  // Origin
  let originX = width / 2;
  let originY = 60;

  // Pendulum bob position
  let bobX = originX + L * sin(theta);
  let bobY = originY + L * cos(theta);

  // Draw pendulum string
  stroke(0);
  strokeWeight(2);
  line(originX, originY, bobX, bobY);

  // Draw pendulum bob
  noStroke();
  fill(255, 100, 100);
  ellipse(bobX, bobY, 40);
}


