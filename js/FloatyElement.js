// base object for elements used in FloatyDuck
function FloatyElement( id ) {
  this.pos = {x: 0, y: 0};
  this.size = {w: 0, h: 0};
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