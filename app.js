const gameBoardContainer = document.querySelector('.game-row');
const selectionContainer = document.getElementById('selection');
const selectionButtons = selectionContainer.querySelectorAll('.game-field');
const resultsContainer = document.getElementById('results-col');
const secretCombinationContainer = document.getElementById('game-header');
const endGameModal = document.getElementById('end-game-modal');
const newGameModalBtn = endGameModal.querySelector('button');
const closeModalBtn = endGameModal.querySelector('a');
const backdrop = document.getElementById('backdrop');

// Variables
let gameField;
let resultRow;
let selectionFields;
let resultFields;
let secretCombinationFields;

const signs = ['fire', 'lightning', 'wind', 'leaf'];
let secretCombination = [];

// Game board and random secretCombination creation

const getSecretCombination = () => {
  const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  for (let i = 0; i < signs.length; i++) {
    const randomIndex = getRandomInt(0, signs.length);
    randomSign = signs[randomIndex];
    secretCombination.push(randomSign);
  }
};

const startGame = () => {
  const startNum = 1;
  const endBoard = 24;
  const endRow = 6;
  const rowFieldsNum = 4;

  const createRow = () => {
    resultRow = document.createElement('div');
    resultRow.classList = 'results-row';
  };

  const createField = containerEl => {
    gameField = document.createElement('div');
    gameField.classList.add('game-field');
    containerEl.append(gameField);
  };

  for (let i = startNum; i <= rowFieldsNum; i++) {
    createField(secretCombinationContainer);
    gameField.innerHTML = '<img src="./assets/secret.svg" alt="Question mark">';
  }

  for (let i = startNum; i <= endBoard; i++) {
    createField(gameBoardContainer);
  }

  for (let i = endRow; i >= startNum; i--) {
    createRow();
    resultRow.setAttribute('id', `row-${i}`);
    resultsContainer.prepend(resultRow);
    for (let j = startNum; j <= rowFieldsNum; j++) {
      createField(resultRow);
    }
  }

  getSecretCombination();
};

startGame();

// Variables for game play

let gameWin = true;
let gameOver = false;
selectionFields = gameBoardContainer.querySelectorAll('.game-field');
secretCombinationFields =
  secretCombinationContainer.querySelectorAll('.game-field');
resultRow = resultsContainer.querySelectorAll('.results-row');

const playerSelection = [];
const playerRoundSelection = [];
const roundLenght = 4;
let oneRound;
let fieldNumSel = 0;
let rowIdNum = 0;

// Click event for player selection
selectionButtons.forEach(selector => {
  const sign = selector.classList[1];
  selector.addEventListener('click', () => {
    if (gameOver === true) {
      return;
    } else playGame(sign);
  });
});

// Display of player selection and game play
const playGame = sign => {
  selectionFields[fieldNumSel++].classList.add(sign);
  playerRoundSelection.push(sign);

  if (playerRoundSelection.length === roundLenght) {
    oneRound = playerRoundSelection.splice(0, 4);
    playerSelection.push(oneRound);
    checkResult();
  }
};

// Comparing player selection to the secret combination

const checkResult = () => {
  const exactMatch = 'exact-match';
  const valueMatch = 'value-match';

  let secretCombinationCopy = [...secretCombination];
  let oneRoundCopy = [...oneRound];
  resultFields = resultRow[rowIdNum].querySelectorAll('.game-field');

  for (let i = 0; i < secretCombination.length; i++) {
    if (secretCombination[i] === oneRound[i]) {
      resultFields[i].classList.add(exactMatch);
      secretCombinationCopy[i] = 0;
      oneRound[i] = -1;
    }
  }
  if (secretCombination.every((v, i) => v === oneRoundCopy[i])) {
    displaySecretCombination();
    toggleModal(endGameModal);
  } else if (playerSelection.length >= 6) {
    gameWin = false;
    displaySecretCombination();
    toggleModal(endGameModal);
  }

  for (let j = 0; j < secretCombination.length; j++) {
    if (secretCombinationCopy.indexOf(oneRound[j]) !== -1) {
      resultFields[j].classList.add(valueMatch);
      secretCombinationCopy[secretCombinationCopy.indexOf(oneRound[j])] = 0;
    }
  }

  rowIdNum++;
};

//Displaying the secret combination in header

const displaySecretCombination = () => {
  let index = 0;
  for (const solField of secretCombinationFields) {
    solField.classList.add(secretCombination[index]);
    solField.innerHTML = '';
    index++;
  }
};

// Modal (pop-up display)

const toggleBackdrop = () => backdrop.classList.toggle('visible');

const toggleModal = () => {
  const h2 = document.createElement('h2');
  const h3 = document.createElement('h3');

  endGameModal.classList.toggle('visible');

  toggleBackdrop();

  if (gameWin === true) {
    h3.innerHTML = 'Congratulations.';
    h2.innerHTML = 'YOU WON!';
  } else {
    h2.style.color = 'red';
    h3.innerHTML = 'Game Over.';
    h2.innerHTML = 'YOU LOST!';
  }

  endGameModal.firstElementChild.after(h3, h2);

  return (gameOver = true);
};

newGameModalBtn.addEventListener('click', () => {
  toggleModal(endGameModal);
  location.reload();
});

closeModalBtn.addEventListener('click', toggleModal);
backdrop.addEventListener('click', toggleModal);

console.log(secretCombination);
