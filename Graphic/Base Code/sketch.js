let options = ["Option 1", "Option 2", "Option 3", "Option 4", "Option 5"];
let spinning = false;
let angle = 0;
let angularVelocity = 0;
let friction = 0.98;
let finalAngle;

function setup() {
  createCanvas(400, 400);
  textAlign(CENTER, CENTER);
  textSize(24);
}

function draw() {
  background(220);
  translate(width / 2, height / 2);
  rotate(angle);

  for (let i = 0; i < options.length; i++) {
    let theta = TWO_PI / options.length;
    rotate(theta);
    fill(0);
    text(options[i], 100, 0);
  }

  if (spinning) {
    angularVelocity += random(0.001, 0.005);
    angularVelocity *= friction;
    angle += angularVelocity;
  } else if (finalAngle !== undefined) {
    let index = floor(map(finalAngle % TWO_PI, 0, TWO_PI, 0, options.length));
    alert("Selected: " + options[index]);
    finalAngle = undefined;
  }
}

function mousePressed() {
  if (!spinning) {
    angularVelocity = random(0.1, 0.3);
    spinning = true;
  }
}

function mouseReleased() {
  if (spinning) {
    finalAngle = angle;
    spinning = false;
  }
}