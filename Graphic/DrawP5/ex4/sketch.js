function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(0,0,100);
  stroke("white");
  strokeWeight(5);
  fill("green");
  circle(200,200,200);
  fill("red")
  beginShape();
  vertex(200,95);
  vertex(220,160);
  vertex(295,160);
  vertex(235,200);
  vertex(260,275);
  vertex(200,225);
  vertex(140,275);
  vertex(160,200);
  vertex(105,160);
  vertex(180,160);
  vertex(200,95);
  endShape();
}
