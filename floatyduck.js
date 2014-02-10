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

  this.Duck.prototype.moveX = function(amount) {
  	this.x += amount;
  }


  this.Engine = function() {
  	this.UPDATES_PER_SECOND = 60;
  }

  // This method updates the world (i.e., input, physics, etc)
  this.Engine.prototype.update = function() {
  	// TODO
  }

  // This method draws the current scene
  this.Engine.prototype.render = function() {
  	// TODO
  }

  this.Engine.prototype.run = function() {
  	var updateEvery = 1000 / this.UPDATES_PER_SECOND;
  	var lastUpdate = Date.now();
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
  }
}
