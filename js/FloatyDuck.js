// game engine
FloatyDuck.prototype = new FloatyElement();

function FloatyDuck() {
  // call extender class
  FloatyElement.apply(this,['play_area']);
  
  this.DEBUG = false;
  this.UPDATES_PER_SECOND = 60;
  this.DELAY_BEFORE_START = 6000;

  this.frameCount = 0;
    
  this.size = { w: 320, h: 480 };
  
  // need to track only once per press
  this.registeredDown = false;
  $(document).keyup(function(e) {
    switch(e.keyCode) {
      case 40: this.registeredDown = false; break;
    }
  }.bind(this))
}

// Initialize
FloatyDuck.prototype.init = function() {
  if(this.DEBUG) {
    $('#debug_data').css('display', 'block');
  }

  // generate game area
  this.Scroll = new Scroll();
  
  this.Scroll.setSize('w',this.getSize('w')*1+10);
  this.Scroll.setSize('h',this.getSize('h')-2);
  
  // set structure
  $('body').append(this.obj);
  this.obj.append(this.Scroll.obj);
  
  this.Duck = new Duck();
  this.Scroll.obj.append(this.Duck.obj);
  
  // position duck in center
  this.Duck.setPos('x',this.getSize('w')/2);
  this.Duck.setPos('y',this.getSize('h')/2);
  
  this.Keyboard = new Keyboard();
  
  if(this.DEBUG) {
    this.obj.css('overflow','visible');
  }
}

// This method updates the world (i.e., input, physics, etc)
FloatyDuck.prototype.update = function() {

  // update scroll area
  this.Scroll.update();
  this.Duck.update();
  this.Duck.movePos('x',this.Scroll.getRate());

  if (this.Keyboard.isDownPressed()) {
    if( this.registeredDown == false ) {
      this.registeredDown = true;
      this.Duck.setSpeed(6);
    }
  }
  
}

// This method draws the current scene
FloatyDuck.prototype.render = function() {
  this.Duck.render();
  this.Scroll.render();
  
  // render play area
  this.obj.css('width',this.getSize('w')+'px').css('height',this.getSize('h')+'px');

  if(this.DEBUG) {
  
    // show duck position; this adds a *lot* of html elements so it quickly leads to slowdown
    this.Scroll.obj.append($('<div class="duckpos"></div>').css('top',this.Duck.getRealPos('y')+'px').css('left',this.Duck.getRealPos('x')+'px'));
  
    // Record current frame render for debug
    this.frameCount++;

    // Write out debug data
    $('#frame_count').html(this.frameCount);
    var activeKeys = "";
    if(this.Keyboard.upPressed) {
      activeKeys = activeKeys + "UP, ";
    }
    if(this.Keyboard.downPressed) {
      activeKeys += "DOWN, ";
    }
    $('#active_keys').html(activeKeys);
    // TODO: Duck X and Y
    // TODO: Canvas size
  }
}

FloatyDuck.prototype.run = function() {
  this.init();
  
  var updateEvery = 1000 / this.UPDATES_PER_SECOND;
  var lastUpdate = Date.now();
  
  setInterval(function() {
    this.update();
    this.render();
  }.bind(this), updateEvery);
}

// Keyboard input manager
Keyboard = function() {
  this.leftPressed = false;
  this.rightPressed = false;
  this.upPressed = false;
  this.downPressed = false;

  $(document).keydown(function(e) {
    switch(e.keyCode) {
      case 37: this.leftPressed = true; break;
      case 38: this.upPressed = true; break;
      case 39: this.rightPressed = true; break;
      case 40: this.downPressed = true; break;
    }
  }.bind(this))

  $(document).keyup(function(e) {
    switch(e.keyCode) {
      case 37: this.leftPressed = false; break;
      case 38: this.upPressed = false; break;
      case 39: this.rightPressed = false; break;
      case 40: this.downPressed = false; break;
    }
  }.bind(this))
}

Keyboard.prototype.isLeftPressed = function() {
  return this.leftPressed;
}

Keyboard.prototype.isRightPressed = function() {
  return this.rightPressed;
}

Keyboard.prototype.isUpPressed = function() {
  return this.upPressed;
}

Keyboard.prototype.isDownPressed = function() {
  return this.downPressed;
}
