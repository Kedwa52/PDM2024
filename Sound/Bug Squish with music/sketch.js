//THIS VERSION ADAPTED FOR MUSIC COMPATABILITY
let spriteSheet;
let walkingAnimation;
let animations = [];
let level = .5;
let scream= new Tone.Player ("assets/scream.wav").toDestination();

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
      for(let i=0; i < animations.length; i++) {
        animations[i].draw();
      }
      textSize(40);
      text (game.score, 20,40);
      let currentTime = game.maxTime- game.elapsedTime;
      //ceil makes it like whole numbers
      text (ceil(currentTime), 300, 40);
      game.elapsedTime += deltaTime / 1000;
    
      if (currentTime < 0)
      //we do this so we dont go into negs and we can game ova
        game.state = GameState.GameOver;
    
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



// stops the guys from moving but only projects the smush sprite
function mousePressed() {
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
        scream.stop();
        animations[i].dead();
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