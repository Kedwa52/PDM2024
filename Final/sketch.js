let numSections = 6;
let sectionColors = ['#040273 ', '#cc5500', '#013220', '#850101', '#D4AF37', '#A65111'];
let sectionNames = ["SoLou", "Elsies", "Leolas", "Phil's", "Jubans", "Parrains"];
let angle = 0;
let angularVelocity = 0;
let spinning = false;
let place = "??";
let selected = new Tone.Player ("assets/funwin.mp3").toDestination();
let soundfile = new Tone.Player ("assets/funspin.mp3").toDestination();
//soundfile.autostart = true;
//soundfile.loop= true;

//working on physical aspects
let port;
let connectButton;
let ledState=0; 
let buttonState=0;

//am i using game states? idk
const GameState = {
  Start : "Start",
  Playing : "Playing",
  GameOver : "GameOver"
};

function setup() {
  createCanvas(600, 600);
  port = createSerial();
  connectButton = createButton("Connect");
  connectButton.mousePressed(connect);
  let usedPorts = usedSerialPorts();
  if (usedPorts.length > 0) {
    port.open(usedPorts[0], 9600);
  }
  frameRate(80);
}

function draw() {
  let str= port.readUntil ("\n");
  if (str != "") {
    console.log(str);}
  buttonState=str;
  if (buttonState==1){
    buttonClicked();
  }
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
      soundfile.stop();
      selected.start();
      let sectionIndex = int(map(angle % TWO_PI, 0, TWO_PI, 0, numSections));
      place= sectionNames[sectionIndex];
      ledState=1;
      port.write('1');
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

function drawPointer(){
  push();
  translate(300,300);
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

function buttonClicked() {
  if (!spinning) {
    soundfile.start();
    angularVelocity = random(0.1, 0.2);
    spinning = true;
    ledState=0;
    port.write('0');
  }
}
function connect() {
  if (!port.opened()) {
    port.open('Arduino', 9600);
  } else {
    port.close();
  }
}
