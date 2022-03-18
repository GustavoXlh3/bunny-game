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
var backGround, rabbitImg, fruitImg;

function preload(){
rabbitImg = loadImage("./images/Rabbit-01.png");
backGround = loadImage("./images/background.png");
fruitImg = loadImage("./images/melon.png");
}

function setup() {
  createCanvas(500,500);
  frameRate(80);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(200,490,600,20);
  rope = new Rope(5, {x:245, y:30});

  rabbit = createSprite(250, 430, 80, 80);
  rabbit.addImage(rabbitImg);
  rabbit.scale = 0.2;

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  
   fruit = Bodies.circle(300, 300, 20);
   //World.add(world, fruit);

   Composite.add (rope.body, fruit);
   connectFruit = new Link(rope, fruit);
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
