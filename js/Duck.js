Duck.prototype = new FloatyElement();

function Duck() {
  // call extender class
  FloatyElement.apply(this,['duck']);
  
  // set defaults
  this.y_speed = 0;
  this.buoyancy = -0.2;
  this.size = { w: 50, h: 50 };
}

Duck.prototype.update = function() {
  
  // apply a constant upward velocity
  this.changeSpeed(this.buoyancy);
  
  // float
  this.movePos('y',this.getSpeed());
  
}

// position based on centre of duck
Duck.prototype.getPos = function(which) {

  if( which != 'x' && which != 'y' ) return false;
 
  real_pos = this.pos[which];
  
  switch(which) {
      case 'x': which_size = 'w'; break;
      case 'y': which_size = 'h'; break;
  }
  
  pos = real_pos - Math.round(this.getSize(which_size)/2);
  if(pos < 0) pos = 0;
  
  return pos;
}

Duck.prototype.movePos = function(which, amount) {
  if( which != 'x' && which != 'y' ) return false;
  this.pos[which] += amount;
  if(this.pos[which] < 0) this.pos[which] = 0;
}

// get "real" position if needed
Duck.prototype.getRealPos = function(which) {
  if( which != 'x' && which != 'y' ) return false;
  return this.pos[which];
}

// speed functions
Duck.prototype.setSpeed = function(amount) {
  this.y_speed = amount;
}
Duck.prototype.changeSpeed = function(amount) {
  this.y_speed += amount;
}
Duck.prototype.getSpeed = function() {
  return this.y_speed;
}