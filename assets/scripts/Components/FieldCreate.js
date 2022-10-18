export let gameField;

export const createField = (containerEl, elCssClass) => {
  gameField = document.createElement('div');
  gameField.classList.add(elCssClass);
  containerEl.append(gameField);
};
