StartScreen.prototype = new FloatyElement();

function StartScreen() {
  // call extender class
  FloatyElement.apply(this,['start_screen']);

  this.obj.html("Tap DOWN<br /><br />to Start");

  this.size = { w: 300, h: 280 };
}

// position based on centre
StartScreen.prototype.getPos = function(which) {

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

StartScreen.prototype.hide = function() {
  this.obj.css('display', 'none');
}