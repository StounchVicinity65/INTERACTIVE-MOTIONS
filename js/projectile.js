let angleInput, speedInput;
let projectile = null;
let trail = [];

function setup() {
  createCanvas(windowWidth - 240, windowHeight * 0.6);
  angleInput = document.getElementById('angle');
  speedInput = document.getElementById('speed');
  noLoop();
  angleMode(RADIANS);

  // FPS setup
  textSize(16);
  textAlign(LEFT, TOP);
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
  trail = [];
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
  for (let pos of trail) vertex(pos.x, pos.y);
  endShape();

  if (projectile) {
    projectile.t += 0.1;

    let x = projectile.x0 + projectile.vx * projectile.t;
    let y = projectile.y0 + projectile.vy * projectile.t + 0.5 * 9.8 * sq(projectile.t);
    let vx = projectile.vx;
    let vy = projectile.vy + 9.8 * projectile.t;

    trail.push({ x, y });

    // Draw arrowhead
    let angle = atan2(vy, vx);
    push();
    translate(x, y);
    rotate(angle);
    fill(0);
    noStroke();
    drawArrowhead();
    pop();

    if (y > height) noLoop();
  }

  // FPS
  push();
  fill(0);
  textSize(16);
  noStroke();
  text(`FPS: ${frameRate().toFixed(1)}`, 10, 30);
  pop();
}

function drawArrowhead() {
  beginShape();
  vertex(-10, -5);
  vertex(10, 0);
  vertex(-10, 5);
  endShape(CLOSE);
}
