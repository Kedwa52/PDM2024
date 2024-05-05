let numSections = 6;
let sectionColors = ['#040273 ', '#cc5500', '#013220', '#850101', '#D4AF37', '#A65111'];
let sectionNames = ["SoLou", "Elsies", "Leolas", "Phil's", "Jubans", "Parrains"];
let angle = 0;
let angularVelocity = 0;
let spinning = false;
let place = "??";

function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(220);
  drawWheel();
  drawPointer();
  fill('black');
  textAlign('CENTER');
  text("We think you should eat at ",300,100)
  textSize(30);
  text(place,300,500);
  if (spinning) {
    angularVelocity *= 0.99; // Deceleration
    angle += angularVelocity;
    if (angularVelocity < 0.001) {
      spinning = false;
      let sectionIndex = int(map(angle % TWO_PI, 0, TWO_PI, 0, numSections));
      place= sectionNames[sectionIndex];
    }
  }
}

function drawWheel() {
  let angleIncrement = TWO_PI / numSections;
  for (let i = 0; i < numSections; i++) {
    fill(sectionColors[i]);
    arc(width/2, height/2, 300, 300, i * angleIncrement, (i+1) * angleIncrement, PIE);
    textAlign(CENTER, CENTER);
    fill(255);
    textSize(16);
    let label = sectionNames[i];
    text(label, width/2 + cos((i + 0.5) * angleIncrement) * 120, height/2 + sin((i + 0.5) * angleIncrement) * 120);
  }
}

function drawPointer() {
  push();
  translate(300,300)
  noStroke();
  fill('black');
  rectMode(CENTER);
  rotate(angle);
  rect(0, 0, 200, 12);
  triangle(85, -20, 85, 20, 125, 0);

  fill(252, 238, 33);
  ellipse(0, 0, 5, 5);
  pop();
}

function mouseClicked() {
  if (!spinning) {
    angularVelocity = random(0.1, 0.2);
    spinning = true;
  }
}