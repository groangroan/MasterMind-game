import createGameBoard, {
  gameBoardContainer,
  gameFieldCssClass,
  secretCombContainer,
  resultsContainer
} from './GameBoard.js';
import { resultRow, setRow } from '../Components/RowCreate.js';
import playGame, {
  playerSelection,
  playerRoundSelection,
  oneRound,
  setFieldNumSel
} from './PlayGame.js';
import { gameStatus, setRowIdNum } from './CheckResults.js';
import { setSecretComb } from './SecretCombination.js';

export let selectionFields;
export let secretComFields;

export const init = () => {
  if (gameStatus.gameWin || gameStatus.gameLost) {
    selectionFields.forEach(field => (field.className = gameFieldCssClass));
    for (let i = 0; i < resultRow.length; i++) {
      const row = resultRow[i].children;
      for (let j = 0; j < row.length; j++) {
        row[j].className = gameFieldCssClass;
      }
    }
    Promise.all([import('./DB/HighScore.js'), import('./Timer.js')]).then(
      ([highScore, timer]) => {
        while (highScore.hsTableBody.firstChild) {
          highScore.hsTableBody.removeChild(highScore.hsTableBody.firstChild);
        }
        timer.startCountdown();
      }
    );
    setSecretComb([]);
    playerSelection.length = 0;
    playerRoundSelection.lenght = 0;
    oneRound.lenght = 0;
    setRowIdNum(0);
    setFieldNumSel(0);
    gameStatus.gameLost = false;
    gameStatus.gameWin = false;
  } else {
    createGameBoard();
  }
  selectionFields = gameBoardContainer.querySelectorAll(
    `.${gameFieldCssClass}`
  );
  secretComFields = secretCombContainer.querySelectorAll(
    `.${gameFieldCssClass}`
  );

  setRow(resultsContainer.querySelectorAll('.results-row'));

  secretComFields.forEach(field => {
    field.innerHTML =
      '<img src="/assets/images/secret.svg" alt="Question mark">';
    field.className = gameFieldCssClass;
  });
  playGame();
};
