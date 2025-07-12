let speedInput;
let posX = 0;
let speed = 3;

function setup() {
  // createCanvas(windowWidth - 240, windowHeight * 0.6); // Original line
  // Let's set a fixed canvas width for easier calculations later,
  // consistent with your 1796px measured width for the "44.5cm"
  // If your main index.html provides a consistent width, use that.
  // For now, let's assume a width for testing this specific file
  // and make it visible on your monitor:
  createCanvas(1800, windowHeight * 0.6); // Using ~1800px based on 44.5cm observation
  // OR, if you use windowWidth - 240, it will likely be 1920-240 = 1680px on your screen
  // Let's assume (windowWidth - 240) = 1920 - 240 = 1680px for your screen size
  // So, createCanvas(1680, windowHeight * 0.6); is what it actually is likely
  // If your canvas is precisely 44.5cm on your screen, that's ~1796px.
  // The (windowWidth - 240) is probably the most accurate width your code creates.

  speedInput = document.getElementById('speed'); // Assuming you have an HTML input with id="speed"
  noLoop(); // Stop the draw loop initially
}

function simulateLinear() {
  const val = parseFloat(speedInput.value);
  if (!isNaN(val) && val >= 0) {
    speed = val;
    posX = 0;
    loop(); // Start the draw loop when simulation begins
  } else {
    alert("Please enter a valid non-negative speed.");
  }
}

function draw() {
  background('#dbeafe'); // Light blue background

  // Draw environment
  stroke(180); // Gray stroke
  strokeWeight(2);
  line(0, height / 2 + 25, width, height / 2 + 25); // Ground line

  noStroke();
  fill(0, 200, 150); // Greenish fill for the ball
  ellipse(posX, height / 2, 40); // Draw the ball

  // --- Core Simulation Logic ---
  posX += speed; // Move the ball
  if (posX > width + 20) { // If ball goes off right, reset to left
    posX = -20;
  }

  // --- ADD THIS CODE TO DISPLAY FPS ---
  fill(0); // Set text color to black
  textSize(16); // Set text size
  // Display the current frame rate, rounded to 1 decimal place
  text(`FPS: ${frameRate().toFixed(1)}`, 10, 30); // Position text at (10, 30)
}

// Ensure window is resized correctly for responsive canvas
function windowResized() {
  resizeCanvas(windowWidth - 240, windowHeight * 0.6);
}

