Scroll.prototype = new FloatyElement();

function Scroll() {
  // call extender class
  FloatyElement.apply(this,['scroll']);
  
  // set defaults
  this.rate = 1.4;
}

Scroll.prototype.update = function() {
    
  this.changeSize('w',this.getRate());
  
  this.movePos('x',this.getRate()*-1);
  //alert(this.getPos('x'));
}

Scroll.prototype.setRate = function(amount) {
  this.rate = amount;
}
Scroll.prototype.getRate = function() {
  return this.rate;
}
