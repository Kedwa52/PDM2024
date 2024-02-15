const x = 0;
let y = 0;
let size = 50
let changeColor= 255


function setup() {
  createCanvas(800, 600);
  background(255);
  //make all of the squares
  fill('red')
  square(x,y,size)
  fill('orange')
  square(x,y+50,size)
  fill('yellow')
  square(x,y+100,size)
  fill('green')
  square(x,y+150,size)
  fill('cyan')
  square(x,y+200,size)
  fill('blue')
  square(x,y+250,size)
  fill('magenta')
  square(x,y+300,size)
  fill('brown')
  square(x,y+350,size)
  fill('white')
  square(x,y+400,size)
  fill('black')
  square(x,y+450,size)


}


function draw() {
  if(mouseIsPressed && (mouseX > 0) && (mouseX < 50) && (mouseY > 0) && (mouseY < 50)){
     changeColor = "red";
     } 
     if(mouseIsPressed && (mouseX > 0) && (mouseX < 50) && (mouseY > 50) && (mouseY < 100)){
      changeColor = "orange";
      } 
      if(mouseIsPressed && (mouseX > 0) && (mouseX < 50) && (mouseY > 100) && (mouseY < 150)){
        changeColor = "yellow";
        }
        if(mouseIsPressed && (mouseX > 0) && (mouseX < 50) && (mouseY > 150) && (mouseY < 200)){
          changeColor = "green";
          }
          if(mouseIsPressed && (mouseX > 0) && (mouseX < 50) && (mouseY > 200) && (mouseY < 250)){
            changeColor = "cyan";
            }
            if(mouseIsPressed && (mouseX > 0) && (mouseX < 50) && (mouseY > 250) && (mouseY < 300)){
              changeColor = "blue";
              }
              if(mouseIsPressed && (mouseX > 0) && (mouseX < 50) && (mouseY > 300) && (mouseY < 350)){
                changeColor = "magenta";
                }
                if(mouseIsPressed && (mouseX > 0) && (mouseX < 50) && (mouseY > 350) && (mouseY < 400)){
                  changeColor = "brown";
                  }
                  if(mouseIsPressed && (mouseX > 0) && (mouseX < 50) && (mouseY > 400) && (mouseY < 450)){
                    changeColor = "white";
                    }
                    if(mouseIsPressed && (mouseX > 0) && (mouseX < 50) && (mouseY > 450) && (mouseY < 500)){
                      changeColor = "black";
                      }
    }

 function mouseDragged(){
  //makes sure you can't draw on boxes
  if (mouseX>50){
  line(mouseX,mouseY,pmouseX,pmouseY,50);
  //stroke weight of DRAWN line
  strokeWeight(8);
  stroke(changeColor);
  }
 }