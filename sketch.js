const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground;
var fruit, star, star2, rope, rope2, rope3;
var connectFruit, connectFruit2, connectFruit3;
var rabbit;
var backGround, rabbitImg, fruitImg, starImg, eatAnim, sadAnim, blinkAnim;
var airSound, eatSound, ropeSound, backgroundSound;
var button_cut, button_cut2, button_cut3, button_mute, blower_button;
var isMobile;
var canH, canW;
function preload(){
  rabbitImg = loadImage("./images/Rabbit-01.png");
  backGround = loadImage("./images/background.png");
  fruitImg = loadImage("./images/melon.png");
  starImg = loadImage("./images/star.png");
  eatAnim = loadAnimation("./images/eat_0.png", "./images/eat_1.png", "./images/eat_2.png", "./images/eat_3.png", "./images/eat_4.png");
  sadAnim = loadAnimation("./images/sad_1.png", "./images/sad_2.png", "./images/sad_3.png");
  blinkAnim = loadAnimation("./images/blink_1.png", "./images/blink_2.png" , "./images/blink_3.png", "./images/blink_2.png");
  airSound = loadSound("./sound/air.wav");
  eatSound = loadSound("./sound/eating_sound.mp3");
  ropeSound = loadSound("./sound/rope_cut.mp3");
  backgroundSound = loadSound("./sound/sound1.mp3");
  eatAnim.frameDelay = 20;
  eatAnim.looping = false;
  sadAnim.frameDelay = 20;
  sadAnim.looping = false;
  blinkAnim.frameDelay = 20;
}

function setup() {
  isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if (isMobile) {
    createCanvas(displayWidth,displayHeight);
    canH = displayHeight;
    canW = displayWidth;
  }else {
    createCanvas(600,700);
    canH = 700;
    canW = 600;
  }

  
  frameRate(80);
  backgroundSound.play();
  backgroundSound.setVolume(0.5);
  // width height
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(canW/2,canH-10,canW,20);
  rope = new Rope(7, {x: 100, y:90});
  rope2 = new Rope(7, {x:canW - 100, y:90});
  //rope3 = new Rope(4, {x:canW - 100, y:225});
  

  rabbit = createSprite(170, canH-85, 80, 80);
  rabbit.addAnimation("blink", blinkAnim);
  rabbit.addAnimation("eat", eatAnim);
  rabbit.addAnimation("sad", sadAnim);
  rabbit.scale = 0.2;

  star = createSprite(300, 50, 30, 30);
  star2 = createSprite(60, 350, 30, 30);
  star.addImage(starImg);
  star2.addImage(starImg);
  star.scale = 0.02;
  star2.scale = 0.02;

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  
  fruit = Bodies.circle(300, 250, 20);
  //World.add(world, fruit);

  Composite.add (rope.body, fruit);
  connectFruit = new Link(rope, fruit);
  connectFruit2 = new Link(rope2, fruit);
  //connectFruit3 = new Link(rope3, fruit);


  button_cut = createImg("./images/cut_btn.png");
  button_cut.position(90, 90);
  button_cut.size(50,50);
  button_cut.mouseClicked(drop);


  button_cut2 = createImg("./images/cut_btn.png");
  button_cut2.position(canW - 130, 90);
  button_cut2.size(50,50);
  button_cut2.mouseClicked(drop2);

  //button_cut3 = createImg("./images/cut_btn.png");
  //button_cut3.position(canW - 140, 200);
  //button_cut3.size(50,50);
  //button_cut3.mouseClicked(drop3);

  button_mute = createImg("./images/mute.png");
  button_mute.position(width-80, 30);
  button_mute.size(50,50);
  button_mute.mouseClicked(muteSound);

   blower_button = createImg("./images/baloon2.png");
   blower_button.position(240, 280);
   blower_button.size(100,150);
   blower_button.mouseClicked(airBlow)

}

function draw() {
  image(backGround, 0, 0, canW, canH);
  //background(51);
  ground.show();
  rope.show();
  rope2.show();
  ///rope3.show();
  if(fruit){
    push();
    imageMode(CENTER);
    image(fruitImg, fruit.position.x, fruit.position.y, 80, 80);
    pop();
  }

  //ellipse(fruit.position.x, fruit.position.y, 20, 20);

  if(collide(rabbit, fruit)) {
    rabbit.changeAnimation("eat");
    eatSound.play();
  }
  if(fruit){
    var collided = Matter.SAT.collides(fruit, ground.body);
    if(collided.collided){
      rabbit.changeAnimation("sad");
      World.remove(world,fruit);
      fruit = null;
    }
  }

  Engine.update(engine);
  drawSprites();
}


function drop() {
  rope.break();
  connectFruit.detach();
  connectFruit = null;
  ropeSound.play();
}

function drop2() {
  rope2.break();
  connectFruit2.detach();
  connectFruit2 = null;
  ropeSound.play();
}

//function drop3() {
  //rope3.break();
  //connectFruit3.detach();
  //connectFruit3 = null;
  //ropeSound.play();
//}

function collide(elementA, elementB) {
  if(elementA && elementB) {
    var diff = dist(elementA.position.x, elementA.position.y, elementB.position.x, elementB.position.y);

    if(diff < 80) {
      World.remove(world, fruit);
      fruit = null;
      return true;
    } else {
      return false;
    }
  }
}

function muteSound() {
  if(backgroundSound.isPlaying()) {
    backgroundSound.stop();
  } else {
    backgroundSound.play();
  }
}

function airBlow(){
  Body.applyForce(fruit, {x: 0, y:0}, {x:0, y:-0.02});
  airSound.play();
}