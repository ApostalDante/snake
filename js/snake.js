const score = document.querySelector('.score__count');
const world = document.getElementById('world');
const pen = world.getContext('2d');
let directionSnake;
let gameOver = false;
let snakeTailCount = 1;
//ширина плитки 
let titleSize = 40;
//колл плиток
let titleCount = world.width / titleSize;
//скорость передвижения 
const velocity = {
  x: 0,
  y: 0,
};
//расположение еды
const food = {
  x: 15,
  y: 15,
};
const snakeHead = {
  x: 10,
  y: 10,
};
const snake = [];
const keyDownHandlers = {
  'ArrowLeft': () => {
    velocity.x = -1;
    velocity.y = 0;
  },
  'ArrowRight': () => {
    velocity.x = 1;
    velocity.y = 0;
  },
  'ArrowUp': () => {
    velocity.x = 0;
    velocity.y = -1;
  },
  'ArrowDown': () => {
    velocity.x = 0;
    velocity.y = 1;
  },
};

//рисует пространство
function drawWorld() {
  pen.fillStyle = 'black';
  pen.fillRect(0, 0, world.width, world.height)
};

//рисует змейку
function drawSnake() {
  pen.fillStyle = 'darkgreen';
  for (let i = 0; i < snake.length; i++) {
    pen.fillRect(snake[i].x * titleSize, snake[i].y * titleSize, titleSize - 2, titleSize - 2)
    if (snake[i].x === snakeHead.x && snake[i].y === snakeHead.y) {
      showCoumt();
      stop();
      gameOver = true;
    }
  }
};

//отрисовка еды
function drawFood() {
  pen.fillStyle = 'darkred';
  pen.fillRect(food.x * titleSize, food.y * titleSize, titleSize - 2, titleSize - 2)
};

//обновление позиции головы змейки
function updateSnakeHead() {
  snakeHead.x += velocity.x;
  snakeHead.y += velocity.y;
  if (snakeHead.x < 0) snakeHead.x = titleCount - 1;
  if (snakeHead.x > titleCount - 1) snakeHead.x = 0;
  if (snakeHead.y < 0) snakeHead.y = titleCount - 1;
  if (snakeHead.y > titleCount - 1) snakeHead.y = 0;
};

//обновление тела змейки
function updateSnakeBody() {
  snake.push({
    x: snakeHead.x,
    y: snakeHead.y,
  })
  while (snake.length > snakeTailCount) {
    snake.shift()
  }
};

//наткнулась ли змейка на еду
function eatFood() {
  if (food.x === snakeHead.x && food.y === snakeHead.y) {
    snakeTailCount++
    food.x = Math.floor(Math.random() * titleCount)
    food.y = Math.floor(Math.random() * titleCount)
  }
};

function onKeyDown(evt) {
  checkActiveKey(evt.key);
  keyDownHandlers[directionSnake]();
};

function checkActiveKey(key) {
  if (key == 'ArrowLeft' && directionSnake != 'ArrowRight') {
    directionSnake = 'ArrowLeft';
  } else if (key == 'ArrowUp' && directionSnake != 'ArrowDown') {
    directionSnake = 'ArrowUp';
  } else if (key == 'ArrowRight' && directionSnake != 'ArrowLeft') {
    directionSnake = 'ArrowRight';
  } else if (key == 'ArrowDown' && directionSnake != 'ArrowUp') {
    directionSnake = 'ArrowDown';
  }
};

function updateGame() {
  updateSnakeHead();
  drawWorld();
  drawSnake();
  eatFood();
  drawFood();
  updateSnakeBody();
};

function start() {
  gameStartStop = setInterval(updateGame, 1000 / 5);
};

function stop() {
  clearInterval(gameStartStop);
};

//кнопки
function pushStart() {
  start();
  gameOver = false;
};

function pushStop() {
  stop();
};

function pushReset() {
  stop();
  showCoumt();
  nullCount();
  resetPoztionSnake();
};

function showCoumt() {
  score.innerHTML = snakeTailCount - 1;
};

function nullCount() {
  snakeTailCount = 1;
};

function resetPoztionSnake() {
  snakeHead.x = 10;
  snakeHead.y = 10;
  while (snake.length > snakeTailCount) {
    snake.shift()
  }
};

start();



