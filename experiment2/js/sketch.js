// sketch.js - Perlin Noise generative art. Press any key to make more noise!!
// Author: Athena Patronas
// Date: 1/22/24

let xoff = 0;
let yoff = 0;
let xoff2 = 0;
let yoff2 = 0;
let shapes = [];
let change = false;

function setup() {
  // place our canvas, making it fit our container
  canvasContainer = $("#canvas-container");
  let canvas = createCanvas(canvasContainer.width(), canvasContainer.height());
  canvas.parent("canvas-container");
  // resize canvas is the page is resized
  $(window).resize(function() {
      console.log("Resizing...");
      resizeCanvas(canvasContainer.width(), canvasContainer.height());
  });
  background(255); // black background
}

function draw() {
  // Display all shapes
  for (let i = 0; i < shapes.length; i++) {
    shapes[i].display();
  }
  background(0,0,0,2); // gives a cool echo effect
}

function keyPressed() {
  // Set addShape to true when any key is pressed
  addShape();
}

function addShape() {
  // Create a new Shape object and add it to the shapes array
  shapes.push(new Shape(change));
  change = !change
}
class Shape {
  constructor(change) {
    // choose a random color and location for the shape
    this.color = color(random(255), random(255), random(255));
    this.left = random(1,10);
    this.right = random(1,10);
    this.switch = change; // every shape toggles between left and right rotation
    this.xoff = 0; 
    this.yoff = 0;
  }

  display() {
    // Display the shape
    stroke(this.color);
    noFill();
    push(); // Save the current transformation state
    if(this.switch){
      // Rotate to the Left
      translate(width / this.left, height / this.right); // Translate
      rotate(radians(frameCount % 360)); // Rotate around the left side
      beginShape();
      this.yoff = -height / 2;
      for (let y = 0; y <= height; y += 10) {
        let x = map(noise(this.yoff, this.xoff), 0, 1, 0, width / 2);
        vertex(x, y);
        this.yoff += 0.1;
      }
      this.xoff += 0.01;
    }else{
      // Rotate to the right
      stroke(this.color);
      noFill();
      push(); // Save the current transformation state
      translate((3 * width) / this.left, height / this.right); // Translate to the right side
      rotate(-radians(frameCount % 360)); // Rotate around the right side
      beginShape();
      this.xoff = -width / 2;
      for (let x2 = 0; x2 <= width / 2; x2 += 10) {
        let y2 = map(noise(this.xoff, this.yoff), 0, 1, 0, height);
        vertex(x2, y2);
        this.xoff += 0.1;
      }
      this.yoff += 0.01;
    }
    endShape();
    pop(); // Restore the previous transformation state
  }
}