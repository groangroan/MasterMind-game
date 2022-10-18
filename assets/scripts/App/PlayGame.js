import { getSecretCombination } from './SecretCombination.js';
import { selectionFields } from './Init.js';
import { checkResult, gameStatus } from './CheckResults.js';

export const selectionContainer = document.getElementById('selection');
export const selectionButtons =
  selectionContainer.querySelectorAll('.game-field');

export const playerSelection = [];
export const playerRoundSelection = [];
export let oneRound = [];
export let fieldNumSel = 0;
export const setFieldNumSel = num => (fieldNumSel = num);
const roundLenght = 4;
let sign;

export const clickSignHandler = event => {
  sign = event.target.classList[1];
  selectionFields[fieldNumSel++].classList.add(sign);
  playerRoundSelection.push(sign);
  if (playerRoundSelection.length === roundLenght) {
    oneRound = playerRoundSelection.splice(0, 4);
    playerSelection.push(oneRound);
    checkResult();
  }
};

const playGame = () => {
  getSecretCombination();

  if (!gameStatus.gameOver) {
    selectionContainer.addEventListener('click', clickSignHandler);
  }
};
export default playGame;
