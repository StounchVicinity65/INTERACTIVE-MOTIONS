let angleInput, speedInput;
let projectile = null;

function setup() {
  createCanvas(windowWidth - 240, windowHeight * 0.6);
  angleInput = document.getElementById('angle');
  speedInput = document.getElementById('speed');
  noLoop();
}

function launchProjectile() {
  let angle = radians(parseFloat(angleInput.value));
  let speed = parseFloat(speedInput.value);
  projectile = {
    x: 50,
    y: height - 50,
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
    let x = projectile.x + projectile.vx * projectile.t;
    let y = projectile.y + projectile.vy * projectile.t + 0.5 * 9.8 * sq(projectile.t);

    fill(255, 50, 50);
    noStroke();
    textSize(36);
    text("➡️", x, y);

    // stop when projectile goes below ground
    if (y > height) {
      noLoop();
    }
  }
}



