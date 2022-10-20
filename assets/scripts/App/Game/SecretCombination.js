import { secretComFields } from './Init.js';

const signs = ['fire', 'lightning', 'wind', 'leaf'];
export let secretCombination = [];

export const setSecretComb = val => (secretCombination = val);

export const getSecretCombination = () => {
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

export const displaySecretCombination = () => {
  let index = 0;

  for (const solField of secretComFields) {
    solField.classList.add(secretCombination[index]);
    solField.innerHTML = '';
    index++;
  }
};
