// sketch.js - purpose and description here
// Author: Your Name
// Date:

let xoff = 0; // both controls randomness of the noise
let yoff = 0;
let canvasContainer;

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
  background(0);
}

function draw() {
  building();
  /*for(let i = 0; i < 10; i++){
    building();
  }*/
  // click on the screen to make a building there 
}

function building(){
  stroke(255); // setting stroke color to white
  noFill(); // won't fill between the strokes
  beginShape(); 
  let xoff = 0; 
  for (let x = 0; x <= width; x += 10) { 
    let xNoise = map(noise(xoff), 0, 1, 0, width); // this is whats making it not be the whole width
    let y = map(noise(yoff), 0, 1, height, 0); // Generate a y-coordinate using noise
    vertex(xNoise, y); // create a vertex from the x and y-coordinate
    xoff += 0.01; // change the number to change the pattern
  }
  yoff += 0.01;
  endShape();
}