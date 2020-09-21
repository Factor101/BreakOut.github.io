const balls = [];
const bricks = [];
const paddles = [];
let isMoving = false;
let lives = 5;
let lost = false;
let dead = false;
let score = 0;
let highscore = 0;
let level = 0;
let movementDir = 1; // left = -1, right = 1
//let debugBall;
let cat;
let cats = [];
let catIndex = 0;
let won = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  balls.push(new ball(width / 2, height / 2 + 250, -5));
  paddles.push(new paddle(width / 2 - 125, height / 2 + 300, 250));
  cat = loadImage("assets/cat.png");
  cats[0] = loadImage("assets/catleft.png");
  cats[1] = loadImage("assets/catright.png");
  for( let i = -500; i <= 500; i += 150 )
  {
    for( let j = -300; j <= 50; j += 75 ) 
    {
      bricks.push(new brick(width / 2 + i, height / 2 + j, 100, rand_int(1, 3)));
    }
  }
}


function draw() {
  if( lost ) {
    noStroke();
    fill(255);
    background(cat);
    textSize(50);
    text('you lost dum idot >:C', width / 2 - 225, height / 2 - 100);
    text(`score: ${score}`, width / 2 - 100, height / 2);
    text(`highscore: ${highscore}`, width / 2 - 150, height / 2 + 100);
    //image(cat, width / 2 - 400, height / 2 - 500, 400, 300);
    return;
  }
  if( won ) {
    noStroke();
    fill(255);
    background(cats[catIndex]);
    textSize(50);
    text('you won !!! :D', width / 2 - 150, height / 2 - 100);
    text(`score: ${score}`, width / 2 - 100, height / 2);
    text(`highscore: ${highscore}`, width / 2 - 150, height / 2 + 100);
    if( frameCount % 20 === 0 ) { catIndex = catIndex === 0 ? 1 : 0; }
    return;
  }
  background(0);
  handleKeys();
  if( score > highscore ) { highscore = score; }
  //debugBall = new ball(mouseX, mouseY, 0);
  //debugBall.render();
  fill(255);
  textSize(30);
  text(`score: ${score}`, 50, 50);
  text(`highscore: ${highscore}`, 50, 100);
  text(`lives: ${lives}`, 50, 150);
  for( const i of balls )
  {
    i.render();
    if( isMoving ) {
      if( i.move() === false ) {
        balls.splice(balls.indexOf(i));
        if( lives >= 2 ) {
          if( !dead ) {
            dead = true;
            die();
          }
        } else {
          if( !lost ) {
            lose();
            lost = true;
          }
        }
      }
    }
  }
  for( const i of paddles )
  {
    i.render();
    for( const j of balls ) 
    {
      if( i.collision(j) ) {
        j.v.y *= -1;
      }
    }
  }
  for( const i of bricks )
  {
    i.render();
    //i.move();
    for( const j of balls )
    {
      if( i.collision(j) ) {
        j.v.y *= -1;
        i.lives--;
        if(i.lives <= 0) {
          bricks.splice(bricks.indexOf(i), 1);
          score++;
        }
      }
    }
  }
}

function die() {
  console.log(`dead, you have ${lives} lives left.`);
  lives--;
  isMoving = false;
  dead = false;
  paddles[0].pos.x = width / 2 - 125;
  balls.push(new ball(width / 2, height / 2 + 250, -5));
}

function handleKeys() {
  if(keyIsDown(39)) { // right arrow
    if( paddles[0].pos.x + paddles[0].width >= width ) { return; }
    paddles[0].pos.x += 14;
  }
  if(keyIsDown(37)) { // left arrow
    if( paddles[0].pos.x <= 0 ) { return; }
    paddles[0].pos.x -= 14;
  }
  if(keyIsDown(32)) { // space bar
  
  }
}

function keyPressed() {
  if( key === ' ' ) {
    isMoving = true;
    if( lost ) {
      lives = 5;
      score = 0;
      lost = false;
      balls.push(new ball(width / 2, height / 2 + 250, -5));
      for( let i = -500; i <= 500; i += 150 )
      {
        for( let j = -300; j <= 50; j += 75 ) 
        {
          bricks.push(new brick(width / 2 + i, height / 2 + j, 100, rand_int(1, 3)));
        }
      }
    }
  }
}

function vector(x, y = 0, z = 0) {
  /**
  *@constructor
  */
  if( typeof x === 'object' ) {
    this.x = x[0];
    this.y = x[1];
    this.z = x[2];
  } else {
    this.x = x;
    this.y = y;
    this.z = z;
  }
  
  this.add = function(vec1, vec2) {
    return vec.z === void(null) ? [ vec1.x + vec2.x, vec1.y + vec2.y ] : [ vec1.x + vec2.x, vec1.y + vec2.y, vec1.z + vec2.z ];
  };
  this.sub = function(vec1, vec2) {
    return vec.z === void(null) ? [ vec1.x - vec2.x, vec1.y - vec2.y ] : [ vec1.x - vec2.x, vec1.y - vec2.y, vec1.z - vec2.z ];
  };
  this.mult = function(vec1, vec2) {
    return vec.z === void(null) ? [ vec1.x * vec2.x, vec1.y * vec2.y ] : [ vec1.x * vec2.x, vec1.y * vec2.y, vec1.z * vec2.z ];
  };
  this.div = function(vec1, vec2) {
    return vec.z === void(null) ? [ vec1.x / vec2.x, vec1.y / vec2.y ] : [ vec1.x / vec2.x, vec1.y / vec2.y, vec1.z / vec2.z ];
  };
  this.avg = function(vec1, vec2) {
    return (vec1.reduce(function (a, b) { return a + b; }, 0) + vec2.reduce(function (a, b) { return a + b; }, 0)) / (Object.values(vec1).length + Object.values(vec2).length);
  };
  this.mag = function(vec = this) {
    return vec.z == void(null) ? Math.sqrt(vec.x * vec.x + vec.y * vec.y) : Math.sqrt(vec.x * vec.x + vec.y * vec.y + vec.z * vec.z);
  };
  this.norm = function(vec = this) {
    let mag = this.mag(vec);
    return vec.z == void(null) ? [vec.x / mag, vec.y / mag, null] : [vec.x / mag, vec.y / mag, vec.z / mag] ;
  };
}

function rand_int(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
