
const rad = 30;
const cube = {x: 200, y: 200, z: 200};
let rX = 0, rY = 0, rZ = 0;
let rotateCube = true;
let shrek, knocking, swamp;
let counter =0;
let redColor = 0;

function preload(){
    shrek = loadModel('./assets/Shrek.obj');
    knocking = loadSound('./assets/knocking.mp3');
    swamp = loadImage('./assets/swamp.png');
}

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    blendMode(ADD);
    background(0);    
}

function draw() {
    clear();
    background(0);
    tint(redColor,0,0);
    image(swamp, -windowWidth / 2, -windowHeight / 2, windowWidth, windowHeight);
    
    if (rotateCube) {
        rX += 0.03;
        rY += 0.03;
        rZ += 0.03;
        rotateX(rX);
        rotateY(rY);
        rotateZ(rZ);
    } else {
        rotateX(rX);
        rotateY(rY);
        rotateZ(rZ);
    }

    orbitControl(0, 0);
    noFill();
    stroke(255);

    if (mouseIsPressed) {
        rotateCube = false;
        counter+=1;
        knocking.play();
        redColor+=10;
    }
    
    box(cube.x + rad * 2, cube.y + rad * 2, cube.z + rad * 2);
    
    normalMaterial();
    scale(2);
    model(shrek);
    
    if (!rotateCube && frameCount % 30 == 0) {
        rotateCube = true;
    }
    
    for(let i = 0; i<=counter; i++){
        push();
        translate(random(-width / 2, width / 2), random(-height / 2, height / 2), random(-200, 200));
        model(shrek);
        pop();
    }
    
}
