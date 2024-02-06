const imageDB = [
  {name: "drummerGirl",
    file: "./images/DrummerGirl.gif",
    position: {x:-1, y:0.5}},
  {name: "micGirl",
    file: "./images/VocalGirl.gif",
    position: {x:1, y:0.5}},
  {name: "triangleGirl",
    file: "./images/triangleGirl.gif",
    position: {x:0, y:0.5}},
  {name: "drumStill",
    file: "./images/drumGirl.png",
    position: {x:-1, y:0.5}},
  {name: "micStill",
    file: "./images/micGirl.png",
    position: {x:1, y:0.5}},
  {name: "triangleStill",
    file: "./images/triangleGirl.png",
    position: {x:0, y:0.5}},
];

let sound1, sound2, sound3;
let drum, mic, tri;
let drumGirl, micGirl, triGirl;
let drumGirlGif, micGirlGif, triGirlGif;
let images = [];
let characters = [];
let xVanish, yVanish, zVanish;
let cam;
let step = 20; // changes the speed they come forward
let distance = 3000; // affects how far the camera is 
let bg;
let drumTrue, micTrue, triTrue = false;
let currentDrumVolume = 0;
let currentMicVolume = 0;
let currentTriVolume = 0;

function preload() {
  // symbols 
  for (var i = 0; i < imageDB.length; i++) {
    images.push(loadImage(imageDB[i].file));
  }
  sound1 = loadSound("./audio/drums.mp3");
  sound2 = loadSound("./audio/mic.mp3");
  sound3 = loadSound("./audio/triangle.mp3");

  drum = loadImage("./images/drums.png");
  mic = loadImage("./images/mic.png");
  tri = loadImage("./images/triangle.png");

  // backgrounds
  bg = loadImage("./images/stage.jpg");
}

function setup() {
  // place our canvas, making it fit our container
  canvasContainer = $("#canvas-container");
  let canvas = createCanvas(canvasContainer.width(), canvasContainer.height(),WEBGL);
  canvas.parent("canvas-container");
  // resize canvas is the page is resized
  $(window).resize(function () {
    console.log("Resizing...");
    resizeCanvas(canvasContainer.width(), canvasContainer.height());
  });

  gl = this._renderer.GL;
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

  // Resize the images to 1/4 of their original size
  mic.resize(mic.width / 6, mic.height / 6);
  tri.resize(tri.width / 6, tri.height / 6);
  drum.resize(drum.width / 6, drum.height / 6);

  background(255);
  xVanish = 0;  // width / 2;
  yVanish =  0;  // -height / 2;
  zVanish = distance;
  field = new Field(step);
  field.draw();
}

function draw() {
  background(255);
  field.draw();
}

function mousePressed() {
  let select = int(mouseX / (width / 3));
  if (select == 0) {
    console.log("mic clicked");
    micTrue = true;
  }
  if (select == 1) {
    console.log("triangle clicked");
    triTrue = true;
  }
  if (select == 2) {
    console.log("drums clicked");
    drumTrue = true;
  }
}

class Character {
  constructor(name, img, xpos, ypos) {
    this.name = name;
    this.img = img;
    this.w = img.width * 1.5;
    this.h = img.height * 1.5;
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.startX = xpos;
    this.startY = ypos;
  }
  locate(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
  move(step) {
    this.z -= step;
  }
  draw() {
    push();
    noStroke();
    translate(this.x, this.y, this.z);
    // fill(0,0,0,0);
    texture(this.img);
    scale(-1, 1);
    plane(this.w, this.h);
    pop();
  }
}

class Camera {
  constructor(x, y, z, xVanish, yVanish, zVanish) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.xVanish = xVanish;
    this.yVanish = yVanish;
    this.zVanish = zVanish;
    perspective(60, width / height, 0.1, distance * 2);
    camera(this.x, this.y, this.z, this.xVanish, this.yVanish, this.zVanish, 0, -1, 0);
  }
  update() {
    camera(this.x, this.y, this.z, this.xVanish, this.yVanish, this.zVanish, 0, -1, 0);
  }
}

class Field {
  constructor(step) {
    this.step = step;
    this.characters = [];

    for (let i = 0; i < imageDB.length; i++) {
      var newChar = new Character(imageDB[i].name, images[i], imageDB[i].position.x, imageDB[i].position.y);
      let z = int((distance / imageDB.length) * (i + 1));
      this.placeChar(newChar, 800);
      this.characters.push(newChar);
    }
    this.cam = new Camera(0, 0, -100, xVanish, -yVanish, zVanish);
  }

  drawBackground() {
    push();
    noStroke();
    translate(0, 0, distance + 1);
    texture(bg);
    scale(75);
    plane(width, height);
    pop();
  }

  placeChar(char, z) {
    let x = int(char.startX * width);
    let y = int(char.startY * height);
    // Offset the initial y position based on the character's image height
    y -= char.img.height / 4;

    // Set the initial location of the character
    char.locate(x, y, z);
  }

  draw() {
    this.drawBackground();
    if (drumTrue) {
      if (this.characters[3].z > 200) {
        this.characters[3].draw();
        this.characters[3].move(this.step);
      } else {
        this.characters[0].z = 200;
        this.characters[0].draw();
      }
      if (!sound1.isPlaying()) {
        sound1.play();
        sound1.setVolume(currentDrumVolume);
      } else {
        if (currentDrumVolume < 2.5) {
          currentDrumVolume += 0.01;
          sound1.setVolume(currentDrumVolume);
        } else {
          sound1.setVolume(currentDrumVolume);
        }
      }
    }
    if (micTrue) {
      if (this.characters[4].z > 200) {
        this.characters[4].draw();
        this.characters[4].move(this.step);
      } else {
        this.characters[1].z = 200;
        this.characters[1].draw();
      }
      if (!sound2.isPlaying()) {
        sound2.play();
        sound2.setVolume(currentMicVolume);
      } else {
        if (currentMicVolume < 1) {
          currentMicVolume += 0.01;
        }
        sound2.setVolume(currentMicVolume);
      }
    }
    if (triTrue) {
      if (this.characters[5].z > 100) {
        this.characters[5].draw();
        this.characters[5].move(this.step);
      } else {
        this.characters[2].z = 100;
        this.characters[2].draw();
      }
      if (!sound3.isPlaying()) {
        sound3.play();
        sound3.setVolume(currentTriVolume);
      } else {
        if (currentTriVolume < 1) {
          currentTriVolume += 0.01;
        }
        sound3.setVolume(currentTriVolume);
      }
    }
    // Display the images from left to right
    image(mic, width-400, 100);
    image(tri, -200, 100);
    image(drum, -width+100, 100);
  }
}
