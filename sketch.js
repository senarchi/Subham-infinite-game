var boy,mountains,ground;
var edges;
var boyImg,mountainsImg,rock1Img,boyImg2,coinImg;
var rock1,rock2,rock3,coin;
var rockG;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score;


function preload(){
boyImg=loadAnimation("boy 1.png","boy 2.png","boy 3.png")
mountainsImg = loadImage("mountain.jpg")
rock1Img = loadImage("rock 1.png")
rock2 = loadImage("rock 2.png");
rock3 = loadImage("rock 3.png");
boyImg2 = loadAnimation("boy 4.png");
coinImg = loadImage("coin.png");
}

function setup() {
   createCanvas(1380,500)
   score = 0;

   mountains = createSprite(700,200);
   mountains.addImage(mountainsImg);
   mountains.scale=2.5
  
   boy = createSprite(120,430);
   boy.addAnimation("running",boyImg);
   boy.addAnimation("stop",boyImg2);
   boy.scale = 0.7

   ground = createSprite(700,450,1380,20)

   boy.setCollider("circle",0,0,20)
   //boy.debug=true;

   rockG = new Group();
   coinG = new Group();
}

function spawnRocks(){
   if(World.frameCount % 170 === 0){
      var rock1 = createSprite(1400,473,20,20);

      var rand = Math.round(random(1,3));
      switch(rand) {
        case 1: rock1.addImage(rock1Img);
                break;
        case 2: rock1.addImage(rock2);
                break;
        case 3: rock1.addImage(rock3);
                break;
        default: break;

      //rock1.addImage(rock1Img)
      
      }
      rock1.scale = 0.25;
      rock1.velocityX = -4
      rock1.lifetime =350
      rockG.add(rock1);
   }
}

function spawnCoin(){
   if (World.frameCount % 60 === 0){
       coin = createSprite(Math.round(random(1400,1700)),Math.round(random(473,373)),20,20)
      coin.velocityX = -4;
      coin.addImage(coinImg);
      coin.scale = 0.2;
      //coin.bounceOff(rockG);
      coinG.add(coin);

   }
}

function draw() {
background("black")


edges = createEdgeSprites();


boy.collide(edges);
boy.collide(ground);
coinG.collide(rockG)
ground.visible=false;
spawnRocks()
spawnCoin();



if (keyDown("space")){
   boy.velocityY=-13;
}
boy.velocityY = boy.velocityY+0.8;

drawSprites();



if(rockG.isTouching(boy)){
   gameState = END;
  
}

if(coinG.isTouching(boy)){
   coinG[0].destroy();
   score=score+1
}



if (gameState === END){
   textSize(40);
   fill("yellow");
   stroke("red");
    text("GAME OVER",600,200);
    rockG.setVelocityXEach(0);
    rockG.setlifetimeEach(-1);
    boy.velocityY=0;
    boy.changeAnimation("stop",boyImg2);
 
}



fill ("blue")
stroke("black")
strokeWeight(2)
textSize(40);
text("Score : "+ score, 1100,50);


}
