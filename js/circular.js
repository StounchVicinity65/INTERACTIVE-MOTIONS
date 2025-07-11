let radius = 100;
let angle = 0;
let speedInput;
let angularSpeed = 0.05;
let centerX, centerY;

function setup() {
createCanvas(windowWidth - 240, windowHeight * 0.6);
angleMode(RADIANS);
speedInput = document.getElementById('speed');
centerX = width / 2;
centerY = height / 2;
noLoop();
}

function simulateCircular() {
angularSpeed = parseFloat(speedInput.value);
angle = 0;
loop();
}

function draw() {
background('#dbeafe');

// Draw circle path
noFill();
stroke(100);
strokeWeight(2);
ellipse(centerX, centerY, radius * 2);

// Calculate position
let x = centerX + radius * cos(angle);
let y = centerY + radius * sin(angle);

// Draw object
fill(255, 100, 100);
noStroke();
ellipse(x, y, 30);

// Angle update
angle += angularSpeed * 0.05;
if (angle > TWO_PI) angle = 0;
}
