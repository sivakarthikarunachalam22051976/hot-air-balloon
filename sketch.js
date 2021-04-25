var backgroundImage;
var balloon, balloonImage;
var position;
var balloonPosition;
var database;

function preload(){
  backgroundImage = loadImage("images/bg.png");
  balloonImage = loadAnimation("images/HotAirBallon-02.png","images/HotAirBallon-03.png","images/HotAirBallon-04.png");
  
}

function setup() {
  database = firebase.database();

  createCanvas(1350,800);

  balloon = createSprite(400, 630, 50, 50);
  balloon.addAnimation("flying",balloonImage);
  balloon.scale = 0.6;
  //balloon.velocityX = 0.2;
  //balloon.velocityY = -0.2;
  
  balloonPosition = database.ref("balloon/position");
  balloonPosition.on("value", readPosition);
}

function draw() {
  background(backgroundImage);

  if(position !== undefined){
    if(keyDown(UP_ARROW)){
      writePosition(0,-1);
      balloon.scale = balloon.scale - 0.001;
    }
    else if(keyDown(DOWN_ARROW)){
      writePosition(0,1);
      balloon.scale = balloon.scale + 0.001;
    }
    else if(keyDown(LEFT_ARROW)){
      writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
      writePosition(1,0);
    }

    drawSprites();
  }

  fill(0);
  text(mouseX+","+mouseY,mouseX,mouseY); 

  fill(0);
  textSize(15);
  text("Use arrow keys to move the HOT AIR BALLOON..",15,25); 

}

function writePosition(x,y){
  database.ref("balloon/position").set({
    'x' : position.x + x,
    'y' : position.y + y
  })
}

function readPosition(a){
  position = a.val();
  balloon.x = position.x;
  balloon.y = position.y;

}