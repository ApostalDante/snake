const buttonStart = document.querySelector('.control__button_route_start');
const buttonPause = document.querySelector('.control__button_route_pause');
const buttonReset = document.querySelector('.control__button_route_reset');
let pauseBull = true;

function startGame() {
  keyDownHandlers.ArrowUp();
  document.addEventListener('keydown', onKeyDown);
  pushStart();
  setDisabledButton(buttonStart);
  if (!gameOver) {
    setEnabledButton(buttonPause);
    setEnabledButton(buttonReset);
  }
};

function pauseGame() {
  if (pauseBull) {
    pushStop();
    pauseBull = false;
    buttonPause.classList.add('control__button_active');
  } else if (gameOver) {
    buttonPause.classList.remove('control__button_active');
    setDisabledButton(buttonPause);
  } else if (!gameOver) {
    pauseBull = true;
    pushStart();
    buttonPause.classList.remove('control__button_active');
  }
};

function resetGame() {
  pushReset();
  pauseBull = true;
  buttonPause.classList.remove('control__button_active');
  setEnabledButton(buttonStart);
  setDisabledButton(buttonPause);
  setDisabledButton(buttonReset);
};

function setDisabledButton(button) {
  button.setAttribute('disabled', 'true');
  button.classList.add('control__button_disabled');
};

function setEnabledButton(button) {
  button.removeAttribute('disabled');
  button.classList.remove('control__button_disabled');
};


buttonStart.addEventListener('click', startGame);
buttonPause.addEventListener('click', pauseGame);
buttonReset.addEventListener('click', resetGame);


