// Max Base
// https://github.com/BaseMax/WebSnakeGame
const KEY_UP = 38;
const KEY_DOWN = 40;
const KEY_LEFT = 37;
const KEY_RIGHT = 39;
const STATUS_ALIVE=1;
const STATUS_OVER=0;
// const DELAY=100;
const GAME_WIDTH = 500;
const GAME_HEIGHT = 500;
var game= {
  delay: 400,
  canvas: undefined,
  content: undefined,
  // status: STATUS_OVER,
  status: STATUS_ALIVE,
  init: function() {
    this.canvas=document.getElementById('game');
    console.log(this.canvas);
    this.canvas.width=GAME_WIDTH;
    this.canvas.height=GAME_HEIGHT;
    this.content=this.canvas.getContext('2d');
    console.log(this.content);
    this.loadImages();
    this.create();
    // createSnake();
    // locateApple();
    var self=this;
    setTimeout(function() {
      self.game();
    }, this.delay);
  },
  images:{
    head: new Image(),
    dot: new Image(),
    DOT_SIZE: 10,
  },
  loadImages: function() {
    this.images.head = new Image();
    this.images.head.src = 'head.png';

    this.images.dot = new Image();
    this.images.dot.src = 'dot.png';
  },
  gameOver: function() {
    console.log("over");
    this.content.fillStyle = 'white';
    this.content.textBaseline = 'middle'; 
    this.content.textAlign = 'center'; 
    this.content.font = 'normal bold 36px serif';
    this.content.fillText('Game over, Score: '+ this.movements, GAME_WIDTH/2-15, GAME_HEIGHT/2-30);
    this.content.font = 'normal bold 20px serif';
    this.content.fillText('© Max Base', GAME_WIDTH/2-15, GAME_HEIGHT/2+10);
  },
  position: {
    x: [],
    y: [],
  },
  dots: 0,
  movements: 0,
  places: [],
  create: function() {
    this.dots=4;
    for(var z = 0; z < this.dots; z++) {
      this.position.x[z] = 50 - z * 10;
      this.position.y[z] = 50;
    }
  },
  collision: function() {
    console.log("collision:"+this.position.y[0]);
    if(this.position.y[0] >= GAME_HEIGHT) {
      this.position.y[0]=0;
    }
    if(this.position.y[0] < 0) {
      this.position.y[0]=GAME_HEIGHT;
    }
    if(this.position.x[0] >= GAME_WIDTH) {
      this.position.x[0]=0;
    }
    if(this.position.x[0] < 0) {
      this.position.x[0]=GAME_WIDTH;
    }
  },
  draw: function() {
    for(var z = 0; z < this.dots; z++) {
      if (z == 0) {
        this.content.drawImage(this.images.head, this.position.x[z], this.position.y[z]);
      }
      else {
        this.content.drawImage(this.images.dot, this.position.x[z], this.position.y[z]);
      }
    }
    this.places.push({x:this.position.x[z], y:this.position.y[z]});
  },
  move: function() {
		this.movements++;
    for(var z = this.dots; z > 0; z--) {
      this.position.x[z] = this.position.x[(z - 1)];
      this.position.y[z] = this.position.y[(z - 1)];
    }
    if(this.keyStatus === KEY_LEFT) {
      this.position.x[0] -= this.images.DOT_SIZE;
    }
    else if(this.keyStatus === KEY_RIGHT) {
      this.position.x[0] += this.images.DOT_SIZE;
    }
    else if(this.keyStatus === KEY_UP) {
      this.position.y[0] -= this.images.DOT_SIZE;
    }
    else if(this.keyStatus === KEY_DOWN) {
      this.position.y[0] += this.images.DOT_SIZE;
    }
    console.log(this.position.x);
    console.log(this.position.y);
    var self=this;
    this.places.forEach(function(place) {
      self.position.x.forEach(function(x, i) {
        if(x === place.x && self.position.y[i] === place.y) {
          self.status=STATUS_OVER;
        }
      });
    });
  },
  game: function() {
    console.log("game");
    if(this.status === STATUS_OVER) {
      this.gameOver();
    }
    else {
      this.draw();
      this.move();
      this.collision();
      // checkApple();
      // // checkCollision();
      // move();
      // doDrawing();
      var self=this;
      if(this.delay >= 50) {
        this.delay-=5;
      }
      setTimeout(function() {
        self.game();
      }, this.delay);
    }
  },
  keyStatus: KEY_RIGHT,
  keyHandle: function(key) {
    console.log(key);
    if(key === KEY_LEFT && (this.keyStatus !== KEY_RIGHT)) {
      this.keyStatus=key;
    }
    else if(key === KEY_RIGHT && (this.keyStatus !== KEY_LEFT)) {
      this.keyStatus=key;
    }
    else if(key === KEY_UP && (this.keyStatus !== KEY_DOWN)) {
      this.keyStatus=key;
    }
    else if(key === KEY_DOWN && (this.keyStatus !== KEY_UP)) {
      this.keyStatus=key;
    }
  },
};
window.addEventListener("load", function(e) {
  game.init();
});
window.addEventListener("keydown", function(e) {
  var key = e.keyCode;
  game.keyHandle(key);
});
