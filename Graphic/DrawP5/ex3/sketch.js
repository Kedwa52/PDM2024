function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(0);
  angleMode(DEGREES);
  noStroke();
  fill("yellow");
  arc(150,200,200,200,225,135);
  fill("red");
  arc(400,200,200,200,180,0);
  rect(300, 200, 200, 100);
  fill("white");
  circle(350,200,50);
  circle(450,200,50);
  fill("blue");
  circle(350,200,30);
  circle(450,200,30);
}
