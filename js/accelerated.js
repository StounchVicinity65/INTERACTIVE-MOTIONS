let accelInput;
let x = 0;
let v = 0;
let a = -2; // default to move left

function setup() {
  createCanvas(windowWidth - 240, windowHeight);
  accelInput = document.getElementById('acceleration');
  noLoop();
  textSize(48);
  textAlign(CENTER, CENTER);
}

function simulateAcceleration() {
  x = width - 100;  // Start near right edge
  v = 0;
  a = -abs(parseFloat(accelInput.value)); // Ensure it's negative to move left
  loop();
}

function draw() {
  background(135, 206, 235); // Sky blue

  // Grass top and bottom
  fill(60, 179, 113);
  rect(0, 0, width, height * 0.3);
  rect(0, height * 0.7, width, height * 0.3);

  // Road
  let roadY = height * 0.5;
  let roadHeight = 100;
  fill(50);
  rect(0, roadY, width, roadHeight);

  // Lane stripes
  stroke(255);
  strokeWeight(4);
  for (let i = 0; i < width; i += 40) {
    line(i, roadY + roadHeight / 2, i + 20, roadY + roadHeight / 2);
  }
  noStroke();

  // Trees (left and right sides)
  let spacing = 120;
  for (let i = 0; i < width; i += spacing) {
    // Left side tree
    fill(139, 69, 19);
    rect(i + 20, roadY - 60, 10, 40);
    fill(34, 139, 34);
    ellipse(i + 25, roadY - 70, 40);

    // Right side tree
    fill(139, 69, 19);
    rect(i + 60, roadY + roadHeight + 20, 10, 40);
    fill(34, 139, 34);
    ellipse(i + 65, roadY + roadHeight + 20, 40);
  }

  // Car (🚗)
  fill(0);
  text("🚗", x, roadY + roadHeight / 2);

  // Physics update
  v += a * 0.1;
  x += v;

  // Stop if off screen
  if (x < -50) noLoop();
}
