import { displaySecretCombination } from './SecretCombination.js';
import { createHighScoreTable, hsButton } from '../App/DB/HighScore.js';
import { gameStatus, modalClickHandler } from './CheckResults.js';

export let reverseCounter;

export const startCountdown = () => {
  reverseCounter = 120;
  const gameTimer = setInterval(() => {
    let progressBar = document.querySelector('progress');
    progressBar.value = 120 - --reverseCounter;
    if (reverseCounter <= 0) {
      gameStatus.gameLost = true;
      displaySecretCombination();
      createHighScoreTable();
      hsButton.addEventListener('click', modalClickHandler);

      clearInterval(gameTimer);
    } else if (gameStatus.gameWin || gameStatus.gameLost) {
      clearInterval(gameTimer);
    }
  }, 1000);
};
