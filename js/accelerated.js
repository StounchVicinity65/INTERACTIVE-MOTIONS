let accelInput;
let x = 0;
let v = 0;
let a = 2;

function setup() {
  createCanvas(windowWidth - 240, windowHeight * 0.6);
  accelInput = document.getElementById('acceleration');
  noLoop();
  textSize(48); // Original text size for the car/main elements
  textAlign(CENTER, CENTER); // Original text alignment for the car/main elements
}

function simulateAcceleration() {
  x = width - 50; // Start from right edge
  v = 0;
  a = -abs(parseFloat(accelInput.value)); // Ensure it's negative to move leftward
  loop();
}

function draw() {
  background(135, 206, 235); // Sky blue

  // Grass
  fill(60, 179, 113);
  rect(0, 0, width, height * 0.2);
  rect(0, height * 0.8, width, height * 0.2);

  // Road
  let roadY = height * 0.5;
  let roadHeight = 100;
  fill(50);
  rect(0, roadY, width, roadHeight);

  // Lane markings
  stroke(255);
  strokeWeight(4);
  for (let i = 0; i < width; i += 40) {
    line(i, roadY + roadHeight / 2, i + 20, roadY + roadHeight / 2);
  }
  noStroke();

  // Trees
  let spacing = 120;
  for (let i = 0; i < width; i += spacing) {
    // Top
    fill(139, 69, 19);
    rect(i + 20, roadY - 60, 10, 40);
    fill(34, 139, 34);
    ellipse(i + 25, roadY - 70, 40);

    // Bottom
    fill(139, 69, 19);
    rect(i + 60, roadY + roadHeight + 20, 10, 40);
    fill(34, 139, 34);
    ellipse(i + 65, roadY + roadHeight + 20, 40);
  }

  // Car
  fill(0);
  // Use push/pop to ensure car's text size/alignment isn't affected by FPS display settings
  push();
  textSize(48);
  textAlign(CENTER, CENTER);
  text("🚗", x, roadY + roadHeight / 2);
  pop();


  // Physics update
  v += a * 0.1;
  x += v;

  // Stop when out of screen on left
  if (x < -50) noLoop();

  // --- ADDED CODE TO DISPLAY FPS ---
  fill(0); // Set text color to black
  textSize(16); // Set text size for FPS
  textAlign(LEFT, TOP); // Align text to top-left for FPS
  // Display the current frame rate, rounded to 1 decimal place
  text(`FPS: ${frameRate().toFixed(1)}`, 10, 30); // Position text at (10, 30)
  // --- END ADDED CODE ---
}


