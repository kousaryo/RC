function Circle(x, y, r) {
  var options = {
    friction: 0,
    restitution: 0.95
  }
  this.body = Bodies.circle(x, y, r, options);
  this.r = r;
  World.add(world, this.body);

  this.isOffScreen = function() {
    var pos = this.body.position;
    return(pos.y > height||pos.y<0);   
  }

  this.removeFromWorld = function() {
    World.remove(world, this.body);
  }

  this.show = function() {
    var pos = this.body.position;
    var angle = this.body.angle;
    push();
    translate(pos.x, pos.y);
    rotate(angle);
    rectMode(CENTER);
      strokeWeight(4);
    fill(random(100,200),random(10,20),random(20,30),random(200,210));
    stroke(random(153,179),0,0,random(200,210));
    ellipse(0, 0, this.r * 2*random(0.95,1.05),this.r * 2*random(0.9,1.1));
    strokeWeight(3);
    stroke(random(100,110),random(10,15),random(5,10),random(80,90));
    fill(random(130,200),random(20,30),random(30,40),random(160,180));
    ellipse(0, 0, this.r);
//    strokeWeight(1);
//    stroke(255);
//    fill(127);
//    ellipse(0, 0, this.r * 2);
    pop();
  }

}