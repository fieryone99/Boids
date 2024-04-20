
class Boid {
  
  constructor(pos, acc, f_ID) {
    this.position = pos;
    this.acceleration = acc;
    this.velocity = createVector(0, 0);
    this.flockID = f_ID;
    this.maxForce = 0.2;
}
  
  show() {
    let hue = map(this.flockID, 0, flockNum, 0, 360);
    fill(hue, 95, 100, 95);
    push();
    let theta = this.velocity.heading() + radians(90);
    translate(this.position.x, this.position.y);
    rotate(theta);
    beginShape();
    vertex(0, -size);
    vertex(-size / 2, size);
    vertex(size / 2, size);
    endShape(CLOSE);
    pop();
  }
  
  update() {
    this.position = this.position.add(this.velocity);
    this.velocity = this.velocity.add(this.acceleration);
    this.acceleration = createVector(0, 0);
    this.containSpeed();
    this.applyForces();
    this.wrapAround();
  }
  
  applyForces() {
      let boidForce = new createVector();
      let alignmentForce = this.alignment()                         .mult(alignmentFactor);
      let cohesionForce = this.cohesion()
      .mult(cohesionFactor);
      let seperationForce = this.seperation()
      .mult(seperationFactor);
      
      boidForce.add(alignmentForce); 
      boidForce.add(cohesionForce);
      boidForce.add(seperationForce);
      
      this.acceleration.add(boidForce); 
  }
  
  alignment() {
    let steering = new createVector();
    let total = 0;
    for (let other of boids) {
      if(this.isVisible(other) && this.flockID==other.flockID) {
        steering.add(other.velocity);
        total++;
      }
    }
    if (total > 0) {
      steering.div(total);
      steering.setMag(maxSpeed);
      steering.sub(this.velocity);
      steering.limit(this.maxForce);
    }
    return steering;  
  }
  
  cohesion() {
    let steering = new createVector();
    let total = 0;
    for (let other of boids) {
      if(this.isVisible(other)&&this.flockID==other.flockID){
        steering.add(other.position);
        total++;
      }
    }
    if (total > 0) {
      steering.div(total);
      steering.sub(this.position);
      steering.setMag(maxSpeed);
      steering.sub(this.velocity);
      steering.limit(this.maxForce);
    }
    return steering;
  }
  
  seperation() {
   let steering = createVector();
    let total = 0;
    for (let other of boids) {
      let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
      if (other != this && d < perceptionRadius) {
        let diff = p5.Vector.sub(this.position,                       other.position);
        diff.div(d * d);
        steering.add(diff);
        total++;
      }
    }
    if (total > 0) {
      steering.div(total);
      steering.setMag(maxSpeed);
      steering.sub(this.velocity);
      steering.limit(this.maxForce);
    }
    return steering;
  }
  
  isVisible(other) {
    let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
    return ( (d < perceptionRadius) && (this !== other))
  }  
  
  wrapAround() {
    if (this.position.x > width) {
      this.position.x = 0;
    }
    else if (this.position.x < 0) {
      this.position.x = width;
    }
    else if (this.position.y > height) {
      this.position.y = 0;
    }
    else if (this.position.y < 0) {
      this.position.y = height;
    }
  }  
  
  containSpeed() {
    if (this.velocity > maxSpeed) {
      this.velocity = maxSpeed; 
    } else if (this.velocity < minSpeed) {
      this.velocity = minSpeed;
    }
  }
}