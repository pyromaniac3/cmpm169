// sketch.js - A personal art generator for you're truly. Featuring my own OC's and characters I know how to draw
// Author: Athena Patronas
// Date: 2/19/2024

const prompts = {
    "CharPrompts":[
            "#emotion.a.capitalize# #character.capitalize# #ing-words# in #location.a#.",
            "#character.capitalize# #pose# while holding #object.a#.",
            "While in the #location# #character.capitalize# #verb.ed# at #emotion.a# #character.capitalize#",
            "Lost in thought, #character.capitalize# gazed at the #object# lining the path.",
            "#character.capitalize# explored the hidden corners of the #location#.",
            "The #location# echoed with the sound of #object.s# as #character.capitalize# #verb.ed#."
                  ],
    "pose":[
          "lying down","looking to the side","pointing","squatting","standing tall",
          "hands in pockets","hand on hip","tapping their foot","nodding",
          "folding laundry","blowing a kiss","hands on knees",
          "taking a bow","shaking hands","double thumbs-up","holding a phone",
          "resting on elbow"],
    "character": [
            "sailor Moon", "klaus", "bean Man","lupe","misra","hatsune Miku",
            "vampire","dragon","popstar","student","girl","boy","they",
            "sebastian","oliver","akko","berry"
                 ],
    "emotion":[
            "exhausted", "entralled", "pissed off","horrified","reluctant","optimistic","brave",
            "sour","indifferent","cool","sweet","sadistic","animated",
            "disgruntled","charming","flirty","embarrassed"
              ],
    "verb":[
            "blush","apologize","stare","glance",
            "bark","shrug","wink","salute","frown","smile","laugh",
            "sigh","grin","nudge","giggle","cringe","scoff","gaze","gape",
            "gesture","whisper","squint","grimace"
           ],
    "ing-words":[
            "running","laughing","whispering","smiling","jumping",
            "thinking","sleeping","eating","dancing","drinking",
            "typing","singing","reading","walking","swimming","partying"
                ],
    "object":[
            "lamp","book","chair","table","guitar","umbrella","camera","phone", 
            "plant","clock","mirror","shoe","hat","wallet","keychain","candle", 
            "painting","basket","globe","pillow","pen","notebook", 
            "plate","sketchbook","remote","scarf","vase","keyboard"
             ],
    "location":[
            "cabin","bedroom","office","cubicle","study room",
            "restaurant","forest","coffee shop", "movie theater", 
            "park bench","library","grocery store","gym","beach","museum","cozy cafe", 
            "art gallery","vintage shop","local bakery","bookstore","botanical garden", 
            "thrift store","yoga studio","record store","farmers market","food truck", 
            "karaoke bar","rooftop bar","arcade","ice cream shop","concert venue", 
            "pet store","bike trail","teahouse","flower shop","city park","skatepark"
               ]
  };

let grammar;
let gamePlayed = false;

let stars = [];
const numStars = 200;
const maxStarSize = 5;

function setup() {
  grammar = createTraceryGrammar();
  canvasContainer = $("#canvas-container");
  let canvas = createCanvas(canvasContainer.width(), canvasContainer.height());
  canvas.parent("canvas-container");
  // resize canvas is the page is resized
  $(window).resize(function () {
    console.log("Resizing...");
    resizeCanvas(canvasContainer.width(), canvasContainer.height());
  });
  
  for (let i = 0; i < numStars; i++) {
    stars.push(new Star());
  }
}

function draw() {
  console.log(height);
  if(!gamePlayed){
    // colors for things and bg
    background(0);
    stroke(255);
    fill(255);
    
    // menu text stats
    textSize(40);
    textWrap(WORD);
    textAlign(CENTER);
    text("ATHENA'S ART PROMPT GENERATOR", width/2-150, height/4,300);
    
    // button + text stats
    stroke(179,169,198);
    fill(179,169,198);
    rect(width/2-100, height-200, 200, 55, 10);
    fill(255);
    textSize(30);
    text("click to start",width/2, height-160);
    // stars twinkling
    for (const star of stars) {
    star.display();
    }
  }else{
    
    // button + text prompt stats
    if(keyIsPressed){
      stroke(139,131,154);
      fill(139,131,154);
    }else{
      stroke(179,169,198);
      fill(179,169,198);
    }
    rect(width/2-100, height-200, 200, 55, 10);
    fill(255);
    textSize(30);
    text("new prompt",width/2, height-160);
  }
  
}
function keyPressed(){
  // mouse clicked AND at x position
  // what if i did number mapping instead?
  gamePlayed = true;
  clear();
  background(251,250,252);
  newOut = flattenGrammar();
  stroke(0);
  fill(0);
  textSize(20);
  textWrap(WORD);
  text(newOut, width/2-200, height/4,400);
}

function createTraceryGrammar() {
  return tracery.createGrammar(prompts);
}

function flattenGrammar() {
  return grammar.flatten("#CharPrompts#");
}

class Star {
  // From Mascaria on Open Processing: 
  // https://openprocessing.org/sketch/1986668 
  constructor() {
    this.position = createVector(random(width), random(height));
    this.size = random(1, maxStarSize);
    this.brightness = random(100, 255);
  }

  display() {
    fill(this.brightness);
    ellipse(this.position.x, this.position.y, this.size);

    // Introduce twinkling effect
    if (random() > 0.8) {
      this.brightness = random(100, 255);
    }
  }
}