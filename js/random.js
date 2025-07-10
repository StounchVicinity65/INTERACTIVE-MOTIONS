let countInput, particles = [];

function setup() {
  createCanvas(windowWidth - 240, windowHeight);
  countInput = document.getElementById('count');
  noLoop();
}

function simulateRandom() {
  particles = [];
  for (let i = 0; i < int(countInput.value); i++) {
    particles.push({
      x: random(width),
      y: random(height),
      vx: random(-2, 2),
      vy: random(-2, 2)
    });
  }
  loop();
}

function draw() {
  background(240);
  fill(100);
  for (let p of particles) {
    ellipse(p.x, p.y, 10);
    p.x += p.vx;
    p.y += p.vy;

    // Keep particles on screen
    if (p.x < 0 || p.x > width) p.vx *= -1;
    if (p.y < 0 || p.y > height) p.vy *= -1;
  }
}
