Ground.prototype = new FloatyElement();

function Ground(width) {
  FloatyElement.apply(this, ['ground']);

  this.size = { w: width, h: 35 };

  this.collidable = true;
}