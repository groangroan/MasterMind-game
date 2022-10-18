import { users } from './Signup.js';
import { form } from '../../Components/LoginSignupModal.js';
import { backdrop } from '../../Components/Modal.js';
import { resultsContainer } from '../GameBoard.js';

export const loginForm = document.getElementById('login');
const showPass = loginForm.querySelector('img');
const logEmail = loginForm.querySelector('#email');
const logPassword = loginForm.querySelector('#pswrd');
let logErrMessage;

export let user;

const logErrText = `You've entered the wrong email or password. Please try again`;

export const login = () => {
  import('../../Components/LoginSignupModal.js').then(pswrd => {
    pswrd.showPassHandler(showPass, logPassword);
  });

  const loginHandler = e => {
    e.preventDefault();
    const userLogEmail = logEmail.value;
    const userLogPass = logPassword.value;
    user = users.find(
      u => u.email === userLogEmail && u.password === userLogPass
    );

    if (user) {
      form.classList.remove('visible');
      backdrop.classList.remove('visible');

      const unameDisplay = document.createElement('div');
      unameDisplay.textContent = `${user.name} ${user.last_name}`;
      unameDisplay.style.color = '#ffffff';
      unameDisplay.style.fontSize = '24px';
      unameDisplay.style.paddingBottom = '30px';

      resultsContainer.prepend(unameDisplay);
      import('../Timer.js').then(timer => {
        timer.startCountdown();
      });
    } else if (logErrMessage === undefined) {
      import('../../Components/LoginSignupModal.js').then(msg => {
        logErrMessage = msg.errMessageHandler(
          logErrMessage,
          showPass,
          logErrText
        );
        logEmail.value = '';
        logPassword.value = '';
      });
    } else {
      logEmail.value = '';
      logPassword.value = '';
    }
  };

  loginForm.addEventListener('submit', loginHandler);
};
