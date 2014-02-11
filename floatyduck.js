// game engine
function FloatyDuck() {

  this.UPDATES_PER_SECOND = 60;
    
  this.scroll = 1;
  this.size = { w: 320, h: 480 };
  
}
  
// This method updates the world (i.e., input, physics, etc)
FloatyDuck.prototype.update = function() {
  // TODO
}

// This method draws the current scene
FloatyDuck.prototype.render = function() {
  // TODO
}

FloatyDuck.prototype.run = function() {
  
  // generate game area
  this.html = $('<div id="play_area"></div>');
  
  // init properties for play area
  this.html.css('width',this.size.w+'px').css('height',this.size.h+'px');
  this.html.appendTo($('body'));
  
  this.Duck = new Duck();
  this.html.append(this.Duck.html);
  
  var updateEvery = 1000 / this.UPDATES_PER_SECOND;
  var lastUpdate = Date.now();
  
  setInterval(function() {
  
    // this needs fixing
    
    //var updates = (Date.now() - lastUpdate) / updateEvery;
    //for(; updates > 0; updates--) {
      this.update();
      //lastUpdate = Date.now();
    //}
    
    this.render();
  
  }.bind(this), updateEvery);

  // removed since this hangs the browser, replaced with a setTimeout
  // feel free to undo if you had another way to handle this in mind
  /*
  while (true) {
    // Update x times / second. Run multiple updates if there's been a long pause.
    var updates = (Date.now() - lastUpdate) / updateEvery;
    for(; updates > 0; updates--) {
      this.update();
      lastUpdate = Date.now();
    }

    // Rerender the screen
    this.render();
  }
  */
}

// duck object
Duck = function() {
  this.x = 5;
  this.y = 15;
  
  this.y_speed = 0;
  this.buoyancy = -0.5;
  
  this.size = { w: 50, h: 50 };
    
  // generate duck
  this.html = $('<div id="duck"></div>');
  
  // init properties for duck
  this.html.css('width',this.size.w+'px')
          .css('height',this.size.h+'px')
          .css('top',this.x+'px')
          .css('left',this.y+'px');
  
}
  
Duck.prototype.moveY = function(amount) {
  this.y += amount;
}

Duck.prototype.moveX = function(amount) {
  this.x += amount;
}