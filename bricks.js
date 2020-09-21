function brick(x, y, size, lives) {
  /**
  *@constructor
  */
  this.pos = new vector(x, y, null);
  this.width = size;
  this.height = 20;
  this.lives = lives;
  this.colors = colorMap[this.lives];
  this.render = function() {
    noStroke();
    this.colors = colorMap[this.lives];
    fill(this.colors);
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
  
  this.move = function() {
    if( frameCount % 60 < 1 ) {
      movementDir *= -1;
    }
    //this.pos.x += 2 * movementDir;
  };
}

const colorMap = {
  1: [96, 62, 230],
  2: [255, 0, 0],
  3: [0, 255, 0],
  4: [0, 0, 255]
};
