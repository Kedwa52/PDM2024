let port;
let connectButton;
let ledState = 0; // 0 for off, 1 for on
let color; 

//let knob; 


function setup() {
  createCanvas(400, 400);
  port = createSerial();
  connectButton = createButton("Connect");
  connectButton.mousePressed(connect);

  let usedPorts = usedSerialPorts();
  if (usedPorts.length > 0) {
    port.open(usedPorts[0], 9600);
  }
  frameRate(80);
}

//this is just a for funsies circle rn 
function draw() {
    background(220);
    //color= port.read;
   // fill(0,0,color);
    //ellipse(200, 200, 50, 50);
    let str= port.readUntil ("\n");
    if (str != "") {
    console.log(str);
    //let values = str.split(",");
    //if (values.length > 2){
      color = Number(str);
      //color= map(knob, 0, 255, 0, 255);
      //fill(color,0,255);
    //}
    }
    fill(color,0,255);
    ellipse(200, 200, 50, 50);
}

// Function to send data to Arduino

function mousePressed() {
  if (ledState==0){
  port.write('1');
  ledState= 1; }
  else if (ledState==1) {
  port.write('0');
  ledState=0;
  }
}


function connect() {
  if (!port.opened()) {
    port.open('Arduino', 9600);
  } else {
    port.close();
  }
}