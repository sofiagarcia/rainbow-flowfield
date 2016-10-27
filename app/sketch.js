var inc = 0.1;
var scl = 10;
var cols, rows, canvas;
var nameInput, button;

var zoff = 0.1;

var particles = [];
var flowfield = [];

function setup() {
  background(255);
  canvas = createCanvas(windowWidth, 300);
  canvas.parent(canvasContainer);
  greeting = createElement('h2', 'what is your name?');
  greeting.style("font-family:sans-serif; font-weight:200; text-align:center; margin:2% auto;");

  nameInput = createInput();
  nameInput.style("text-align:center; background-color:#fff; color: black; border:1px solid #172847; border-radius:3%; display:block; margin:2.3% auto; padding: 1%; box-shadow: 0 3px 4px rgba(0,0,0,0.16), 0 3px 5px rgba(0,0,0,0.23);");
  button = createButton("Generate!");
  button.mousePressed(nameValue);
  button.style("text-align:center; background-color:#172847; color:white; font-weight:300; border:none; display:block; margin:1% auto; padding:1% 2%; box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);");

  cols = floor(width/scl);
  rows = floor(height/scl);

  flowfield = new Array(cols * rows);

  for (var i = 0; i < 200; i++){
    particles[i] = new Particle();
  }

}
var letters = [];
function nameValue(name){
  this.name = nameInput.value();
  greeting.html('Hello, '+ this.name +'!');

  for(var i = 0; i < this.name.length; i++){
        letters.push(
        this.name.charCodeAt(i)
      );
    }

    createField();
  }

  console.log(letters);

function createField(){
    this.yoff = 0;
    for(var y = 0; y < rows; y++){
      this.xoff = 0;
      for(var x = 0; x < cols; x++) {
        this.index = (x + y * cols);
        this.angle = noise(this.xoff, this.yoff, zoff) * TWO_PI;
        this.v = p5.Vector.fromAngle(this.angle);
        this.v.setMag(1);
        flowfield[this.index] = this.v;
        this.xoff += inc+(letters[0]/100);
        stroke(50, 50);
    }
    this.yoff += inc+(letters[1]/100);
    this.zoff += 0.001 * (letters[2]/1000);
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

function mousePressed() {

}
