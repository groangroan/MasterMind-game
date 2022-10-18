import { secretCombination } from './SecretCombination.js';
import { oneRound } from './PlayGame.js';

export let rowIdNum = 0;
export const setRowIdNum = num => (rowIdNum = num);

export const gameStatus = {
  gameWin: false,
  gameLost: false,
  gameOver: false
};

// export let gameWin = false;
// export let gameOver = false;
// export let gameLost = false;

// export const setGameLost = val => (gameLost = val);
// export const setGameWin = val => (gameWin = val);
// export const setGameOver = val => (gameOver = val);

export const checkResult = () => {
  const maxRoundsNum = 6;
  Promise.all([
    import('./PlayGame.js'),
    import('./SecretCombination.js'),
    import('../App/DB/Score.js'),
    import('../App/DB/HighScore.js')
  ]).then(([play, secret, score, highScore]) => {
    if (secretCombination?.every((v, i) => v === oneRound[i])) {
      gameStatus.gameWin = true;
      score.updateScore();
      secret.displaySecretCombination();
      highScore.createHighScoreTable();

      highScore.hsButton.addEventListener('click', modalClickHandler);
    } else if (play.playerSelection.length >= maxRoundsNum) {
      gameStatus.gameLost = true;
      secret.displaySecretCombination();
      highScore.createHighScoreTable();
      highScore.hsButton.addEventListener('click', modalClickHandler);
    }
  });

  matchingResults();
};

export const matchingResults = () => {
  Promise.all([
    import('../Components/RowCreate.js'),
    import('./GameBoard.js')
  ]).then(([row, cssClass]) => {
    let resultFields = row.resultRow[rowIdNum].querySelectorAll(
      `.${cssClass.gameFieldCssClass}`
    );

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
      e.matches(`.${cssClass.gameFieldCssClass}.${exactMatch}`)
    );
    const valueMatchArr = resultFieldsArr.filter(e =>
      e.matches(`.${cssClass.gameFieldCssClass}.${valueMatch}`)
    );
    const noMatchArr = resultFieldsArr.filter(e =>
      e.matches(`.${cssClass.gameFieldCssClass}.${noMatch}`)
    );

    resultFieldsArr = [...exactMatchArr, ...valueMatchArr, ...noMatchArr];

    for (const resField of resultFieldsArr) {
      row.resultRow[rowIdNum].append(resField);
    }

    rowIdNum++;
  });
};

export const modalClickHandler = () => {
  Promise.all([
    import('../Components/Modal.js'),
    import('../App/DB/HighScore.js')
  ]).then(([modal, highScore]) => {
    highScore.toggleHighScore();
    modal.toggleModal();
    highScore.hsButton.removeEventListener('click', modalClickHandler);
  });
};
