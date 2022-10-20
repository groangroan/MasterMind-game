export let selectionFields;
export let secretComFields;

export const init = async () => {
  const {
    default: createGameBoard,
    gameBoardContainer,
    gameFieldCssClass,
    secretCombContainer,
    resultsContainer
  } = await import('./GameBoard.js');

  const { loginSignupToggle } = await import(
    '../../Components/LoginSignupModal.js'
  );
  const { gameStatus } = await import('./CheckResults.js');
  const { setRow } = await import('../../Components/RowCreate.js');
  const { default: playGame } = await import('../Game/PlayGame.js');
  if (gameStatus.gameWin || gameStatus.gameLost) {
    const { resetGame } = await import('./ResetGame.js');
    resetGame();
  } else {
    loginSignupToggle();
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
