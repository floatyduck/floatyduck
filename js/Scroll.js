Scroll.prototype = new FloatyElement();

function Scroll() {
  // call extender class
  FloatyElement.apply(this,['scroll']);
  
  // set defaults
  this.rate = 1.4;
  
  this.pos_bg = { x: 0, y: 0 };
}

Scroll.prototype.update = function() {
    
  //this.changeSize('w',this.getRate());
  //this.movePos('x',this.getRate()*-1);
  this.moveBg('x',this.getRate()*-1);
  
  //alert(this.getPos('x'));
}

Scroll.prototype.setRate = function(amount) {
  this.rate = amount;
}
Scroll.prototype.getRate = function() {
  return this.rate;
}
Scroll.prototype.render = function() {

  FloatyElement.prototype.render.apply(this,arguments);
  
  // scroll left
  this.obj.css('background-position',this.getBg('x')+'px '+this.getBg('y')+'px');
  
}
Scroll.prototype.getBg = function( which ) {
  return this.pos_bg[which];
}
Scroll.prototype.moveBg = function(which, amount) {
  this.pos_bg[which] += amount;
}