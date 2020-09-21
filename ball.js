function ball(x, y, v) {
  this.pos = new vector(x, y, null);
  this.v = new vector(v, v, null);
  this.r = 15;
  this.move = function() {
    if( this.pos.x > width - this.r || this.pos.x < this.r ) {
      this.v.x *= -1;
    } 
    if( this.pos.y > height - this.r || this.pos.y < this.r ) {
      this.v.y *= -1;
    }
    this.pos.x += this.v.x;
    this.pos.y += this.v.y;
    if( this.pos.y + this.r >= height ) { return false; }
    return true;
  };
  
  this.render = function() {
    fill(60, 80, 205);
    ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2);
  };
}
