let particles = [];
let numParticles = 20;
let running = false;
let countInput;

function setup() {
  createCanvas(windowWidth - 240, windowHeight * 0.6);
  countInput = document.getElementById('count');
  noLoop();
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

  if (!running) return;

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
}
