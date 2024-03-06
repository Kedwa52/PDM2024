// kris 2024
//let sound1 = new Tone.Player("media/woosh.wav");

let sounds = new Tone.Players({

  "gong": "media/gong_1.mp3",
  "gasp": "media/gasp.wav",
  "woosh": "media/woosh.wav",
  "laugh": "media/laugh.wav"

})
const delay = new Tone.FeedbackDelay("8n", 0.5);

let soundNames= ["gong","gasp","woosh","laugh"];
let buttons = [];

let dSlider;

function setup() {
  createCanvas(400, 400);
  sounds.connect(delay);
  delay.toDestination();

  soundNames.forEach((word,index) => {
    buttons[index]= createButton(word);
    buttons[index].position(index, index*50);
    buttons[index].mousePressed( ()=> buttonSound(word));
  })
  dSlider = createSlider(0., 1., 0.5, 0.05);
  dSlider.mouseReleased( () => {
    delay.delayTime.value = dSlider.value();
  })

}

function draw() {
  background(220);
  text('press the buttons for sound', 0, 200)
  text('move the slider for delay effect', 0, 390)
}

function buttonSound(whichSound) {
  sounds.player(whichSound).start();
}