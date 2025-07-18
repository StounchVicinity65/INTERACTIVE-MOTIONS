let displacementInput, angleInput;
let particles = [];
let displacement = 300;
let angle = 0;
let speed = 2; // pixels per frame
let startPositions = [];

function setup() {
  createCanvas(windowWidth - 240, windowHeight * 0.6);
  displacementInput = document.getElementById('displacement');
  angleInput = document.getElementById('angle');
  noLoop();

  // Initialize 5 particles spaced horizontally
  for (let i = 0; i < 5; i++) {
    particles.push(createVector(100 + i * 60, height / 2));
  }
  startPositions = particles.map(p => p.copy());

  // --- Setup for FPS Display ---
  textSize(16); // Set text size for FPS display
  textAlign(LEFT, TOP); // Align text to top-left for FPS display
  // --- End Setup for FPS Display ---
}

function startTranslation() {
  displacement = parseFloat(displacementInput.value);
  angle = radians(parseFloat(angleInput.value));
  startPositions = particles.map(p => p.copy());
  loop();
}

function stopTranslation() {
  noLoop();
}

function draw() {
  background('#dbeafe');

  // Movement vector components
  let dx = speed * cos(angle);
  let dy = speed * sin(angle);

  // For each particle, move along vector until displaced fully
  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    let start = startPositions[i];

    // Calculate distance travelled from start
    let distTravelled = p5.Vector.dist(p, start);

    // Move if displacement not reached
    if (distTravelled < displacement) {
      p.x += dx;
      p.y += dy;
    }

    // Draw arrowhead at particle position, always facing right (no rotation)
    push();
    translate(p.x, p.y);
    drawArrowhead();
    pop();
  }

  // Stop animation when all particles reached displacement
  let allDone = particles.every((p, i) => p5.Vector.dist(p, startPositions[i]) >= displacement);
  if (allDone) {
    noLoop();
  }

  // --- ADDED CODE TO DISPLAY FPS ---
  push(); // Save current drawing style before changing for FPS
  fill(0); // Set text color to black
  textSize(16); // Set text size for FPS
  textAlign(LEFT, TOP); // Align text to top-left for FPS
  noStroke(); // Ensure no stroke for the text
  // Display the current frame rate, rounded to 1 decimal place
  text(`FPS: ${frameRate().toFixed(1)}`, 10, 30); // Position text at (10, 30)
  pop(); // Restore previous drawing style
  // --- END ADDED CODE ---
}

// Draw black arrowhead pointing right along x-axis (before rotation)
function drawArrowhead() {
  noStroke();
  fill(0);
  beginShape();
  vertex(-10, -7);
  vertex(15, 0);
  vertex(-10, 7);
  endShape(CLOSE);
}


