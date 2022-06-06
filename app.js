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

    this.coords = [x, y];

    this.setCoords(x, y);

    canvas.append(this.body);
  }
  setCoords(newX, newY) {
    this.coords = [newX, newY];
    this.style.left = this.coords[0] + "px";
    this.style.top = this.coords[1] + "px";
  }
}

function randomCoors() {
  return 20 * Math.round(Math.random() * 24);
}

const target = () => {
  let food = new Unit(randomCoors(), randomCoors());
  food.style.backgroundColor = "#e00";
  return food;
};

target();

class Snake {
  constructor() {
    this.head = new Unit(boxSize / 2, boxSize / 2);
    this.player = [this.head.body];
    moveBreaker = this.initialMove();
    this.playerMove();
  }

  initialMove = () => {
    return setInterval(() => {
      this.moveThroughX();
    }, 50);
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
      {
        if (step > 0) {
          this.head.setCoords(0, this.head.coords[1]);
        }
      }
    }
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
      {
        if (step > 0) {
          this.head.setCoords(this.head.coords[0], 0);
        }
      }
    }
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
      step = direction === LEFT || direction === UP ? -20 : 20;
      if (direction === LEFT || direction === RIGHT) {
        this.moveThroughX();
      } else {
        this.moveThroughY();
      }
    }, 50);
  }
}
new Snake();
