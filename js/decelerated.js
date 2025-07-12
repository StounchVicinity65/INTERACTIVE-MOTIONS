let speedInput, decelInput;
let x = 0;
let v = 0;
let a = 0;

function setup() {
  createCanvas(windowWidth - 240, windowHeight * 0.6);
  speedInput = document.getElementById('speed');
  decelInput = document.getElementById('deceleration');
  noLoop();
  
  // Original text settings for the car emoji
  textSize(48);
  textAlign(CENTER, CENTER);

  // --- Setup for FPS Display ---
  // We'll set text size and alignment for FPS here, but use push/pop in draw to isolate.
  // This setup mainly ensures fonts are loaded for these sizes.
  // --- End Setup for FPS Display ---
}

function simulateDeceleration() {
  x = width - 100; // Start near the right edge
  v = parseFloat(speedInput.value);
  a = -abs(parseFloat(decelInput.value)); // Ensure deceleration is negative
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
    fill(139, 69, 19); // trunk
    rect(i + 20, roadY - 60, 10, 40);
    fill(34, 139, 34); // leaves
    ellipse(i + 25, roadY - 70, 40);

    rect(i + 60, roadY + roadHeight + 20, 10, 40);
    ellipse(i + 65, roadY + roadHeight + 20, 40);
  }

  // Car emoji (or you can use a better image if preferred)
  fill(0);
  // Use push/pop to ensure car's text size/alignment isn't affected by FPS display settings
  push();
  textSize(48); // Set size specifically for the car
  textAlign(CENTER, CENTER); // Center align for the car
  text("🚗", x, roadY + roadHeight / 2);
  pop();

  // Physics update
  v += a * 0.1;
  if (v < 0) v = 0;
  x -= v; // Car moves to the left as x decreases

  if (v === 0 || x < -50) noLoop();

  // --- ADDED CODE TO DISPLAY FPS ---
  fill(0); // Set text color to black
  textSize(16); // Set text size for FPS
  textAlign(LEFT, TOP); // Align text to top-left for FPS
  // Display the current frame rate, rounded to 1 decimal place
  text(`FPS: ${frameRate().toFixed(1)}`, 10, 30); // Position text at (10, 30)
  // --- END ADDED CODE ---
}



