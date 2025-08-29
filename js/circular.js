let radius = 100; // Default radius in pixels
let angle = 0;
let speedInput;
let radiusInput;
let angularSpeed = 0.05;
let centerX, centerY;

function setup() {
  createCanvas(windowWidth - 240, windowHeight * 0.6);
  angleMode(RADIANS);
  speedInput = document.getElementById('speed');
  radiusInput = document.getElementById('radius');
  centerX = width / 2;
  centerY = height / 2;
  noLoop();
  textSize(16);
  textAlign(LEFT, TOP);
  console.log('Setup complete: canvas initialized');
}

function simulateCircular() {
  const speedVal = parseFloat(speedInput.value);
  const rMeters = parseFloat(radiusInput.value);
  
  // Validate inputs with defaults
  angularSpeed = isNaN(speedVal) || speedVal <= 0 ? 0.05 : Math.min(speedVal, 45);
  radius = isNaN(rMeters) || rMeters <= 0 ? 100 : Math.min(rMeters * 100, 2.8 * 100);
  
  angle = 0;
  loop();
  console.log(`Simulation started: angularSpeed=${angularSpeed}, radius=${radius}`);
}

function resetSimulation() {
  const speedVal = parseFloat(speedInput.value);
  const rMeters = parseFloat(radiusInput.value);
  
  // Validate inputs with defaults
  angularSpeed = isNaN(speedVal) || speedVal <= 0 ? 0.05 : Math.min(speedVal, 45);
  radius = isNaN(rMeters) || rMeters <= 0 ? 100 : Math.min(rMeters * 100, 2.8 * 100);
  
  angle = 0;
  noLoop();
  console.log('Simulation reset');
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
  push();
  fill(0);
  textSize(16);
  textAlign(LEFT, TOP);
  text(`FPS: ${frameRate().toFixed(1)}`, 10, 30);
  pop();
}

