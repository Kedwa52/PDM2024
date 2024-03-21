function preload(){
  truck = loadImage ('assets/truckerhorn.png')
}




let saw = new Tone.Synth({
  oscillator: {
    type: "sawtooth"
  },
  envelope : {
    attack: 0.01,
    decay: 0.01,
    sustain: 0.5,
    release: 0.01,
  }
}).toDestination();


function mousePressed() { 
saw.triggerAttackRelease("c3", 1.5);
}

function setup() {
  createCanvas(500, 400); 
}

function draw() {
  background(truck);
  text ('press the truck!', 50, 150); 
}
  
