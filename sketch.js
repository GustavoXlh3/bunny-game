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
var fruit, rope;
var connectFruit;
var rabbit;
var backGround, rabbitImg, fruitImg, eatAnim, sadAnim, blinkAnim;
var button_cut;

function preload(){
rabbitImg = loadImage("./images/Rabbit-01.png");
backGround = loadImage("./images/background.png");
fruitImg = loadImage("./images/melon.png");
eatAnim = loadAnimation("./images/eat_0.png", "./images/eat_1.png", "./images/eat_2.png", "./images/eat_3.png", "./images/eat_4.png");
sadAnim = loadAnimation("./images/sad_1.png", "./images/sad_2.png", "./images/sad_3.png");
blinkAnim = loadAnimation("./images/blink_1.png", "./images/blink_2.png" , "./images/blink_3.png", "./images/blink_2.png");
eatAnim.frameDelay = 20;
eatAnim.looping = false;
sadAnim.frameDelay = 20;
sadAnim.looping = false;
blinkAnim.frameDelay = 20;
}

function setup() {
  createCanvas(500,500);
  frameRate(80);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(200,490,600,20);
  rope = new Rope(5, {x:245, y:30});

  rabbit = createSprite(250, 430, 80, 80);
  rabbit.addAnimation("blink", blinkAnim);
  rabbit.addAnimation("eat", eatAnim);
  rabbit.addAnimation("sad", sadAnim);
  rabbit.scale = 0.2;

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  
   fruit = Bodies.circle(300, 250, 20);
   //World.add(world, fruit);

   Composite.add (rope.body, fruit);
   connectFruit = new Link(rope, fruit);

   button_cut = createImg("./images/cut_btn.png");
   button_cut.position(225, 30);
   button_cut.size(50,50);
   button_cut.mouseClicked(drop);

}

function draw() {
  image(backGround, 0, 0, width, height);
  //background(51);
  ground.show();
  rope.show();
  push();
  imageMode(CENTER);
  image(fruitImg, fruit.position.x, fruit.position.y, 80, 80);
  pop();

  //ellipse(fruit.position.x, fruit.position.y, 20, 20);
  
  Engine.update(engine);
  drawSprites();
}


function drop() {
  rope.break();
  connectFruit.detach();
  connectFruit = null;
}