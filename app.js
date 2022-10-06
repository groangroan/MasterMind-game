const gameBoardContainer = document.querySelector('.game-row');
const selectionContainer = document.getElementById('selection');
const selectionButtons = selectionContainer.querySelectorAll('.game-field');
const resultsContainer = document.getElementById('results-col');
const secretCombinationContainer = document.getElementById('game-header');
const backdrop = document.getElementById('backdrop');
const endGameModal = document.getElementById('end-game-modal');
const newGameModalBtn = endGameModal.querySelector('button');
const closeModalBtn = endGameModal.querySelector('a');

// Variables
let gameField;
let resultRow;
let selectionFields;
let resultFields;
let secretComFields;

const signs = ['fire', 'lightning', 'wind', 'leaf'];
let secretCombination = [];

//Secret combination creation

const getSecretCombination = () => {
  const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  for (let i = 0; i < signs.length; i++) {
    const randomIndex = getRandomInt(0, signs.length);
    randomSign = signs[randomIndex];
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
  gameField.classList.add('game-field');
  containerEl.append(gameField);
};

const createGameBoard = () => {
  const startNum = 1;
  const endBoardNum = 24;
  const endRowNum = 6;
  const rowFieldsNum = 4;

  for (let i = startNum; i <= rowFieldsNum; i++) {
    createField(secretCombinationContainer);
    gameField.innerHTML = '<img src="./assets/secret.svg" alt="Question mark">';
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

createGameBoard();

// Variables for game play

let gameWin;
let gameOver;
selectionFields = gameBoardContainer.querySelectorAll('.game-field');
secretComFields = secretCombinationContainer.querySelectorAll('.game-field');
resultRow = resultsContainer.querySelectorAll('.results-row');

const playerSelection = [];
const playerRoundSelection = [];
const roundLenght = 4;
let fieldNumSel = 0;
let oneRound;
let rowIdNum = 0;

// Display of player selection and game play

const playGame = () => {
  getSecretCombination();
  let sign;
  const selectors = [...selectionButtons];

  if (gameOver === true) {
    return;
  } else {
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
playGame();

// Comparing player selection to the secret combination

const checkResult = () => {
  if (secretCombination.every((v, i) => v === oneRound[i])) {
    gameWin = true;
    displaySecretCombination();
    toggleModal(endGameModal);
  } else if (playerSelection.length >= 6) {
    gameWin = false;
    displaySecretCombination();
    toggleModal(endGameModal);
  }

  matchingResults();
};

// Displaying result fields

const matchingResults = () => {
  resultFields = resultRow[rowIdNum].querySelectorAll('.game-field');

  const [exactMatch, valueMatch, noMatch] = [
    'exact-match',
    'value-match',
    'no-match'
  ];

  let secretCombinationCopy = [...secretCombination];
  let oneRoundCopy = [...oneRound];

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

  let resultFieldsArr = Array.from(resultFields);

  const exactMatchArr = resultFieldsArr.filter(e =>
    e.matches('.game-field.exact-match')
  );
  const valueMatchArr = resultFieldsArr.filter(e =>
    e.matches('.game-field.value-match')
  );
  const noMatchArr = resultFieldsArr.filter(e =>
    e.matches('.game-field.no-match')
  );

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

const toggleModal = () => {
  const h2 = endGameModal.querySelector('h2');
  const h3 = endGameModal.querySelector('h3');

  endGameModal.classList.toggle('visible');

  toggleBackdrop();
  console.log(gameWin);

  if (gameWin === true) {
    h2.style.color = '#32cd32';
    h3.innerHTML = 'Congratulations.';
    h2.innerHTML = 'YOU WON!';
  } else {
    h2.style.color = 'red';
    h3.innerHTML = 'Game Over.';
    h2.innerHTML = 'YOU LOST!';
  }

  return (gameOver = true);
};

const toggleBackdrop = () => {
  backdrop.classList.toggle('visible');
};

const endGameClickHandler = () => {
  toggleModal();
  selectionContainer.replaceWith(selectionContainer.cloneNode(true));
};

newGameModalBtn.addEventListener('click', () => {
  toggleModal(endGameModal);
  resetGame();
  return (gameOver = false);
});

closeModalBtn.addEventListener('click', endGameClickHandler);
backdrop.addEventListener('click', endGameClickHandler);

// Game reset function

const resetGame = () => {
  selectionFields.forEach(field => (field.className = 'game-field'));
  for (let i = 0; i < resultRow.length; i++) {
    const row = resultRow[i].children;
    for (let j = 0; j < row.length; j++) {
      row[j].className = 'game-field';
    }
  }

  secretComFields.forEach(
    field =>
      (field.innerHTML = '<img src="./assets/secret.svg" alt="Question mark">')
  );
  secretCombination = [];
  playerSelection.length = 0;
  playerRoundSelection.lenght = 0;
  oneRound = [];
  fieldNumSel = 0;
  rowIdNum = 0;

  playGame();
};
