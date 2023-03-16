const buttonStart = document.querySelector('.control__button_route_start');
const buttonPause = document.querySelector('.control__button_route_pause');
const buttonReset = document.querySelector('.control__button_route_reset');
const page = document.querySelector('.page');
let pauseBull = true;

function startGame() {
  setScrollOff(page);
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
    document.removeEventListener('keydown', onKeyDown);
    setScrollOn(page);
    pauseBull = false;
    buttonPause.classList.add('control__button_active');
  } else if (gameOver) {
    buttonPause.classList.remove('control__button_active');
    setDisabledButton(buttonPause);
  } else if (!gameOver) {
    setScrollOff(page);
    document.addEventListener('keydown', onKeyDown);
    pauseBull = true;
    pushStart();
    buttonPause.classList.remove('control__button_active');
  }
};

function resetGame() {
  pushReset();
  setScrollOn(page);
  pauseBull = true;
  buttonPause.classList.remove('control__button_active');
  document.removeEventListener('keydown', onKeyDown);
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

function setScrollOff(page) {
  page.classList.add('page__scroll_off');
};

function setScrollOn(page) {
  page.classList.remove('page__scroll_off');
};

buttonStart.addEventListener('click', startGame);
buttonPause.addEventListener('click', pauseGame);
buttonReset.addEventListener('click', resetGame);


