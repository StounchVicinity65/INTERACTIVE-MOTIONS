let angleInput, speedInput;
let projectile = null;
let trail = [];

function setup() {
  createCanvas(windowWidth - 240, windowHeight * 0.6);
  angleInput = document.getElementById('angle');
  speedInput = document.getElementById('speed');
  noLoop();
  angleMode(RADIANS);

  // --- Setup for FPS Display ---
  textSize(16); // Set text size for FPS display
  textAlign(LEFT, TOP); // Align text to top-left for FPS display
  // --- End Setup for FPS Display ---
}

function launchProjectile() {
  let angle = radians(parseFloat(angleInput.value));
  let speed = parseFloat(speedInput.value);
  projectile = {
    x0: 50,
    y0: height - 50,
    vx: speed * cos(angle),
    vy: -speed * sin(angle),
    t: 0
  };
  trail = []; // Clear old trail
  loop();
}

function resetSimulation() {
  projectile = null;
  trail = [];
  clear();
  background('#dbeafe');
  noLoop();
}

function draw() {
  background('#dbeafe');

  // Draw trail
  stroke(100, 100, 255);
  strokeWeight(3);
  noFill();
  beginShape();
  for (let pos of trail) {
    vertex(pos.x, pos.y);
  }
  endShape();

  if (projectile) {
    projectile.t += 0.1;

    let x = projectile.x0 + projectile.vx * projectile.t;
    let y = projectile.y0 + projectile.vy * projectile.t + 0.5 * 9.8 * sq(projectile.t);
    let vx = projectile.vx;
    let vy = projectile.vy + 9.8 * projectile.t;

    trail.push({ x, y }); // Save current position

    // Draw arrowhead
    let angle = atan2(vy, vx);
    push();
    translate(x, y);
    rotate(angle);
    fill(0);
    noStroke();
    drawArrowhead();
    pop();

    if (y > height) {
      noLoop();
    }
  }

  // --- ADDED CODE TO DISPLAY FPS ---
  fill(0); // Set text color to black
  textSize(16); // Set text size for FPS
  textAlign(LEFT, TOP); // Align text to top-left for FPS
  // Display the current frame rate, rounded to 1 decimal place
  text(`FPS: ${frameRate().toFixed(1)}`, 10, 30); // Position text at (10, 30)
  // --- END ADDED CODE ---
}

function drawArrowhead() {
  beginShape();
  vertex(-10, -5);
  vertex(10, 0);
  vertex(-10, 5);
  endShape(CLOSE);
}

