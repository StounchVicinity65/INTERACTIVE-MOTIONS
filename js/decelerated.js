let speedInput, decelInput;
let x = 0;
let v = 0;
let a = 0;

function setup() {
  createCanvas(windowWidth - 240, windowHeight * 0.6);
  speedInput = document.getElementById('speed');
  decelInput = document.getElementById('deceleration');
  noLoop();
  textSize(48);
  textAlign(CENTER, CENTER);
}

function simulateDeceleration() {
  let speed = parseFloat(speedInput.value);
  let decel = parseFloat(decelInput.value);

  // enforce validation
  if (speed < decel) {
    alert("⚠️ Initial speed must be equal to or greater than deceleration.");
    return;
  }

  x = width - 100; 
  v = speed;
  a = -abs(decel);
  loop();
}

function draw() {
  background(135, 206, 235);

  // Grass
  fill(60, 179, 113);
  rect(0, 0, width, height * 0.2);
  rect(0, height * 0.8, width, height * 0.2);

  // Road
  let roadY = height * 0.5;
  let roadHeight = 100;
  fill(50);
  rect(0, roadY, width, roadHeight);

  // Lane markings
  stroke(255);
  strokeWeight(4);
  for (let i = 0; i < width; i += 40) {
    line(i, roadY + roadHeight / 2, i + 20, roadY + roadHeight / 2);
  }
  noStroke();

  // Trees
  let spacing = 120;
  for (let i = 0; i < width; i += spacing) {
    fill(139, 69, 19);
    rect(i + 20, roadY - 60, 10, 40);
    fill(34, 139, 34);
    ellipse(i + 25, roadY - 70, 40);

    rect(i + 60, roadY + roadHeight + 20, 10, 40);
    ellipse(i + 65, roadY + roadHeight + 20, 40);
  }

  // Car
  push();
  textSize(48);
  textAlign(CENTER, CENTER);
  text("🚗", x, roadY + roadHeight / 2);
  pop();

  // Physics
  v += a * 0.1;
  if (v < 0) v = 0;
  x -= v;

  if (v === 0 || x < -50) noLoop();

  // FPS
  fill(0);
  textSize(16);
  textAlign(LEFT, TOP);
  text(`FPS: ${frameRate().toFixed(1)}`, 10, 30);
}




