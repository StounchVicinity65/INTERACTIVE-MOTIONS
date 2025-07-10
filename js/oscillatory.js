let amplitudeInput, frequencyInput;
let t = 0, amplitude = 100, frequency = 1;

function setup() {
  createCanvas(windowWidth - 240, windowHeight);
  amplitudeInput = document.getElementById('amplitude');
  frequencyInput = document.getElementById('frequency');
  noLoop();
}

function simulateOscillation() {
  amplitude = float(amplitudeInput.value);
  frequency = float(frequencyInput.value);
  t = 0;
  loop();
}

function draw() {
  background(240);
  let y = height / 2 + amplitude * sin(TWO_PI * frequency * t);
  fill(100, 100, 255);
  ellipse(width / 2, y, 50);
  t += 0.02;
}
