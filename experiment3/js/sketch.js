// sketch.js - A repeating wave of colors through a grid of slug icons that react to your mouse.
// Author: Athena Patronas
// Date: 1/29/24

// Initial Code Copyright:
// Generative Gestaltung – Creative Coding im Web
// ISBN: 978-3-87439-902-9, First Edition, Hermann Schmidt, Mainz, 2018
// Benedikt Groß, Hartmut Bohnacker, Julia Laub, Claudius Lazzeroni
// with contributions by Joey Lee and Niels Poldervaart
// Copyright 2018
//
// http://www.generative-gestaltung.de

/**
 * shapes in a grid, that are always facing the mouse
 *
 * MOUSE
 * position x/y        : position to face
 * click               : change color // Athena's addition
 *
 * KEYS
 * arrow up/down       : scale of shapes
 * arrow left/right    : additional rotation of shapes
 * d                   : toggle size depending on distance
 * g                   : toggle grid resolution
 * s                   : save png
 */
'use strict';

var tileCount = 10;
var tileWidth;
var tileHeight;
var shapeSize = 50;
var newShapeSize = shapeSize;
var shapeAngle = 0;
var currentShape;
var shapes;
var n = 2;
var i = 0;
var sizeMode = 0;

function preload() {
  shapes = [];
  shapes.push(loadImage('./asset/test.png'));
}

function setup() {
  createCanvas(1200, 600);
  //imageMode(CENTER);
  // set the current shape to the first in the array
  currentShape = shapes[0];
  tileWidth = width / tileCount;
  tileHeight = height / tileCount;
}

function draw() {
  // clears previous frame
  clear();
  
  // building the grid each frame
  for (var gridY = 0; gridY < tileCount; gridY++) {
    for (var gridX = 0; gridX < tileCount; gridX++) {
      
      // finding the position of each tile and setting it's 
      // origin to the center
      var posX = tileWidth * gridX + tileWidth / 2;
      var posY = tileHeight * gridY + tileWidth / 2;

      // calculate angle between mouse position and actual 
      // position of the shape
      var angle = atan2(posY - mouseY, posX - mouseX) + (shapeAngle * (PI / 180));
      //centers the mouse between the tile and the mouse positions
      var distance = dist(mouseX, mouseY, posX, posY);
      
      // this changes the position of the tile depending on if 
      // the setting has changed Different size modes just mean that the items around the 
      // mouse are smaller or bigger than normal. Giving a fish eye'd lens
      if (sizeMode == 0) newShapeSize = shapeSize;
      if (sizeMode == 1) newShapeSize = shapeSize * 1.5 - map(dist(mouseX, mouseY, posX, posY), 0, 500, 5, shapeSize);
      if (sizeMode == 2) newShapeSize = map(dist(mouseX, mouseY, posX, posY), 0, 500, 5, shapeSize);

      push();
      translate(posX, posY);
      rotate(angle);
      noStroke();
      
      // code I added to create the radius tint effect.
      if (distance < n * tileWidth / 2) {
        colorWheel(distance,i);
      } else {
        noTint();
      }
      
      image(currentShape, 0, 0, newShapeSize, newShapeSize);
      pop();
    }
  }
  
  // holds the color for a few frames before expanding
  if(frameCount % 30 == 0){
    if(n>64){
      n = 2;
    }else{
      n=n*2;
    }
  }
}

function mousePressed(){
  //increase index for color palette on mouse click
  if(i==2){
    i=0;
  }else{
    i++;
  }
}

function colorWheel(distance,i){
  // this function will set the color of the gradient
  let tintFactor = map(distance, 0, n * tileWidth/4, 255, 0);
  if(i==0){
    tint(255,tintFactor,0);
  }else if(i==1){
    tint(tintFactor,255,0);
  }else if(i==2){
    tint(tintFactor,0,255);
  }
}

function keyReleased() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
  if (key == 'd' || key == 'D') sizeMode = (sizeMode + 1) % 3;
  if (key == 'g' || key == 'G') {
    tileCount += 5; // how many extra tiles for width and height
    if (tileCount > 20) {
      tileCount = 10;
    }
    
    tileWidth = width / tileCount; 
    tileHeight = height / tileCount;
  }
  
  // changes the size and rotation of the shape
  if (keyCode == UP_ARROW) shapeSize += 5;
  if (keyCode == DOWN_ARROW) shapeSize = max(shapeSize - 5, 5);
  if (keyCode == LEFT_ARROW) shapeAngle += 5;
  if (keyCode == RIGHT_ARROW) shapeAngle -= 5;

}
