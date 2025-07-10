let angleInput, speedInput;
let projectile = null;

function setup() {
  createCanvas(windowWidth - 240, windowHeight);
  angleInput = document.getElementById('angle');
  speedInput = document.getElementById('speed');
}

function launchProjectile() {
  let angle = radians(parseFloat(angleInput.value));
  let speed = parseFloat(speedInput.value);
  projectile = {
    x: 220,
    y: height - 220,
    vx: speed * cos(angle),
    vy: -speed * sin(angle),
    t: 0,
    angle: angle
  };
}

function draw() {
  background(240);
  noStroke();

  if (projectile) {
    projectile.t += 0.1;
    let x = projectile.x + projectile.vx * projectile.t;
    let y = projectile.y + projectile.vy * projectile.t + 0.5 * 9.8 * sq(projectile.t);

    // Draw arrow at (x, y) with orientation based on velocity
    let dx = projectile.vx;
    let dy = projectile.vy + 9.8 * projectile.t;
    let theta = atan2(dy, dx);

    push();
    translate(x, y);
    rotate(theta);
    fill(255, 50, 50);
    triangle(-15, -5, -15, 5, 0, 0); // Arrowhead
    rect(-25, -3, 10, 6);            // Arrow shaft
    pop();

    // Stop animation when projectile goes below ground
    if (y > height) {
      projectile = null;
    }
  }
}



