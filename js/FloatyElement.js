// base object for elements used in FloatyDuck
function FloatyElement( id ) {

  this.pos = {x: 0, y: 0};
  this.size = {w: 0, h: 0};
  
  // value to adjust the element's boundaries
  this.bound_mod = { t: 0, b: 0, l: 0, r: 0 };
  
  // THERE CAN BE ONLY ONE (id)
  $('#'+id).remove();
  
  this.obj = $('<div id="'+id+'"></div>');
  
}

FloatyElement.prototype.update = function() { }

FloatyElement.prototype.render = function() {
  this.obj.css('width',this.getSize('w')+'px')
          .css('height',this.getSize('h')+'px')
          .css('top',this.getPos('y')+'px')
          .css('left',this.getPos('x')+'px');
}

FloatyElement.prototype.setPos = function(which, value) {
  if( which != 'x' && which != 'y' ) return false;
  this.pos[which] = value;
}

FloatyElement.prototype.getPos = function(which) {
  if( which != 'x' && which != 'y' ) return false;
  return this.pos[which];
}
  
FloatyElement.prototype.movePos = function(which, amount) {
  if( which != 'x' && which != 'y' ) return false;
  this.pos[which] += amount;
}

FloatyElement.prototype.setSize = function(which, value) {
  if( which != 'w' && which != 'h' ) return false;
  return this.size[which] = value;
}

FloatyElement.prototype.changeSize = function(which, value) {
  if( which != 'w' && which != 'h' ) return false;
  return this.size[which] += value;
}

FloatyElement.prototype.getSize = function(which) {
  if( which != 'w' && which != 'h' ) return false;
  return this.size[which];
}

// get boundaries of element
FloatyElement.prototype.getBounds = function() {
  t = this.getPos('y')+this.getBoundMod('t');
  l = this.getPos('x')+this.getBoundMod('l');
  r = l + this.getSize('w')+this.getBoundMod('r');
  b = t + this.getSize('h')+this.getBoundMod('b');
  
  return { t: t, b: b, l: l, r: r };
}
// function determined by length of args
// 2 args means set one bound
// 1 arg means set all bounds
FloatyElement.prototype.setBoundMod = function() {
  if( arguments.length == 2 ) {
    which = arguments[0];
    value = arguments[1];
    
    this.bound_mod[which] = value;
  } else {
    for( x in arguments[0] ) {
      this.setBoundMod(x, arguments[0][x]);
    }
  }
}
FloatyElement.prototype.getBoundMod = function( which ) {
  return this.bound_mod[which];
}
// test to see if this is touching another FloatyElement
FloatyElement.prototype.isTouching = function( obj ) {

  this_bounds = this.getBounds();
  that_bounds = obj.getBounds();
  touching = true;
  
  if( this_bounds.l > that_bounds.r
  ||  this_bounds.r < that_bounds.l
  ||  this_bounds.t > that_bounds.b
  ||  this_bounds.b < that_bounds.t ) {
    touching = false;
  }
  
  return touching;
  
}
// check if this element is completely contained by another FloatyElement
FloatyElement.prototype.isInside = function( obj ) {

  this_bounds = this.getBounds();
  that_bounds = obj.getBounds();
  inside = false;
  
  if( this_bounds.l > that_bounds.l
  &&  this_bounds.r < that_bounds.r
  &&  this_bounds.t > that_bounds.t
  &&  this_bounds.b < that_bounds.b ) {
    inside = true;
  }
  
  return inside;
  
}