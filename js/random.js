let particles = [];
let numParticles = 20;
let running = false;
let countInput;

function setup() {
  // Select the canvas container from the HTML
  let canvas = createCanvas(windowWidth - 50, windowHeight * 0.5);
  canvas.parent(document.body);
  countInput = document.getElementById('count');
  noLoop(); 
}

function startRandomMotion() {
  numParticles = parseInt(countInput.value) || 20;
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

  // Display FPS
  fill(0);
  textSize(16);
  textAlign(LEFT, TOP);
  text(`FPS: ${frameRate().toFixed(1)}`, 10, 10);

  if (!running) return;

  fill(255, 100, 100);
  noStroke();

  for (let p of particles) {
    /** * THE TRICK FOR RANDOM MOTION:
     * We add a small random "jitter" to the velocity every single frame.
     * This simulates particles bumping into invisible molecules.
     */
    p.vx += random(-0.3, 0.3); 
    p.vy += random(-0.3, 0.3);

    // Limit the maximum speed so they don't fly off too fast
    p.vx = constrain(p.vx, -4, 4);
    p.vy = constrain(p.vy, -4, 4);

    // Update position
    p.x += p.vx;
    p.y += p.vy;

    // Bounce off edges
    if (p.x < 0 || p.x > width) {
      p.vx *= -1;
      p.x = constrain(p.x, 0, width);
    }
    if (p.y < 0 || p.y > height) {
      p.vy *= -1;
      p.y = constrain(p.y, 0, height);
    }

    // Draw particle
    ellipse(p.x, p.y, p.size);
  }
}

function windowResized() {
  resizeCanvas(windowWidth - 50, windowHeight * 0.5);
}
