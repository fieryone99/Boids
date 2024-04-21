let boidNum = 100;
let flockNum = 5;
let perceptionRadius = 40;
let alignmentFactor = 0.5;
let cohesionFactor = 0.25;
let seperationFactor = 0.3;
let maxSpeed = 4;
let minSpeed = 2;
let size = 7;
let boids = [];

let alignSlider, cohesionSlider, separationSlider;
function setup() {
  alignSlider = createSlider(0, 2, 0.5, 0.1);
  alignSlider.position(0, 0);
  cohesionSlider = createSlider(0, 2, 0.35, 0.1);
  cohesionSlider.position(140, 0);
  separationSlider = createSlider(0, 2, 0.4, 0.1);
  separationSlider.position(280, 0);
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);
    for (let i = 0; i < boidNum; i++) {
      let randomPos = createVector(random(width),                   random(height));
      let randomAcc = p5.Vector.random2D()
      .setMag(random(6));
      let flockID = floor(random(flockNum));
      let newBoid = new Boid(randomPos, randomAcc,flockID);
      newBoid.boidNum = boidNum;
      boids.push(newBoid); 
    }
}

function draw() {
  background(0);
  noStroke();
  for (let b = 0; b < boidNum; b++) {
    boids[b].show();
    boids[b].update();
  }
}
