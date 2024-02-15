let sprite;

function preload(){
  sprite= new Sprite(200,200,80,80); 
  sprite.spriteSheet ='assets/SpelunkyMonk.png';
  let animations = {
    stand: { row: 0, frames: 1},
    walkRight: {row: 0, col: 1, frames: 8},
  };
  sprite.anis.frameDelay = 8;
  sprite.addAnis(animations);
  sprite.changeAni('walkRight');
}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  if (kb.pressing('right')){
    walkRight();
  } else if (kb.pressing('left')){
    walkLeft();
  }else {
    stop();
  }
}

function stop() {
  sprite.vel.x = 0;
  sprite.vel.y = 0;
  sprite.changeAni('stand');
}

function walkRight() {
  sprite.changeAni('walkRight');
  sprite.vel.x = 1;
  sprite.scale.x = 1;
  sprite.vel.y = 0;
}

function walkLeft() {
  sprite.changeAni('walkRight');
  sprite.vel.x = -1;
  sprite.scale.x = -1;
  sprite.vel.y = 0;
}

