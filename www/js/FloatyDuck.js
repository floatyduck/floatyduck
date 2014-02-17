// game engine
FloatyDuck.prototype = new FloatyElement();

function FloatyDuck() {
  // call extender class
  FloatyElement.apply(this,['play_area']);
  
  this.DEBUG = true;
  this.UPDATES_PER_SECOND = 60;
  this.INTERVAL_ID = 0;
  this.TIMEOUT_ID = 0;
  this.FIRST_OBSTACLE = 2500;
  this.SCROLL_RATE = 1.4;
  this.OBSTACLE_WIDTH = 50;
  this.OBSTACLE_GAP_SIZE = 170;

  this.frameCount = 0;
  this.obstacleCount = 0;
    
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

  this.elems = [];
    
  // when overriding init, pass child init as an argument so we can do pre_ and post_ hooks in order
  FloatyElement.prototype.init.apply(this,[function() {
    if(this.DEBUG) {
      $('#debug_data').css('display', 'block');
    }
    
    // generate game area   
    this.Scroll = new Scroll();
    this.Scroll.setSize('w',this.getSize('w')*1+10);
    this.Scroll.setSize('h',this.getSize('h')-2);
    this.Scroll.setRate(this.SCROLL_RATE);
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
    
    this.started = false;
    this.collision = false;
    
    this.Keyboard = new Keyboard();
    
    if(this.DEBUG) {
      this.obj.css('overflow','visible');
    }
  }.bind(this)]);  
}

// This method updates the world (i.e., input, physics, etc)
FloatyDuck.prototype.update = function() {

  // run parent update
  FloatyElement.prototype.update.apply(this,arguments);
  
  // check for collisions
  var collision = false;
  if( !this.Duck.isInside(this) ) {
    collision = true;
  }
  
  this.elems.forEach(function(elem) {
  
    if(elem.collidable && this.Duck.isTouching(elem)) {
      collision = true;
    }
  }.bind(this));
  
  if( collision ) {
    this.collision = true;
    
    if(this.DEBUG) {
      $('#collision').html("COLLISION");
    }
    
    this.stop();
    this.run();
  }
  

  if (this.Keyboard.isDownPressed()) {
    if(!this.started) {
      this.start();
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
  
  this.INTERVAL_ID = setInterval(function() {
    this.update();
    this.render();
  }.bind(this), updateEvery);
  
}
FloatyDuck.prototype.start = function() {
  this.Duck.start();
  this.StartScreen.hide();
  this.started = true;
  // this.TIMEOUT_ID = setTimeout(this.addObstacle.bind(this),this.FIRST_OBSTACLE);
  this.TIMEOUT_ID = setTimeout(this.addObstaclePair.bind(this),this.FIRST_OBSTACLE);
}
FloatyDuck.prototype.stop = function() {
  clearTimeout(this.TIMEOUT_ID);
  clearInterval(this.INTERVAL_ID);
  this.started = false;
  
  this.elems.forEach(function(elem){
    elem.obj.remove();
  });
  
}

// Removed in favour of addObstaclePair
// FloatyDuck.prototype.addObstacle = function() {
//   this.Obstacle = new Obstacle(this.obstacleCount++);
//   this.Obstacle.setPos('x',this.getSize('w'));
//   this.Obstacle.setPos('y',0);
//   this.Obstacle.setSize('w',this.OBSTACLE_WIDTH);
//   this.Obstacle.setRate(this.SCROLL_RATE);
  
//   this.elems.push(this.Obstacle);
//   this.obj.append(this.Obstacle.obj);
  
//   this.Obstacle.init();
  
//   this.TIMEOUT_ID = setTimeout(this.addObstacle.bind(this),this.FIRST_OBSTACLE);
// }

FloatyDuck.prototype.addObstaclePair = function() {
  var maxHeight = this.getSize('h');
  var gapTop = Math.ceil(Math.random() * (maxHeight - this.OBSTACLE_GAP_SIZE));
  var startX = this.getSize('w');

  var topObstacle = new Obstacle(this.obstacleCount++);
  topObstacle.setPos('x',startX);
  topObstacle.setPos('y',0);
  topObstacle.setSize('w',this.OBSTACLE_WIDTH);
  topObstacle.setSize('h',gapTop);
  topObstacle.setRate(this.SCROLL_RATE);

  this.elems.push(topObstacle);
  this.obj.append(topObstacle.obj);

  var bottomY = gapTop + this.OBSTACLE_GAP_SIZE;
  var bottomObstacle = new Obstacle(this.obstacleCount++);
  bottomObstacle.setPos('x',startX);
  bottomObstacle.setPos('y',bottomY);
  bottomObstacle.setSize('w',this.OBSTACLE_WIDTH);
  bottomObstacle.setSize('h',maxHeight - bottomY);
  bottomObstacle.setRate(this.SCROLL_RATE);

  this.elems.push(bottomObstacle);
  this.obj.append(bottomObstacle.obj);

  this.TIMEOUT_ID = setTimeout(this.addObstaclePair.bind(this),this.FIRST_OBSTACLE);
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
