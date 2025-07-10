let accelInput;
let x, v, a;

function setup() {
  createCanvas(windowWidth - 240, windowHeight);
  accelInput = document.getElementById('acceleration');
  noLoop();
  textSize(48);
  textAlign(CENTER, CENTER);
}

function simulateAcceleration() {
  a = -abs(parseFloat(accelInput.value));  // Negative to move left
  x = width - 50;  // Start near right edge
  v = 0;
  loop();
}

function draw() {
  // Sky (background)
  background(135, 206, 235);  // light blue sky

  // Grass (top and bottom)
  fill(60, 179, 113); // medium sea green
  rect(0, 0, width, height * 0.3);
  rect(0, height * 0.7, width, height * 0.3);

  // Road
  fill(50);
  let roadY = height * 0.5;
  let roadHeight = 100;
  rect(0, roadY, width, roadHeight);

  // Lane lines (dashed)
  stroke(255);
  strokeWeight(4);
  let dashWidth = 30;
  let gapWidth = 20;
  let yLine = roadY + roadHeight / 2;
  for (let i = 0; i < width; i += dashWidth + gapWidth) {
    line(i, yLine, i + dashWidth, yLine);
  }
  noStroke();

  // Trees (simple circles + rectangles) on both sides
  let treeSpacing = 150;
  for (let i = 0; i < width; i += treeSpacing) {
    // Left side tree
    fill(139, 69, 19); // brown trunk
    rect(i + 20, roadY - 40, 10, 40);
    fill(34, 139, 34); // green leaves
    ellipse(i + 25, roadY - 60, 40, 50);

    // Right side tree
    fill(139, 69, 19);
    rect(i + 50, roadY + roadHeight, 10, 40);
    fill(34, 139, 34);
    ellipse(i + 55, roadY + roadHeight + 20, 40, 50);
  }

  // Draw the car emoji
  fill(255, 0, 100);
  text("🚗", x, roadY + roadHeight / 2);

  // Update position and velocity
  v += a * 0.1;
  x += v;

  // Stop animation if car goes off screen left
  if (x < -50) {
    noLoop();
  }
}
