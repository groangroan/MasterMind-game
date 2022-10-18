import { selectionContainer, clickSignHandler } from '../App/PlayGame.js';
import { gameStatus } from '../App/CheckResults.js';

const endGameModal = document.getElementById('end-game-modal');
export const backdrop = document.getElementById('backdrop');
const closeModalBtn = endGameModal.querySelector('a');
const newGameModalBtn = endGameModal.querySelector('button');

export const toggleModal = () => {
  const modalTitle = endGameModal.querySelector('h2');
  const modalText = endGameModal.querySelector('h3');

  endGameModal.classList.toggle('visible');

  toggleBackdrop();

  if (gameStatus.gameWin === true) {
    modalText.innerHTML = 'Congratulations.';
    modalTitle.innerHTML = 'YOU WON!';
    modalTitle.style.color = '#32cd32';
  } else if (gameStatus.gameLost === true) {
    modalTitle.style.color = 'red';
    modalText.innerHTML = 'Game Over.';
    modalTitle.innerHTML = 'YOU LOST!';
  }

  endGameClickHandler();
};

const toggleBackdrop = () => {
  backdrop.classList.toggle('visible');
};

export const endGameClickHandler = () => {
  selectionContainer.removeEventListener('click', clickSignHandler);
};

// const backdropClickHandler = () => {
//   gameStatus.gameOver = true;
//   toggleModal(endGameModal);
// };

newGameModalBtn.addEventListener('click', async () => {
  const { init } = await import('../App/Init.js');
  toggleModal(endGameModal);
  gameStatus.gameOver = false;
  init();
});

closeModalBtn.addEventListener('click', () => {
  gameStatus.gameOver = true;
  toggleModal(endGameModal);
});
// backdrop.addEventListener('click', backdropClickHandler);
