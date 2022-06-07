const LEFT = "ArrowLeft";
const RIGHT = "ArrowRight";
const UP = "ArrowUp";
const DOWN = "ArrowDown";
let step = -20;

const canvas = document.querySelector(".canvas");

const boxSize = 480;

let moveBreaker;

class Unit {
  constructor(x, y) {
    this.body = document.createElement("div");
    this.body.className = "unit";

    this.style = this.body.style;
    this.setCoords(x, y);
    this.dir = LEFT;
    canvas.append(this.body);
  }

  setCoords(newX, newY) {
    this.coords = [newX, newY];
    this.style.left = newX + "px";
    this.style.top = newY + "px";
  }
}

function randomCoors() {
  return 20 * Math.round(Math.random() * 24);
}

function setFood() {
  let target = new Unit(randomCoors(), randomCoors());
  target.style.backgroundColor = "#e00";
  return target;
}

let food = setFood();

class Snake {
  constructor() {
    this.head = new Unit(boxSize / 2, boxSize / 2);
    this.units = [this.head];
    this.speed = 100;
    moveBreaker = this.initialMove();
    this.playerMove();
  }

  initialMove = () => {
    return setInterval(() => {
      this.head.dir = LEFT;
      console.log(this.head.dir);
      this.moveThroughX();
    }, this.speed);
  };

  moveThroughX() {
    if (this.head.coords[0] > 0) {
      this.head.setCoords(this.head.coords[0] + step, this.head.coords[1]);
    } else if (this.head.coords[0] <= 0) {
      if (step < 0) {
        this.head.setCoords(boxSize, this.head.coords[1]);
      } else {
        this.head.setCoords(this.head.coords[0] + step, this.head.coords[1]);
      }
    }
    if (this.head.coords[0] > boxSize) {
      if (step > 0) {
        this.head.setCoords(0, this.head.coords[1]);
      }
    }
    this.collision();
  }

  moveThroughY() {
    if (this.head.coords[1] > 0) {
      this.head.setCoords(this.head.coords[0], this.head.coords[1] + step);
    } else if (this.head.coords[1] <= 0) {
      if (step < 0) {
        this.head.setCoords(this.head.coords[0], boxSize);
      } else {
        this.head.setCoords(this.head.coords[0], this.head.coords[1] + step);
      }
    }
    if (this.head.coords[1] > boxSize) {
      if (step > 0) {
        this.head.setCoords(this.head.coords[0], 0);
      }
    }
    this.collision();
  }

  playerMove() {
    document.addEventListener("keydown", (event) => {
      const directions = [LEFT, RIGHT, UP, DOWN];
      if (directions.includes(event.code)) {
        this.setDirection(event.code);
      }
    });
  }

  setDirection(direction) {
    clearInterval(moveBreaker);
    moveBreaker = setInterval(() => {
      this.head.dir = direction;
      console.log(this.head.dir);
      step = direction === LEFT || direction === UP ? -20 : 20;
      if (direction === LEFT || direction === RIGHT) {
        this.moveThroughX();
      } else {
        this.moveThroughY();
      }
    }, this.speed);
  }

  collision() {
    if (
      this.head.coords[0] === food.coords[0] &&
      this.head.coords[1] === food.coords[1]
    ) {
      console.log("Mmmmm, tasty!");
      this.advance(this.units[this.units.length-1].dir);
      // console.log(this.units.length);
      food.body.parentElement.removeChild(food.body);
      food = setFood();
    }
  }

  advance(direction) {
    let x,y;
    console.log(this.units[0].coords[0]);
    if(this.units[this.units.length-1].dir==LEFT || this.units[this.units.length-1].dir==RIGHT ){
      x= this.units[this.units.length-1].coords[0]-step;
      y= this.units[this.units.length-1].coords[1];
    }
    else{
      x=this.units[this.units.length-1].coords[0];
      y=this.units[this.units.length-1].coords[1]-20;
    }
    this.units.push(new Unit(x,y));
    this.units[this.units.length-1].dir=direction;
    console.log(this.units[this.units.length-1].coords,this.units[this.units.length-1].direction);
  }
}
new Snake();
