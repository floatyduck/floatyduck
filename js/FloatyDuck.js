// game engine
FloatyDuck.prototype = new FloatyElement();

function FloatyDuck() {
  // call extender class
  FloatyElement.apply(this,['play_area']);
  
  this.DEBUG = true;
  this.UPDATES_PER_SECOND = 60;
  this.DELAY_BEFORE_START = 6000;
  this.INTERVAL_ID = 0;

  this.frameCount = 0;
    
  this.size = { w: 320, h: 480 };
  
  this.setBoundMod( {'b': -35 } );
    
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

  // create duck and position in center
  this.Duck = new Duck();
  this.Duck.setPos('x',this.getSize('w')/2);
  this.Duck.setPos('y',this.getSize('h')/2);
  this.elems.push(this.Duck);
  
  this.StartScreen = new StartScreen();
  this.StartScreen.setPos('x',this.getSize('w')/2);
  this.StartScreen.setPos('y',this.getSize('h')/2);
  this.elems.push(this.StartScreen);

  // set structure
  $('body').append(this.obj);
  
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
  
  // check for collisions
  if( !this.Duck.isInside(this) ) {
    alert('Lose!');
    this.stop();
    this.run();
  }

  if (this.Keyboard.isDownPressed()) {
    if(!this.started) {
      this.Duck.start();
      this.StartScreen.hide();
      this.started = true;
    }

    if( this.registeredDown == false ) {
      this.registeredDown = true;
      this.Duck.flap();
    }
  }
  
}

// This method draws the current scene
FloatyDuck.prototype.render = function() {

  // run parent render
  FloatyElement.prototype.render.apply(this,arguments);

  this.elems.forEach(function(elem) {
    elem.render();
  })

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
  
  this.INTERVAL_ID = setInterval(function() {
    this.update();
    this.render();
  }.bind(this), updateEvery);
}

FloatyDuck.prototype.stop = function() {
  clearInterval(this.INTERVAL_ID);
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
