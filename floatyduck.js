function FloatyDuck() {

  $ = $ ? $ : function(a) { return document.getElementById(a); }

  this.Duck = function() {
    this.x = 5;
    this.y = 15;
  }

  this.Duck.prototype.moveY = function(amount) {
  	this.y += amount;
  }

  this.Duck.prototype.moveX = function(amount) {
  	this.x += amount;
  }

}
