function FloatyDuck() {

  $ = $ ? $ : function(a) { return document.getElementById(a); }
    
  this.scroll = 1;
    
  this.Duck = function() {
    this.x = 5;
    this.y = 15;
    
    this.y_speed = 0;
    this.buoyancy = -0.5;
  }

  this.Duck.prototype.moveY = function(amount) {
  	this.y += amount;
  }

}
