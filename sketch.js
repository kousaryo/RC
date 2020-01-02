var pos;
var prev;
var particles=[];
var serial;          // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbserial-DN01DW79';  // fill in your serial port name here
var inData;
var inData2;


var Engine = Matter.Engine,
  // Render = Matter.Render,
  World = Matter.World,
  Bodies = Matter.Bodies;

var engine;
var world;
var circles = [];
var boundaries = [];

var ground;

var circleSize;

let extraCanvas;

function setup() {
  createCanvas(1440, 900,WEBGL);
    extraCanvas = createGraphics(1440,900);
    extraCanvas.clear();
    frameRate(16);
    pixelDensity(1);

    
  engine = Engine.create();
  world = engine.world;
  //Engine.run(engine);
    
serial = new p5.SerialPort();       // make a new instance of the serialport library
serial.on('list', printList);  // set a callback function for the serialport list event
serial.on('connected', serverConnected); // callback for connecting to the server
serial.on('open', portOpen);        // callback for the port opening
serial.on('data', serialEvent);     // callback for when new data arrives
serial.on('error', serialError);    // callback for errors
serial.on('close', portClose);      // callback for the port closing
serial.list();                      // list the serial ports
serial.open(portName); 
    

//  boundaries.push(new Boundary(150, 200, width * 0.6, 20, 0.3));
//  boundaries.push(new Boundary(250, 300, width * 0.6, 20, -0.3));
    circleA=new CircleA(400, 450, 50);
    World.add(world, circleA);
}

// function keyPressed() {
//   if (key == ' ') {
//   }
// }

 function mouseDragged() {
   circles.push(new Circle(mouseX, mouseY, random(10, 40),random(255)));
 }

function draw() {
    
    var brightness = map(inData2, 0, 255, 0, 255);
  background(brightness);
    translate(-windowWidth/2,-windowHeight/2);
    

    circleA.show();
    
var g=random(-0.3,0.3);
    var gx=random(-0.3,0.3);
    engine.world.gravity.y = g;
    engine.world.gravity.x = gx;
    
  Engine.update(engine);
  for (var i = 0; i < circles.length; i++) {
    circles[i].show();
    if (circles[i].isOffScreen()) {
      circles[i].removeFromWorld();
      circles.splice(i, 1);
      i--;
    }
  }
  for (var i = 0; i < boundaries.length; i++) {
    boundaries[i].show();
  }
console.log(inData);
    console.log(inData2);
   //console.log(circles.length, world.bodies.length);
image(extraCanvas,0,0);
}

function CircleA(x,y,d){
    var options = {
    friction: 0,
    restitution: 0.95
  }
  this.body = Bodies.circle(x, y, d, options);
  this.d = d;
  World.add(world, this.body);

  this.show = function() {
    var pos = this.body.position;
    var angle = this.body.angle;
      var circleSize = map(inData, 0, 255, 1, 4);
    push();
    translate(pos.x, pos.y);
    rotate(angle);
    rectMode(CENTER);
    fill(random(100,200),random(10,20),random(20,30),random(150,160));
    stroke(random(153,179),0,0,random(190,210));
    ellipse(0, 0, this.d * 2,this.d * 2);
    strokeWeight(2);
    stroke(random(100,130),random(10,15),random(5,10),random(80,90));
    fill(random(130,200),random(20,30),random(30,40)*circleSize,random(160,180));
    ellipse(0, 0, this.d*circleSize);
//    strokeWeight(1);
//    stroke(255);
//    fill(127);
//    ellipse(0, 0, this.r * 2);
    pop();
  }
    
}

function printList(portList) {
// portList is an array of serial port names
for (var i = 0; i < portList.length; i++) {
// Display the list the console:
print(i + " " + portList[i]);
 }
}
function serverConnected() {
print('connected to server.');
}
function portOpen() {
print('the serial port opened.')
}
function serialEvent() {
  inData = Number(serial.read());
    //inData2 = Number(serial.read());
}
function serialError(err) {
print('Something went wrong with the serial port. ' + err);
}
function portClose() {
print('The serial port closed.');
}