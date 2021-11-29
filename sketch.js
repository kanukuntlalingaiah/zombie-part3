var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zomb;
 var zombimg;
var zombieGroup;
var exSound,loseSound,winSound;
var heart1,heart2,heart3;
var ht1,ht2,ht3
var bulletGroup,bullets=50;
var score=0;
var GameState="fight"
var life=3
var bullet
function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")

  bgImg = loadImage("assets/bg.jpeg")
zombimg=loadImage("assets/zombie.png")
heart1=loadImage("assets/heart_1.png")
heart2=loadImage("assets/heart_2.png")
heart3=loadImage("assets/heart_3.png")
exSound=loadSound("assets/explosion.mp3")
loseSound=loadSound("assets/lose.mp3")
winSound=loadSound("assets/win.mp3")


}

function setup() {

  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)

ht1=createSprite(displayWidth-150,40,20,20)
ht1.addImage("hSt1",heart1)
ht1.visible=false
ht1.scale=0.4

ht2=createSprite(displayWidth-100,40,20,20)
ht2.addImage("hSt2",heart2)
ht2.visible=false
ht2.scale=0.4

ht3=createSprite(displayWidth-100,40,20,20)
ht3.addImage("hSt3",heart3)
ht3.scale=0.4

zombieGroup=new Group()
  bulletGroup=new Group()
}

function draw() {
  background(0); 

if(GameState==="fight"){
  if(life===3){
    ht3.visible=true
    ht2.visible=false
    ht1.visible=false
  }
  if(life===2){
    ht2.visible=true
    ht3.visible=false
    ht1.visible=false
  }
  if(life===1){
    ht1.visible=true
    ht2.visible=false
    ht3.visible=false
  }
  if(life===0){
    GameState="lose"
  }
if(score==100){
  winSound.play()
  GameState="win"
}

  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}
 

//release bullets and change the image of shooter to shooting position when space is pressed


//player goes back to original standing image once we stop pressing the space bar
 if(keyWentDown("space")){
  player.addImage(shooter_shooting)
  bullet=createSprite(displayWidth-1150,player.y-30,20,10)
  bullet.velocityX=20
  bulletGroup.add(bullet)
player.depth=bullet.depth
player.depth=player.depth+2
bullets=bullets-1
exSound.play()
}
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}

if(bullets===0){
  GameState="bullet"
  loseSound.play()
}
if(zombieGroup.isTouching(bulletGroup)){
  for(var i=0 ;i<zombieGroup.length;i++){
    if(zombieGroup[i].isTouching(bulletGroup)){
      zombieGroup[i].destroy()
      bulletGroup.destroyEach()
      score=score+2
      exSound.play()
    }
  }
}

if(zombieGroup.isTouching(player)){
  loseSound.play()
  for(var i=0;i<zombieGroup.length;i++){
    if(zombieGroup[i].isTouching(player)){
      zombieGroup[i].destroy()
      life=life-1
    }
  }
}
Zombie()
}
drawSprites();
textSize(20)
fill("white")
text ("bullet= "+bullets,displayWidth-210,displayHeight/2-250)
text ("score= "+score,displayWidth-200,displayHeight/2-220)
text ("life= "+life,displayWidth-200,displayHeight/2-280)
if(GameState=="lose"){
  textSize(100)
  text("you lose",400,400)
  zombieGroup.destroyEach()
  player.destroy()
}
else if(GameState=="win"){
  textSize(100)
  text("you win",400,400)
  zombieGroup.destroyEach()
  player.destroy()
}
else if(GameState=="bullet"){
  textSize(100)
  text("bulletsover",400,400)
  zombieGroup.destroyEach()
  player.destroy()
}
}
  
function Zombie(){
if(frameCount%50===0){
  zomb=createSprite(random(500,1100),random(100,500),40,40)
  zomb.addImage(zombimg)
  zomb.scale=0.15
  zomb.debug=true
  zomb.velocityX=-3

  zomb.lifetime=400
  zomb.setCollider("rectangle",0,0,400,400)
  zombieGroup.add(zomb)
}


}




