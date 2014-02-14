Obstacle.prototype = new FloatyElement();

function Obstacle() {

  // supplied argument means numbered obstacle
  num = 0;
  if( arguments.length > 0 ) {
    num = arguments[0];
  }
  
  // set defaults
  this.rate = 1;

  // call extender class
  FloatyElement.apply(this,['obstacle_'+num]);
  
  this.obj.addClass('obstacle');
  this.obj.css('border','solid 1px red');
  
}

Obstacle.prototype.setRate = function(amount) {
  this.rate = amount;
}
Obstacle.prototype.getRate = function() {
  return this.rate;
}

Obstacle.prototype.update = function() {
  this.movePos('x',this.getRate()*-1);
}

Obstacle.prototype.init = function() {
  // when overriding init, pass child init as an argument so we can do pre_ and post_ hooks in order
  FloatyElement.prototype.init.apply(this,[function() {
    
    this.randSize('h');
    
  }.bind(this)]);
}
// randomize size
// 0 args randomize both dimensions
// 1 arg randomize one
Obstacle.prototype.randSize = function() {

  // get parent's dimensions
  p_size = { h: this.obj.parent().height(), w: this.obj.parent().width() };
    
  if( arguments.length == 0 ) {
    this.setSize('h', Math.ceil(Math.random()*p_size['h']));
    this.setSize('w', Math.ceil(Math.random()*p_size['w']));
  } else {
    which = arguments[0];
    this.setSize(which, Math.ceil(Math.random()*p_size[which]));
  }

}