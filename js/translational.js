let displacementInput, pos = 0, target = 100;

function setup() {
  createCanvas(windowWidth - 240, windowHeight);
  displacementInput = document.getElementById('displacement');
  noLoop();
}

function simulateTranslational() {
  pos = 0;
  target = float(displacementInput.value);
  loop();
}

function draw() {
  background(240);
  fill(150, 100, 255);
  ellipse(pos, height / 2, 40);
  
  if (pos < target) {
    pos += 2;
  } else {
    noLoop(); // Stop when target is reached
  }
}
