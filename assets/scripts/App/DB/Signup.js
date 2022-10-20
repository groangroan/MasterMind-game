import { default as uuidv4 } from '../../../../node_modules/uuid/dist/esm-browser/v4.js';
import { getUsers } from '../Helpers/LocalStorageHelpers.js';
import {
  formHeaderTabs,
  formBodyElements
} from '../../Components/LoginSignupModal.js';

export const signupForm = document.getElementById('signup');
const uName = signupForm.querySelector('#user-name');
const uLastName = signupForm.querySelector('#user-lastname');
const uEmail = signupForm.querySelector('#user-email');
const uPassword = signupForm.querySelector('#user-pswrd');
const showPass = signupForm.querySelector('img');

let regErrMessage;
const passErrText = `Password must contain more than 4 characters`;
const mailErrText = `Your email must contain @ sign.`;

export const users = getUsers ? JSON.parse(getUsers) : [];

const signupValidation = (newUser, userEmail, userPass) => {
  const mailVal = /@/.test(uEmail.value);

  if (userPass.length < 4) {
    import('../Helpers/ErrorMessage.js').then(msg => {
      if (regErrMessage === undefined) {
        regErrMessage = msg.errMessageHandler(
          regErrMessage,
          showPass,
          passErrText
        );
      } else {
        regErrMessage.textContent = passErrText;
      }
    });
    return;
  }

  if (mailVal === false) {
    import('../Helpers/ErrorMessage.js').then(msg => {
      if (regErrMessage === undefined) {
        regErrMessage = msg.errMessageHandler(
          regErrMessage,
          showPass,
          mailErrText
        );
      }
      regErrMessage.textContent = mailErrText;
    });
    return;
  }

  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    if (user.email === userEmail) {
      console.log(user.mail);
      alert(
        'A user with this email is allready registered. Please try to login!'
      );
      return;
    }
  }

  users.push(newUser);

  formHeaderTabs[1].classList.remove('active');
  formHeaderTabs[0].classList.add('active');
  formBodyElements[1].classList.remove('active');
  formBodyElements[0].classList.add('active');
};

const emptySignupForm = () => {
  uName.value = '';
  uLastName.value = '';
  uEmail.value = '';
  uPassword.value = '';
};

const signupHandler = e => {
  e.preventDefault();

  const userId = uuidv4();
  const userData = {
    id: userId,
    name: uName.value,
    last_name: uLastName.value,
    email: uEmail.value,
    password: uPassword.value,
    score: []
  };

  signupValidation(userData, userData.email, uPassword.value);
  localStorage.setItem('users', JSON.stringify(users));
  emptySignupForm();
};

export const signup = () => {
  import('../../App/Helpers/PassShowHide.js').then(pswrd => {
    pswrd.showPassHandler(showPass, uPassword);
  });

  signupForm.addEventListener('submit', signupHandler);
};
