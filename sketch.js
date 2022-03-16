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

function setup() 
{
  createCanvas(500,500);
  frameRate(80);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(200,490,600,20);
  rope = new Rope(5, {x:245, y:30});

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  
   fruit = Bodies.circle(300, 300, 20);
   //World.add(world, fruit);

   Composite.add (rope.body, fruit);
   connectFruit = new Link(rope, fruit);
}

function draw() 
{
  background(51);
  ground.show();
  rope.show();

  ellipse(fruit.position.x, fruit.position.y, 20, 20);
  
  Engine.update(engine);
}
