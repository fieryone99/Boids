let boidNum = 140;
let perceptionRadius = 60;
let alignmentFactor = 0.5;
let cohesionFactor = 0.25;
let seperationFactor = 0.3;
let maxSpeed = 4;
let minSpeed = 2;
let size = 7;
let boids = [];

let alignSlider, cohesionSlider, separationSlider;
let regenerateButton;
function setup() {
  alignSlider = createSlider(0, 2, 0.7, 0.1);
  alignSlider.position(0, 0);
  cohesionSlider = createSlider(0, 2, 0.57, 0.1);
  cohesionSlider.position(140, 0);
  separationSlider = createSlider(0, 2, 0.6, 0.1);
  separationSlider.position(280, 0);
  regenerateButton = createButton('regnerate boids');
  regenerateButton.position(windowWidth - 100, 10);
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);
  randomBoids();
}

function draw() {
  background(0);
  noStroke();
  regenerateButton.mousePressed(randomBoids);
  alignmentFactor = alignSlider.value();
  cohesionFactor = cohesionSlider.value();
  seperationFactor = separationSlider.value();
  for (let b = 0; b < boidNum; b++) {
    boids[b].show();
    boids[b].update();
  }
}

randomBoids() {
  boids.length = 0;
  flockNum = floor(random(7));
for (let i = 0; i < boidNum; i++) {
      let randomPos = createVector(random(width), random(height));
      let randomAcc = p5.Vector.random2D()
      .setMag(random(6));
      let flockID = floor(random(flockNum));
      let newBoid = new Boid(randomPos, randomAcc,flockID);
      newBoid.boidNum = boidNum;
      boids.push(newBoid); 
    }
}
