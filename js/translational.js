let displacementInput, angleInput;
let particles = [];
let displacement = 300;
let angle = 0;
let speed = 2; // pixels per frame
let startPositions = [];

function setup() {
  createCanvas(windowWidth - 240, windowHeight * 0.6);
  displacementInput = document.getElementById('displacement');
  angleInput = document.getElementById('angle');
  noLoop();

  // Initialize 5 particles spaced very close (as if touching)
  for (let i = 0; i < 5; i++) {
    particles.push(createVector(100 + i * 20, height / 2)); // 20px apart
  }
  startPositions = particles.map(p => p.copy());

  textSize(16);
  textAlign(LEFT, TOP);
}

function startTranslation() {
  displacement = parseFloat(displacementInput.value);
  angle = radians(parseFloat(angleInput.value));
  startPositions = particles.map(p => p.copy());
  loop();
}

function stopTranslation() {
  noLoop();
}

function draw() {
  background('#dbeafe');

  let dx = speed * cos(angle);
  let dy = speed * sin(angle);

  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    let start = startPositions[i];

    let distTravelled = p5.Vector.dist(p, start);

    if (distTravelled < displacement) {
      p.x += dx;
      p.y += dy;
    }

    push();
    translate(p.x, p.y);
    drawArrowhead();
    pop();
  }

  let allDone = particles.every((p, i) => p5.Vector.dist(p, startPositions[i]) >= displacement);
  if (allDone) noLoop();

  push();
  fill(0);
  textSize(16);
  textAlign(LEFT, TOP);
  noStroke();
  text(`FPS: ${frameRate().toFixed(1)}`, 10, 30);
  pop();
}

function drawArrowhead() {
  noStroke();
  fill(0);
  beginShape();
  vertex(-10, -7);
  vertex(15, 0);
  vertex(-10, 7);
  endShape(CLOSE);
}

// --- LANGUAGE TOGGLE ---
const toggleBtn = document.getElementById("languageToggle");
let currentLang = 'en';
toggleBtn.addEventListener('click', () => {
  const showEn = currentLang === 'bn';
  document.querySelectorAll('.lang-en').forEach(el => el.classList.toggle('hidden', !showEn));
  document.querySelectorAll('.lang-bn').forEach(el => el.classList.toggle('hidden', showEn));
  currentLang = showEn ? 'en' : 'bn';
  toggleBtn.textContent = showEn ? 'বাংলা' : 'English';
});

function windowResized() {
  resizeCanvas(windowWidth - 240, windowHeight * 0.6);
}



