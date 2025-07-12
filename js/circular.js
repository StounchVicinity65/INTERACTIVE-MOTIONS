let radius = 100;
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

  // --- Setup for FPS Display ---
  textSize(16); // Set text size for FPS display
  textAlign(LEFT, TOP); // Align text to top-left for FPS display
  // --- End Setup for FPS Display ---
}

function simulateCircular() {
  angularSpeed = parseFloat(speedInput.value);
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

  // Calculate position on path
  let x = centerX + radius * cos(angle);
  let y = centerY + radius * sin(angle);

  // Draw moving object
  fill(255, 100, 100);
  noStroke();
  ellipse(x, y, 30);

  // Update angle
  angle += angularSpeed;
  if (angle > TWO_PI) angle -= TWO_PI;

  // --- ADDED CODE TO DISPLAY FPS ---
  fill(0); // Set text color to black
  textSize(16); // Set text size for FPS display (already set in setup, but good practice if draw is called directly or settings change)
  textAlign(LEFT, TOP); // Align text to top-left for FPS display (already set in setup)
  // Display the current frame rate, rounded to 1 decimal place
  text(`FPS: ${frameRate().toFixed(1)}`, 10, 30); // Position text at (10, 30)
  // --- END ADDED CODE ---
}
