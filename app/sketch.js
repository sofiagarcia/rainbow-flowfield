var inc = 0.1;
var scl = 10;
var cols, rows, canvas;
var nameInput, button;


var zoff = 0;

var particles = [];

var flowfield = [];

function setup() {
  background(255);
  canvas = createCanvas(300, 300);
  canvas.parent(canvasContainer);

  greeting = createElement('h2', 'what is your name?');

  nameInput = createInput();
  button = createButton("Submit");
  button.mousePressed(generateArt);

  cols = floor(width/scl);
  rows = floor(height/scl);

  flowfield = new Array(cols * rows);

  for (var i = 0; i < 200; i++){
    particles[i] = new Particle();
  }

}



function generateArt() {
      this.name = nameInput.value();
      greeting.html('hello '+ this.name +'!');
      this.letters = [];
      // this.letters = name.split('');

      for(var i = 0; i < this.name.length; i++){
            this.letters.push(
              this.name.charCodeAt(i)
            );
        //  );
      }
      console.log(this.letters);


      this.yoff = 0;

    for(var y = 0; y < rows; y++){
      this.xoff = 0;
      for(var x = 0; x < cols; x++) {
        this.index = (x + y * cols);
        this.angle = noise(this.xoff, this.yoff, zoff) * TWO_PI;
        this.v = p5.Vector.fromAngle(this.angle);
        this.v.setMag(1);
        flowfield[this.index] = this.v;
        this.xoff += inc;
        stroke(0, 50);

      }
      this.yoff += inc;
      this.zoff += 0.001;
    }
}

function draw(){

  for(var i = 0; i < particles.length; i++){
    particles[i].follow(flowfield);
    particles[i].update();
    particles[i].edges();
    particles[i].show();
  }

}
