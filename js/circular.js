let radius = 100; // Default radius in pixels
let angle = 0;
let speedInput;
let angularSpeed = 0.05;
let centerX, centerY;

function setup() {
  createCanvas(windowWidth - 240, windowHeight * 0.6);
  angleMode(RADIANS);
  speedInput = document.getElementById('speed');
  centerX = width / 2;
  centerY = height / 2;
  noLoop();

  // FPS display setup
  textSize(16);
  textAlign(LEFT, TOP);
}

function simulateCircular() {
  angularSpeed = parseFloat(speedInput.value);

  // Get radius from input (in meters), convert to pixels (1m = 100px)
  const rMeters = parseFloat(document.getElementById('radius').value);
  radius = isNaN(rMeters) ? 1 * 100 : rMeters * 100;

  angle = 0;
  loop();
}

function draw() {
  background('#dbeafe');

  // Draw circular path
  noFill();
  stroke(120);
  strokeWeight(2);
  ellipse(centerX, centerY, radius * 2);

  // Calculate position
  let x = centerX + radius * cos(angle);
  let y = centerY + radius * sin(angle);

  // Draw moving object
  fill(255, 100, 100);
  noStroke();
  ellipse(x, y, 30);

  // Update angle
  angle += angularSpeed;
  if (angle > TWO_PI) angle -= TWO_PI;

  // Display FPS
  fill(0);
  text(`FPS: ${frameRate().toFixed(1)}`, 10, 30);
}

