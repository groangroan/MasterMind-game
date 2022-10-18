export let resultRow;

export const createRow = () => {
  resultRow = document.createElement('div');
  resultRow.classList = 'results-row';
};

export const setRow = newRow => {
  resultRow = newRow;
};
