Duck.prototype = new FloatyElement();

function Duck() {
  // call extender class
  FloatyElement.apply(this,['duck']);
  
  // set defaults
  this.y_speed = 0;
  this.buoyancy = -0.4;
  this.size = { w: 41, h: 35 };
  this.lookDown = false;
  this.lastFlap = 0;
  this.started = false;
  this.bound_mod = { t: 8, b: -8, l: 4, r: -4 };
}

Duck.prototype.update = function() {

  if(!this.started) {
    return;
  }
  
  // apply a constant upward velocity
  this.changeSpeed(this.buoyancy);
  
  // float
  this.movePos('y',this.getSpeed());
  
  if(this.lookDown) {
    if(this.getPos('y') <= this.lastFlap) {
      this.lookDown = false;
      this.obj.removeClass('look_down');
    } else {
      this.obj.addClass('look_down');
    }
  }
}

Duck.prototype.start = function() {
  this.started = true;
}

Duck.prototype.flap = function() {
  this.setSpeed(8);
  this.lookDown = true;
  this.lastFlap = this.getPos('y');
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
  
FloatyElement.prototype.isCollided = function(elem) {
  var duck_left = this.getRealPos('x');
  var duck_top = this.getRealPos('y');
  var duck_right = duck_left + this.getSize('w');
  var duck_bottom = duck_top + this.getSize('h');
  
  // Allow a buffer
  duck_left += 4;
  duck_right -= 4;
  duck_top += 8;
  duck_bottom -= 8;

  var elem_left = elem.getPos('x');
  var elem_top = elem.getPos('y');
  var elem_right = elem_left + elem.getSize('w');
  var elem_bottom = elem_top + elem.getSize('h');

  return overlap(duck_left, duck_right, elem_left, elem_right) && overlap(duck_top, duck_bottom, elem_top, elem_bottom);
}

function overlap(a1, a2, b1, b2) {
  return a1 <= b1 && a2 >= b1 || b1 <= a1 && b2 >= a1;
}