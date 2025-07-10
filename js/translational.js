let displacementInput, angleInput;
let posX = 100, posY = 300;
let targetX, targetY;
let vx = 0, vy = 0;
let moving = false;

function setup() {
  createCanvas(windowWidth - 240, windowHeight);
  displacementInput = document.getElementById('displacement');
  angleInput = document.getElementById('angle');
  noLoop();
}

function simulateTranslational() {
  let displacement = float(displacementInput.value);
  let angleDeg = float(angleInput.value);
  let angleRad = radians(angleDeg);

  vx = cos(angleRad) * 2;
  vy = sin(angleRad) * 2;

  targetX = posX + displacement * cos(angleRad);
  targetY = posY + displacement * sin(angleRad);

  moving = true;
  loop();
}

function draw() {
  background(240);

  if (moving) {
    posX += vx;
    posY += vy;

    // Stop when close to target
    if (dist(posX, posY, targetX, targetY) < 2) {
      moving = false;
      noLoop();
    }
  }

  textSize(40);
  textAlign(CENTER, CENTER);
  text('😀', posX, posY);
}
