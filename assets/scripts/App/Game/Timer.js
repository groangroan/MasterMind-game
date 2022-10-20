export let reverseCounter;

export const startCountdown = async () => {
  const { displaySecretCombination } = await import(
    '../Game/SecretCombination.js'
  );
  const { createHighScoreTable, hsButton } = await import('../DB/HighScore.js');
  const { gameStatus, modalClickHandler } = await import(
    '../Game/CheckResults.js'
  );

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
