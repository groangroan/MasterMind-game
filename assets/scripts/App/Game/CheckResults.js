import { oneRound } from './PlayGame.js';

export let rowIdNum = 0;
export const setRowIdNum = num => (rowIdNum = num);

export const gameStatus = {
  gameWin: false,
  gameLost: false,
  gameOver: false
};

export const checkResult = () => {
  const maxRoundsNum = 6;
  Promise.all([
    import('./PlayGame.js'),
    import('./SecretCombination.js'),
    import('../DB/Score.js'),
    import('../DB/HighScore.js')
  ]).then(([play, secret, score, highScore]) => {
    if (secret.secretCombination?.every((v, i) => v === oneRound[i])) {
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
    import('../../Components/RowCreate.js'),
    import('./GameBoard.js'),
    import('./SecretCombination.js')
  ]).then(([row, cssClass, secret]) => {
    let resultFields = row.resultRow[rowIdNum].querySelectorAll(
      `.${cssClass.gameFieldCssClass}`
    );

    let resultFieldsArr = Array.from(resultFields);
    const [exactMatch, valueMatch] = ['exact-match', 'value-match'];

    const secretCombinationCopy = [...secret.secretCombination];
    const oneRoundCopy = [...oneRound];

    for (let i = 0; i < secret.secretCombination.length; i++) {
      if (secret.secretCombination[i] === oneRoundCopy[i]) {
        resultFields[i].classList.add(exactMatch);
        secretCombinationCopy[i] = 0;
        oneRoundCopy[i] = -1;
      }
    }

    for (let j = 0; j < secret.secretCombination.length; j++) {
      if (secretCombinationCopy.indexOf(oneRoundCopy[j]) !== -1) {
        resultFields[j].classList.add(valueMatch);
        secretCombinationCopy[secretCombinationCopy.indexOf(oneRound[j])] = 0;
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
    const noMatchArr = resultFieldsArr.filter(
      e =>
        !e.classList.contains(`${exactMatch}`) &&
        !e.classList.contains(`${valueMatch}`)
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
    import('../../Components/Modal.js'),
    import('../DB/HighScore.js')
  ]).then(([modal, highScore]) => {
    highScore.toggleHighScore();
    modal.toggleModal();
    highScore.hsButton.removeEventListener('click', modalClickHandler);
  });
};
