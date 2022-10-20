import { user } from './Login.js';
import { users } from './Signup.js';
import { playerSelection } from '../Game/PlayGame.js';
import { setLS } from '../Helpers/LocalStorageHelpers.js';
import { reverseCounter } from '../Game/Timer.js';

export const allScores = [];

export const setScore = (val, cur) => {
  let roundScore = 20 * (7 - val) + reverseCounter;
  cur.push(roundScore);
  return roundScore;
};

export const updateScore = () => {
  const curUser = users.find(u => u.id === user.id);

  setScore(playerSelection.length, curUser.score);

  setLS(users);
};
