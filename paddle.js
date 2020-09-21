function paddle (x, y, size) {
  /**
  *@constructor
  */
  this.pos = new vector(x, y, null);
  this.width = size;
  this.height = 20;
  
  this.render = function() {
    noStroke();
    fill(255);
    rect(this.pos.x, this.pos.y, this.width, this.height);
  };
  
  this.collision = function(circle) {
    let test = new vector(circle.pos.x, circle.pos.y);
    if( circle.pos.x < this.pos.x ) { // left edge
      test.x = this.pos.x;
    } else if( circle.pos.x > this.pos.x + this.width ) { // right edge
      test.x = this.pos.x + this.width;
    }
    if( circle.pos.y < this.pos.y ) { // top edge
      test.y = this.pos.y;
    } else if( circle.pos.y > this.pos.y + this.height ) { // bottom edge
      test.y = this.pos.y + this.height;
    }
    let distance = dist(circle.pos.x, circle.pos.y, test.x, test.y);
    if( distance <= circle.r ) {
      return true;
    } else {
      return false;
    }
  };
}
