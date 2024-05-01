//THIS VERSION ADAPTED FOR MUSIC & controller COMPATABILITY
let spriteSheet;
let walkingAnimation;
let animations = [];
let level = .5;
let scream= new Tone.Player ("assets/scream.wav").toDestination();
let GameOverSound = new Tone.Player ("assets/GameOverSound.mp3").toDestination();
let squish= new Tone.Player ("assets/squish.wav").toDestination();
let music = new Tone.Player ("assets/BackMusic.mp3").toDestination();
music.loop = true;
music.autostart = true;
//joystick variables
let port;
let joyX = 0, joyY = 0, sw = 0;
let connectButton;
let circleX, circleY;
let speed = 3;
//background music
const GameState = {
  Start : "Start",
  Playing : "Playing",
  GameOver : "GameOver"
};

let game = { score: 0, maxScore: 0, maxTime: 30 , elapsedTime: 0, totalSprites: 15, state : GameState.Playing};


//load my lil guys
function preload() {
  spriteSheet = loadImage("assets/bugsprites.png");
}

function setup() {
  createCanvas(400, 400);
  imageMode(CENTER);
  angleMode(DEGREES);

  // joystick set up
  port = createSerial();
  circleX = width / 2;
  circleY = height / 2;

  connectButton = createButton("Connect");
  connectButton.mousePressed(connect);

 /* let usedPorts = usedSerialPorts();
  if (usedPorts.length > 0) {
    port.open(usedPorts[0], 57600);
  }
  frameRate(80);
*/
  for(let i=0; i < game.totalSprites; i++) {
    //(spriteSheet, sw, sh, dx, dy, animationLength, speed, framerate, offsetX = 0, offsetY = 0)
    animations[i] = new WalkingAnimation(spriteSheet,80,80,random(50,350),random(50,350),4,level,6,random([0,1]));
  }
}


function draw() {

  // moving through diff stages of game, this is when user is playing
  switch(game.state) {
    case GameState.Playing:
      background(220);
      //back to og code
      for(let i=0; i < animations.length; i++) {
        animations[i].draw();
      }
      textSize(40);
      text (game.score, 20,40);
      let currentTime = game.maxTime- game.elapsedTime;
      //ceil makes it like whole numbers
      text (ceil(currentTime), 350, 40);
      game.elapsedTime += deltaTime / 1000;
      let str = port.readUntil("\n");
      let values = str.split(",");
      if (values.length > 2) {
        joyX = values[0];
        joyY = values[1];
        sw = Number(values[2]);
    
        if (joyX > 0) {
          circleX += speed;
        } else if (joyX < 0) {
          circleX -= speed;
        }
    
        if (joyY > 0) {
          circleY += speed;
        } else if (joyY < 0) {
          circleY -= speed;
        }
      }

    //i think this is just so we see where joystick is
    if (sw == 1) {
      fill("blue");
    }
    else {
      fill (255);
    }
    circle(circleX, circleY, 20);


      if (currentTime>0){ 
        game.state= GameState.Playing;
      }

      if (currentTime > 15){
        music.playbackRate + 1.25;
      }
      if (currentTime < 0){
      //we do this so we dont go into negs and we can game ova
      game.state = GameState.GameOver;
      music.stop();
      GameOverSound.start();
      }
      break;
    case GameState.GameOver: 
      background (0);
      fill(255);
      textAlign(CENTER);
      textSize(40);
      text ("Game Over!",200,200);
      textSize(20);
      text(("Score: ") +game.score, 200,270);

      
      break;
  }
 
}

//joystick port connection 

function connect() {
  if (!port.opened()) {
    port.open('Arduino', 57600);
  } else {
    port.close();
  }
}

// stops the guys from moving but only projects the smush sprite
function mousePressed() {
  //music.start();
for (let i=0; i < animations.length; i++) {
    let contains = animations[i].contains(mouseX,mouseY);
    if (contains) {
      //first if statement keeps them from resurrecting!
      if (animations[i].moving ==0){
        break;
      }
      if (animations[i].moving != 0) {
        scream.start();
        animations[i].stop();
        game.score += 1;
        animations[i].speed +1;
      }
      else {
        if (animations[i].xDirection === 1)
          animations[i].moveRight();
        else
          animations[i].moveLeft();
      }
    }
  }
}
//this officially kills my lil guys (prob:comes back to life)
function mouseReleased() {
  for (let i=0; i < animations.length; i++) {
    let contains = animations[i].contains(mouseX,mouseY);
    if (contains) {
      if (animations[i].stop);
        //force end to scream
        scream.stop();
        animations[i].dead();
        //prob w squish is if its dead it still squish
        //when game is over they still scream and squish
        squish.start();
      }
    }
  }
  

class WalkingAnimation {
  constructor(spriteSheet, sw, sh, dx, dy, animationLength,  speed, framerate, vertical= false, offsetX = 0, offsetY = 0){
    this.spriteSheet = spriteSheet;
    this.sw = sw;
    this.sh = sh;
    this.dx = dx;
    this.dy = dy;
    this.u = 0;
    this.v = 0;
    this.animationLength = animationLength ;
    this.currentFrame = 0;
    this.moving = 1;
    this.xDirection = 1;
    this.offsetX= offsetX;
    this.offsetY = offsetY;
    this.speed = speed;
    this.framerate= framerate*speed;
    this.vertical = vertical;
  }

  draw(){
    
    this.u = (this.moving != 0) ? this.currentFrame % this.animationLength : this.u;
    push();
    translate(this.dx,this.dy);
    rotate (90);
    if (this.vertical)
      rotate(90);
    scale(this.xDirection);
    image(this.spriteSheet,0,0,this.sw,this.sh,this.u*this.sw+this.offsetX,this.v*this.sh+this.offsetY,this.sw,this.sh);
    pop();
    let proportionalFramerate = round(frameRate() / this.framerate);
    if (frameCount % proportionalFramerate == 0) {
      this.currentFrame++;
    }
    if (this.vertical) {
      this.dy += this.moving*this.speed;
      this.move(this.dy,this.sw /2.5, height - this.sw /2.5);
    }
    else{
      this.dx += this.moving*this.speed;
      this.move(this.dx, this.sw /2.5, width - this.sw /2.5 );
    }
    if (game.score > this.speed){
      this.speed += .5;
    }

  }
  // this is to make the above easier to apply to both Hor and Vert sprites
  move(position,lowerBounds, upperBounds){
    if (position > upperBounds ) {
      this.moveLeft();
    } else if (position < lowerBounds) {
      this.moveRight();
    }
  }
  //make lil mans walk right
  moveRight() {
    this.moving = 1;
    this.xDirection = 1;
    
  }
  //literally makes the sprite walk left
  moveLeft() {
    this.moving = -1;
    this.xDirection = -1;
    
  }

  //we in the right box?
  contains(x,y) {
   
    let insideX = x >= this.dx - 26 && x <= this.dx + 25;
    let insideY = y >= this.dy - 35 && y <= this.dy + 35;
    return insideX && insideY;
  }
  //smush
  stop() {
    this.u = 4;
    this.moving = 0;
    
    this.v =0;
  }
  //kill
  dead(){
    this.u =5;
    this.v =0;
  }
}