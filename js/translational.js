let displacementInput, angleInput;
let particles = [];
let displacement = 300;
let angle = 0;
let speed = 2;  // pixels per frame
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

  // Draw ground line for reference
  stroke(120);
  strokeWeight(1);
  line(0, height / 2 + 40, width, height / 2 + 40);

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

    // Draw arrowhead at particle position, rotated to angle
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
}

// Draw black arrowhead pointing right along x-axis (before rotation)
function drawArrowhead() {
  noStroke();
  fill(0);
  // Draw a simple triangle arrowhead
  beginShape();
  vertex(-10, -7);
  vertex(15, 0);
  vertex(-10, 7);
  endShape(CLOSE);
}


