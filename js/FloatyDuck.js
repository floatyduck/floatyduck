// game engine
FloatyDuck.prototype = new FloatyElement();

function FloatyDuck() {
  // call extender class
  FloatyElement.apply(this,['play_area']);
  
  this.DEBUG = true;
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

  this.elems = [];

  // generate game area
  this.Scroll = new Scroll();
  this.Scroll.setSize('w',this.getSize('w')*1+10);
  this.Scroll.setSize('h',this.getSize('h')-2);
  this.elems.push(this.Scroll);
  
  // set structure
  $('body').append(this.obj);

  // create duck and position in center
  this.Duck = new Duck();
  this.Duck.setPos('x',this.getSize('w')/2);
  this.Duck.setPos('y',this.getSize('h')/2);
  this.elems.push(this.Duck);

  this.StartScreen = new StartScreen();
  this.StartScreen.setPos('x',this.getSize('w')/2);
  this.StartScreen.setPos('y',this.getSize('h')/2);
  this.elems.push(this.StartScreen);

  this.elems.forEach(function(elem) {
    this.obj.append(elem.obj);
  }.bind(this))
  
  this.started = false;
  
  this.Keyboard = new Keyboard();
  
  if(this.DEBUG) {
    this.obj.css('overflow','visible');
  }
}

// This method updates the world (i.e., input, physics, etc)
FloatyDuck.prototype.update = function() {
  this.elems.forEach(function(elem) {
    elem.update();
  })

  if (this.Keyboard.isDownPressed()) {
    if(!this.started) {
      this.Duck.start();
      this.StartScreen.hide();
      this.started = true;
    }

    if( this.registeredDown == false ) {
      this.registeredDown = true;
      this.Duck.setSpeed(5);
    }
  }
  
}

// This method draws the current scene
FloatyDuck.prototype.render = function() {
  this.elems.forEach(function(elem) {
    elem.render();
  })
  
  // render play area
  this.obj.css('width',this.getSize('w')+'px').css('height',this.getSize('h')+'px');

  if(this.DEBUG) {
  
    // Record current frame render for debug
    this.frameCount++;

    // Write out debug data
    $('#frame_count').html(this.frameCount);
    var activeKeys = "";
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
  this.downPressed = false;

  $(document).keydown(function(e) {
    switch(e.keyCode) {
      case 40: this.downPressed = true; break;
    }
  }.bind(this))

  $(document).keyup(function(e) {
    switch(e.keyCode) {
      case 40: this.downPressed = false; break;
    }
  }.bind(this))
}

Keyboard.prototype.isDownPressed = function() {
  return this.downPressed;
}
