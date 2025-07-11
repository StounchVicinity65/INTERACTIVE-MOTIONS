function draw() {
  background('#dbeafe');

  // Draw ground line for reference
  stroke(120);
  strokeWeight(1);
  line(0, height / 2 + 40, width, height / 2 + 40);

  // Movement vector components
  let dx = speed * cos(angle);
  let dy = speed * sin(angle);

  // For each particle, move along vector until displaced fully
  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    let start = startPositions[i];

    // Calculate distance travelled from start
    let distTravelled = p5.Vector.dist(p, start);

    // Move if displacement not reached
    if (distTravelled < displacement) {
      p.x += dx;
      p.y += dy;
    }

    // Draw arrowhead at particle position, always facing right (no rotation)
    push();
    translate(p.x, p.y);
    // rotate(angle); // <-- Removed rotation here
    drawArrowhead();
    pop();
  }

  // Stop animation when all particles reached displacement
  let allDone = particles.every((p, i) => p5.Vector.dist(p, startPositions[i]) >= displacement);
  if (allDone) {
    noLoop();
  }
}



