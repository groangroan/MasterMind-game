import {
  toggleModal,
  endGameClickHandler
} from './assets/scripts/Components/Modal.js';

//DOM elements

const gameBoardContainer = document.querySelector('.game-row');
const resultsContainer = document.getElementById('results-col');
const secretCombContainer = document.getElementById('game-header');
export const selectionContainer = document.getElementById('selection');
const selectionButtons = selectionContainer.querySelectorAll('.game-field');
// Variables
let gameField;
const gameFieldCssClass = 'game-field';
let resultRow;
let selectionFields;
let resultFields;
let secretComFields;

let gameWin;
let gameLost;
let gameOver;

const playerSelection = [];
const playerRoundSelection = [];
let oneRound;

const roundLenght = 4;
let fieldNumSel = 0;
let rowIdNum = 0;

const signs = ['fire', 'lightning', 'wind', 'leaf'];
let secretCombination = [];

//Secret combination creation

const getSecretCombination = () => {
  const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  for (let i = 0; i < signs.length; i++) {
    const randomIndex = getRandomInt(0, signs.length);
    const randomSign = signs[randomIndex];
    secretCombination.push(randomSign);
  }
  console.log(secretCombination);
};

// Game board creation

const createRow = () => {
  resultRow = document.createElement('div');
  resultRow.classList = 'results-row';
};

const createField = containerEl => {
  gameField = document.createElement('div');
  gameField.classList.add(gameFieldCssClass);
  containerEl.append(gameField);
};

const createGameBoard = () => {
  const startNum = 1;
  const endBoardNum = 24;
  const endRowNum = 6;
  const rowFieldsNum = 4;

  for (let i = startNum; i <= rowFieldsNum; i++) {
    createField(secretCombContainer);
    gameField.innerHTML =
      '<img src="/assets/images/secret.svg" alt="Question mark">';
  }

  for (let i = startNum; i <= endBoardNum; i++) {
    createField(gameBoardContainer);
  }

  for (let i = endRowNum; i >= startNum; i--) {
    createRow();
    resultRow.setAttribute('id', `row-${i}`);
    resultsContainer.prepend(resultRow);
    for (let j = startNum; j <= rowFieldsNum; j++) {
      createField(resultRow);
    }
  }
};

export const init = () => {
  if (gameWin || gameLost) {
    selectionFields.forEach(field => (field.className = gameFieldCssClass));
    for (let i = 0; i < resultRow.length; i++) {
      const row = resultRow[i].children;
      for (let j = 0; j < row.length; j++) {
        row[j].className = gameFieldCssClass;
      }
    }
    endGameClickHandler();

    secretCombination = [];
    playerSelection.length = 0;
    playerRoundSelection.lenght = 0;
    oneRound = [];
    fieldNumSel = 0;
    rowIdNum = 0;
  } else {
    createGameBoard();
  }

  selectionFields = gameBoardContainer.querySelectorAll(
    `.${gameFieldCssClass}`
  );
  secretComFields = secretCombContainer.querySelectorAll(
    `.${gameFieldCssClass}`
  );
  resultRow = resultsContainer.querySelectorAll('.results-row');

  secretComFields.forEach(field => {
    field.innerHTML =
      '<img src="/assets/images/secret.svg" alt="Question mark">';
    field.className = gameFieldCssClass;
  });

  playGame();
};

const playGame = () => {
  let sign;
  const selectors = [...selectionButtons];
  getSecretCombination();
  if (!gameOver) {
    selectors.forEach(selector => {
      selector.addEventListener('click', () => {
        sign = selector.classList[1];
        selectionFields[fieldNumSel++].classList.add(sign);
        playerRoundSelection.push(sign);

        if (playerRoundSelection.length === roundLenght) {
          oneRound = playerRoundSelection.splice(0, 4);
          playerSelection.push(oneRound);
          checkResult();
        }
      });
    });
  }
};

init();

// Comparing player selection to the secret combination

const checkResult = () => {
  const maxRoundsNum = 6;

  if (secretCombination.every((v, i) => v === oneRound[i])) {
    gameWin = true;
    displaySecretCombination();
    toggleModal(gameWin, gameOver);
  } else if (playerSelection.length >= maxRoundsNum) {
    gameLost = true;
    displaySecretCombination();
    toggleModal(gameLost, gameOver);
  }
  matchingResults();
};

// Displaying result fields

const matchingResults = () => {
  resultFields = resultRow[rowIdNum].querySelectorAll(`.${gameFieldCssClass}`);
  let resultFieldsArr = Array.from(resultFields);
  const [exactMatch, valueMatch, noMatch] = [
    'exact-match',
    'value-match',
    'no-match'
  ];

  const secretCombinationCopy = [...secretCombination];
  const oneRoundCopy = [...oneRound];

  for (let i = 0; i < secretCombination.length; i++) {
    if (secretCombination[i] === oneRoundCopy[i]) {
      resultFields[i].classList.add(exactMatch);
      secretCombinationCopy[i] = 0;
      oneRoundCopy[i] = -1;
    }
  }

  for (let j = 0; j < secretCombination.length; j++) {
    if (secretCombinationCopy.indexOf(oneRoundCopy[j]) !== -1) {
      resultFields[j].classList.add(valueMatch);
      secretCombinationCopy[secretCombinationCopy.indexOf(oneRound[j])] = 0;
    } else if (!resultFields[j].classList.contains(exactMatch)) {
      resultFields[j].classList.add(noMatch);
    }
  }

  for (const resField of resultFields) {
    resField.remove();
  }

  const exactMatchArr = resultFieldsArr.filter(e =>
    e.matches(`.${gameFieldCssClass}.${exactMatch}`)
  );
  const valueMatchArr = resultFieldsArr.filter(e =>
    e.matches(`.${gameFieldCssClass}.${valueMatch}`)
  );
  const noMatchArr = resultFieldsArr.filter(e =>
    e.matches(`.${gameFieldCssClass}.${noMatch}`)
  );
  // probati bez no match klase
  resultFieldsArr = [...exactMatchArr, ...valueMatchArr, ...noMatchArr];

  for (const resField of resultFieldsArr) {
    resultRow[rowIdNum].append(resField);
  }

  rowIdNum++;
};

//Displaying the secret combination in header

const displaySecretCombination = () => {
  let index = 0;
  for (const solField of secretComFields) {
    solField.classList.add(secretCombination[index]);
    solField.innerHTML = '';
    index++;
  }
};

// Modal (pop-up display)
