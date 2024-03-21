/*Tips: we want to use MP3 sounds over WAV
freesound.org BBC sound effects
have to tell sounds where to go (destination)
also have to tell audio to trigger
*/

let soundfx;

/*make array!
let soundNames =['popcorn','water']
when usig->
 soundNames.forEach((names,index) =>{
  buttons[index]= createButton(names);
  buttons[index].position (120,100 + index*50)
  buttons[index].mousePressed
})
*/
/*
function preload(){
soundfx= new Tone.Players({
    //var name : "assests/filename.mps", 
    //same thing ^
}) .toDestination(); //this tells audio to go to speakers 
}
*/

function setup() {
  createCanvas(600,600);

/* she uses P5 buttons
  butt1.createButton ('whatButtonSays')
  butt1.position(x,y);
  butt1.mousePressed (play1); //inline function is below//
  (() =>soundFx.player('avname').start());
*/
}
/*
 function play1(){
  soundFx.player ('audio var name').start();
 }
 */


function draw() {
  background(220);
}
