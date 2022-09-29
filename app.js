// DOM elements
const gameBoardContainer = document.querySelector('.game-row');
const selectionContainer = document.getElementById('selection');
const selectionButtons = selectionContainer.querySelectorAll('.game-field');
const resultsContainer = document.getElementById('results-col');
const solutionContainer = document.getElementById('game-header');
const endGameModal = document.getElementById('win-modal');
const newGameModalBtn = endGameModal.querySelector('button');
const closeModalBtn = endGameModal.querySelector('a');
const backdrop = document.getElementById('backdrop');

let resultRow;
let selectionFields;
let resultFields;
let solutionFields;

// Variables
const signs = ['fire', 'lightning', 'wind', 'leaf'];

let gameField;
let randomLogo = '';
let solution = [];
let gameOver = false;

// Game board and random solution creation

const startGame = () => {
  const startBoard = 1;
  const endBoard = 24;
  const startRow = 1;
  const endRow = 6;
  const rowFieldsNum = 4;

  const createRow = () => {
    gameRow = document.createElement('div');
    gameRow.classList = 'results-row';
  };

  const createField = () => {
    gameField = document.createElement('div');
    gameField.classList.add('game-field');
  };

  for (let i = startRow; i <= rowFieldsNum; i++) {
    createField();
    gameField.innerHTML = '<img src="./assets/secret.svg" alt="Question mark">';
    solutionContainer.append(gameField);
  }

  for (let i = startBoard; i <= endBoard; i++) {
    createField();
    gameBoardContainer.append(gameField);
  }

  for (let i = endRow; i >= startRow; i--) {
    createRow();
    gameRow.setAttribute('id', `row-${i}`);
    resultsContainer.prepend(gameRow);
    for (let j = startRow; j <= rowFieldsNum; j++) {
      createField();
      gameRow.append(gameField);
    }
  }

  const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  for (let i = 0; i < signs.length; i++) {
    const randomIndex = getRandomInt(0, signs.length);
    randomSign = signs[randomIndex];
    solution.push(randomSign);
  }
};

startGame();

// Variables for game play

let gameWin = true;
selectionFields = gameBoardContainer.querySelectorAll('.game-field');
solutionFields = solutionContainer.querySelectorAll('.game-field');
resultRow = resultsContainer.querySelectorAll('.results-row');

const playerSelection = [];
const playerRoundSelection = [];
const roundLenght = 4;
let oneRound;
let fieldNumSel = 0;
let fieldNumRes = 0;
let rowIdNum = 0;

// Click event for player selection
selectionButtons.forEach((selector) => {
  const sign = selector.classList[1];
  selector.addEventListener('click', () => {
    if (gameOver === true) {
      return;
    } else playGame(sign);
  });
});

// Display of player selection and game play
const playGame = (sign) => {
  selectionFields[fieldNumSel++].classList.add(sign);
  playerRoundSelection.push(sign);

  if (playerRoundSelection.length === roundLenght) {
    oneRound = playerRoundSelection.splice(0, 5);
    playerSelection.push(oneRound);
    checkResult(solution, oneRound);
  }
};

// Comparing player selection to the secret combination

const checkResult = (arr1, arr2) => {
  const exactMatch = 'exact-match';
  const valueMatch = 'value-match';

  let solutionCopy = [...arr1];
  let oneRoundCopy = [...arr2];
  resultFields = resultRow[rowIdNum].querySelectorAll('.game-field');

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] === arr2[i]) {
      resultFields[i].classList.add(exactMatch);
      solutionCopy[i] = 0;
      arr2[i] = -1;
    }
  }
  if (arr1.every((v, i) => v === oneRoundCopy[i])) {
    displaySolution();
    toggleModal(endGameModal);
  } else if (playerSelection.length >= 6) {
    gameWin = false;
    displaySolution();
    toggleModal(endGameModal);
  }

  for (let j = 0; j < solution.length; j++) {
    if (solutionCopy.indexOf(arr2[j]) !== -1) {
      resultFields[j].classList.add(valueMatch);
      solutionCopy[solutionCopy.indexOf(arr2[j])] = 0;
    }
  }

  rowIdNum++;
  console.log(arr1, playerSelection.length);
};

const displaySolution = () => {
  let index = 0;
  for (const solField of solutionFields) {
    solField.classList.add(solution[index]);
    solField.innerHTML = '';
    index++;
  }
};

const toggleBackdrop = () => backdrop.classList.toggle('visible');

const toggleModal = (gameOver) => {
  const h2 = document.createElement('h2');
  const h3 = document.createElement('h3');

  gameOver.classList.toggle('visible');

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
  toggleModal.bind(this, endGameModal);
  location.reload();
});

closeModalBtn.addEventListener('click', toggleModal.bind(this, endGameModal));
backdrop.addEventListener('click', toggleModal.bind(this, endGameModal));

console.log(solution);
console.log(closeModalBtn);
