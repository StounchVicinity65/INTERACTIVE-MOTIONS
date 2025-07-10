let kInput, massInput;
let y, vy = 0, ay = 0, k = 0.5, m = 2;
let restY;

function setup() {
  createCanvas(windowWidth - 240, windowHeight);
  kInput = document.getElementById('k');
  massInput = document.getElementById('mass');
  restY = height / 2;
  y = restY + 100;
  noLoop();
}

function simulateSHM() {
  k = float(kInput.value);
  m = float(massInput.value);
  vy = 0;
  y = restY + 100;
  loop();
}

function draw() {
  background('#15273C');
  
  // Vertical SHM: a = -k/m * (displacement from rest)
  ay = -(k / m) * (y - restY);
  vy += ay;
  vy *= 0.99; // damping
  y += vy;

  stroke(255);
  strokeWeight(2);
  line(width / 2, 0, width / 2, y); // vertical spring/string

  noStroke();
  fill(255, 100, 100);
  ellipse(width / 2, y, 50); // Ball hanging vertically
}
