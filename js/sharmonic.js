let angleInput;
let theta = 0;      // current angle (radians)
let omega = 0;      // angular velocity
let alpha = 0;      // angular acceleration
const g = 9.8;      // gravity
const L = 200;      // pendulum length (pixels)
const damping = 0.995;

function setup() {
  createCanvas(windowWidth - 240, windowHeight * 0.6); // consistent height
  angleInput = document.getElementById('angle');
  noLoop();

  // --- Setup for FPS Display ---
  textSize(16);     // Set text size for FPS display
  textAlign(LEFT, TOP); // Align text to top-left for FPS display
  // --- End Setup for FPS Display ---
}

function simulateSHM() {
  theta = radians(parseFloat(angleInput.value));
  omega = 0;
  loop();
}

function draw() {
  background('#dbeafe');  // Soft blue background

  // SHM physics
  alpha = -(g / L) * theta;
  omega += alpha;
  omega *= damping;
  theta += omega;

  // Origin
  let originX = width / 2;
  let originY = 3;

  // Pendulum bob position
  let bobX = originX + L * sin(theta);
  let bobY = originY + L * cos(theta);

  // Draw pendulum string
  stroke(0);
  strokeWeight(2);
  line(originX, originY, bobX, bobY);

  // Draw pendulum bob
  noStroke();
  fill(255, 100, 100);
  ellipse(bobX, bobY, 40);

  // --- ADDED CODE TO DISPLAY FPS ---
  push(); // Save current drawing style before changing for FPS
  fill(0); // Set text color to black
  textSize(16); // Set text size for FPS
  textAlign(LEFT, TOP); // Align text to top-left for FPS
  noStroke(); // Ensure no stroke for the text
  // Display the current frame rate, rounded to 1 decimal place
  text(`FPS: ${frameRate().toFixed(1)}`, 10, 30); // Position text at (10, 30)
  pop(); // Restore previous drawing style
  // --- END ADDED CODE ---
}

