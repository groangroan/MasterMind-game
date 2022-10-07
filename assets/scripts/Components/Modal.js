import { selectionContainer } from '../../../index.js';
const endGameModal = document.getElementById('end-game-modal');
const backdrop = document.getElementById('backdrop');
const closeModalBtn = endGameModal.querySelector('a');

const newGameModalBtn = endGameModal.querySelector('button');

export const toggleModal = (status, gameOver) => {
  const modalTitle = endGameModal.querySelector('h2');
  const modalText = endGameModal.querySelector('h3');

  endGameModal.classList.toggle('visible');

  toggleBackdrop();

  if (status === true) {
    modalText.innerHTML = 'Congratulations.';
    modalTitle.innerHTML = 'YOU WON!';
    modalTitle.style.color = '#32cd32';
  } else {
    modalTitle.style.color = 'red';
    modalText.innerHTML = 'Game Over.';
    modalTitle.innerHTML = 'YOU LOST!';
  }

  return (gameOver = true);
};

const toggleBackdrop = () => {
  backdrop.classList.toggle('visible');
};

export const endGameClickHandler = () => {
  selectionContainer.replaceWith(selectionContainer.cloneNode(true));
  console.log(2);
};

newGameModalBtn.addEventListener('click', async () => {
  try {
    const { init } = await import('../../../index.js');
    toggleModal();
    init();
    //return (gameOver = false);
  } catch (err) {
    console.log(err);
  }
});

closeModalBtn.addEventListener('click', endGameClickHandler);
backdrop.addEventListener('click', endGameClickHandler);
