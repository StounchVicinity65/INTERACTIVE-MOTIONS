let speedInput;
let posX = 0;
let speed = 3;

function setup() {
  createCanvas(windowWidth - 240, windowHeight * 0.6);
  speedInput = document.getElementById('speed');
  noLoop();
}

function simulateLinear() {
  const val = parseFloat(speedInput.value);
  if (!isNaN(val) && val >= 0) {
    speed = val;
    posX = 0;
    loop();
  } else {
    alert("Please enter a valid non-negative speed.");
  }
}

function draw() {
  background('#dbeafe');

  // Draw environment
  stroke(180);
  strokeWeight(2);
  line(0, height / 2 + 25, width, height / 2 + 25); // Ground line

  noStroke();
  fill(0, 200, 150);
  ellipse(posX, height / 2, 40);

  posX += speed;
  if (posX > width + 20) {
    posX = -20;
  }
}

