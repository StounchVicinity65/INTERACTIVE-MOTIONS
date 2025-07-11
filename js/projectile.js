let angleInput, speedInput;
let projectile = null;

function setup() {
  createCanvas(windowWidth - 240, windowHeight * 0.6);
  angleInput = document.getElementById('angle');
  speedInput = document.getElementById('speed');
  noLoop();
  angleMode(RADIANS); // Ensure radians for rotation
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
  loop();
}

function resetSimulation() {
  projectile = null;
  clear();
  background('#dbeafe');
  noLoop();
}

function draw() {
  background('#dbeafe');

  if (projectile) {
    projectile.t += 0.1;

    let x = projectile.x0 + projectile.vx * projectile.t;
    let y = projectile.y0 + projectile.vy * projectile.t + 0.5 * 9.8 * sq(projectile.t);
    let vx = projectile.vx;
    let vy = projectile.vy + 9.8 * projectile.t;

    let angle = atan2(vy, vx); // Direction of velocity

    push();
    translate(x, y);
    rotate(angle);
    fill(0); // Black arrowhead
    noStroke();
    drawArrowhead();
    pop();

    if (y > height) {
      noLoop();
    }
  }
}

function drawArrowhead() {
  beginShape();
  vertex(-10, -5);
  vertex(10, 0);
  vertex(-10, 5);
  endShape(CLOSE);
}

