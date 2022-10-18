import { users } from './Signup.js';
import { allScores } from './Score.js';

const highScoreContainer = document.querySelector('#high-scores');
export const hsTableBody = highScoreContainer.querySelector('tbody');
export const hsRows = hsTableBody.getElementsByTagName('tr');

export const hsButton = highScoreContainer.querySelector('button');

let topTenScores;

export const toggleHighScore = () => {
  highScoreContainer.classList.toggle('visible');
};

const setScores = () => {
  users.map(({ name, last_name, score }) => {
    score.forEach(userScore => {
      let oneGameScore = {
        name: name,
        last_name: last_name,
        score: userScore
      };
      allScores.push(oneGameScore);
    });
  });
};

export const highScoreHandler = () => {
  setScores();
  allScores.sort((a, b) => b.score - a.score);
  topTenScores = allScores.slice(0, 10);
};

export const createHighScoreTable = () => {
  highScoreHandler();
  if (allScores.length > 0) {
    console.log(allScores);
    console.log(topTenScores);

    for (let i = 0; i < topTenScores.length; i++) {
      const hsRow = document.createElement('tr');
      hsTableBody.append(hsRow);
      const hsNum = i + 1;
      const hsName = topTenScores[i].name;
      const hsLastName = topTenScores[i].last_name;
      const hsScore = topTenScores[i].score;

      for (let j = 0; j < 4; j++) {
        const hsField = document.createElement('td');
        hsRows[i].append(hsField);
      }
      const hsPlayer = hsRows[i].getElementsByTagName('td');

      hsPlayer[0].textContent = `${hsNum}.`;
      hsPlayer[1].textContent = hsName;
      hsPlayer[2].textContent = hsLastName;
      hsPlayer[3].textContent = hsScore;
    }

    toggleHighScore();
    allScores.length = 0;
  } else {
    import('../../Components/Modal.js').then(modal => {
      modal.toggleModal();
    });
  }
};
