function Particle() {

  this.pos = createVector(random(letters[2]), random(letters[0]));
  this.vel = createVector(0, 0);
  this.acc = createVector(random(letters[1]/100), 0);
  this.maxspeed = 3;

  this.prevPos = this.pos.copy();

  this.update = function() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxspeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  this.follow = function(vectors) {
    var x = floor(this.pos.x / scl);
    var y = floor(this.pos.y / scl);
    var index = x + y * cols;
    var force = vectors[index];
    this.applyForce(force);
  }

  this.applyForce = function(force){
    this.acc.add(force);
  }

  this.show = function() {
    this.r = map(letters[0], 65, 122, -50, 100);
    this.g = map(letters[1], 65, 122, -50, 100);
    this.b = map(letters[2], 65, 122, -50, 100);
    stroke(this.pos.x + (this.r/3), this.pos.y - (this.g/3), ((this.pos.x + this.pos.y)/2)*this.b/3);
    // stroke(this.pos.x, this.pos.y - random(letters[1]), letters[0]-(this.pos.y/2), 27);
    strokeWeight(2.2);
    line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
    this.updatePrev();

  }

  this.updatePrev = function(){
    this.prevPos.x = this.pos.x;
    this.prevPos.y = this.pos.y;
  }

  this.edges = function() {
    if (this.pos.x > width) {
      this.pos.x = 0;
      this.updatePrev();

    }
    if (this.pos.x < 0) {
      this.pos.x = width;
      this.updatePrev();
    }
    if (this.pos.y > height) {
      this.pos.y = 0;
      this.updatePrev();
    }
    if (this.pos.y < 0) {
      this.pos.y = height;
      this.updatePrev();
    }
  }
}
