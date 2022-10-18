import { gameField, createField } from '../Components/FieldCreate.js';
import { resultRow, createRow } from '../Components/RowCreate.js';

export const gameBoardContainer = document.querySelector('.game-row');
export const secretCombContainer = document.getElementById('game-header');
export const resultsContainer = document.getElementById('results-col');

export const gameFieldCssClass = 'game-field';

const createGameBoard = () => {
  const startNum = 1;
  const endBoardNum = 24;
  const endRowNum = 6;
  const rowFieldsNum = 4;

  for (let i = startNum; i <= rowFieldsNum; i++) {
    createField(secretCombContainer, gameFieldCssClass);
    gameField.innerHTML =
      '<img src="/assets/images/secret.svg" alt="Question mark">';
  }

  for (let i = startNum; i <= endBoardNum; i++) {
    createField(gameBoardContainer, gameFieldCssClass);
  }

  for (let i = endRowNum; i >= startNum; i--) {
    createRow();
    resultRow.setAttribute('id', `row-${i}`);
    resultsContainer.prepend(resultRow);
    for (let j = startNum; j <= rowFieldsNum; j++) {
      createField(resultRow, gameFieldCssClass);
    }
  }
};

export default createGameBoard;
