const synth = new Tone.DuoSynth();
let v;
const pingPong = new Tone.PingPongDelay("4n", v)
synth.connect(pingPong);
let slider;

let notes = {

  'a': 'C4',
  's': 'D4',
  'd': 'E4',
  'f': 'F4',
  'g': 'G4',
  'h': 'A4',
  'j': 'B4',
  'k': 'C5'

}

function setup() {
  createCanvas(400, 400);
  //chorus.toDestination();
  slider = new Nexus.Slider("#slider");
  pingPong.toDestination();
  slider.on('change',(v) =>{
    pingPong.feedback.signal =v;
  })
}

function draw() {
  background(220);
}

function keyPressed() {
  let whatNote = notes[key]
  synth.harmonicity.value = 0.6;
  synth.triggerAttackRelease(whatNote, "8n");
 
}