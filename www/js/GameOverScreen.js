GameOverScreen.prototype = new FloatyElement();

function GameOverScreen() {
  // call extender class
  FloatyElement.apply(this,['game_over_screen']);

  this.obj.html("Game Over");

  this.size = { w: 300, h: 280 };
}

// position based on centre
GameOverScreen.prototype.getPos = function(which) {

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

GameOverScreen.prototype.setScore = function(score) {
  score = Math.floor(score);
  this.obj.append("<br />"+score);
}

GameOverScreen.prototype.show = function() {
  this.obj.css('display', 'block');
}

GameOverScreen.prototype.hide = function() {
  this.obj.css('display', 'none');
}