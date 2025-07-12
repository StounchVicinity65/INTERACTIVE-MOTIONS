let particles = [];
let numParticles = 20;
let running = false;
let countInput;

function setup() {
  createCanvas(windowWidth - 240, windowHeight * 0.6);
  countInput = document.getElementById('count');
  noLoop();

  // --- Setup for FPS Display ---
  textSize(16); // Set text size for FPS display
  textAlign(LEFT, TOP); // Align text to top-left for FPS display
  // --- End Setup for FPS Display ---
}

function startRandomMotion() {
  numParticles = parseInt(countInput.value);
  particles = [];
  for (let i = 0; i < numParticles; i++) {
    particles.push({
      x: random(width),
      y: random(height),
      vx: random(-2, 2),
      vy: random(-2, 2),
      size: random(8, 16)
    });
  }
  running = true;
  loop();
}

function stopRandomMotion() {
  running = false;
  noLoop();
}

function draw() {
  background('#dbeafe');

  if (!running) {
    // --- ADDED CODE TO DISPLAY FPS even when not running, or just display once ---
    fill(0); // Set text color to black
    textSize(16); // Set text size for FPS
    textAlign(LEFT, TOP); // Align text to top-left for FPS
    text(`FPS: ${frameRate().toFixed(1)}`, 10, 30); // Position text at (10, 30)
    // --- END ADDED CODE ---
    return; // Exit draw loop if not running
  }

  fill(255, 100, 100);
  noStroke();

  for (let p of particles) {
    p.x += p.vx;
    p.y += p.vy;

    // Bounce off edges
    if (p.x < 0 || p.x > width) p.vx *= -1;
    if (p.y < 0 || p.y > height) p.vy *= -1;

    ellipse(p.x, p.y, p.size);
  }

  // --- ADDED CODE TO DISPLAY FPS ---
  fill(0); // Set text color to black
  textSize(16); // Set text size for FPS
  textAlign(LEFT, TOP); // Align text to top-left for FPS
  // Display the current frame rate, rounded to 1 decimal place
  text(`FPS: ${frameRate().toFixed(1)}`, 10, 30); // Position text at (10, 30)
  // --- END ADDED CODE ---
}
