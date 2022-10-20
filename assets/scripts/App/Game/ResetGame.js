import { gameFieldCssClass } from './GameBoard.js';
import { resultRow } from '../../Components/RowCreate.js';
import {
  playerSelection,
  playerRoundSelection,
  oneRound,
  setFieldNumSel
} from './PlayGame.js';
import { gameStatus, setRowIdNum } from './CheckResults.js';
import { setSecretComb } from './SecretCombination.js';
import { selectionFields } from './Init.js';
import { hsTableBody } from '../DB/HighScore.js';
import { startCountdown } from './Timer.js';

export const resetGame = () => {
  selectionFields.forEach(field => (field.className = gameFieldCssClass));
  for (let i = 0; i < resultRow.length; i++) {
    const row = resultRow[i].children;
    for (let j = 0; j < row.length; j++) {
      row[j].className = gameFieldCssClass;
    }
  }

  while (hsTableBody.firstChild) {
    hsTableBody.removeChild(hsTableBody.firstChild);
  }

  setSecretComb([]);
  playerSelection.length = 0;
  playerRoundSelection.lenght = 0;
  oneRound.lenght = 0;
  setRowIdNum(0);
  setFieldNumSel(0);
  gameStatus.gameLost = false;
  gameStatus.gameWin = false;
  startCountdown();
};
