import { backdrop } from './Modal.js';

export const form = document.querySelector('.log-reg-form');
export const formHeader = form.querySelector('.form-header');
export const formHeaderTabs = formHeader.querySelectorAll('div');
export const formBody = form.querySelector('.form-body');
export const formBodyElements = formBody.querySelectorAll('form');

const loginId = 'login';
const signupId = 'signup';

export const loginSignupToggle = () => {
  form.classList.toggle('visible');
  backdrop.classList.toggle('visible');

  for (let i = 0; i < formHeaderTabs.length; i++) {
    if (formBodyElements[i].id === loginId) {
      import('../App/DB/Login.js').then(login => {
        login.login();
      });
    } else if (formBodyElements[i].id === signupId) {
      import('../App/DB/Signup.js').then(signup => {
        signup.signup();
      });
    }
    formHeaderTabs[i].addEventListener('click', () => {
      formHeader.querySelector('.active').classList.remove('active');
      formHeaderTabs[i].classList.add('active');
      formBody.querySelector('.active').classList.remove('active');
      formBodyElements[i].classList.add('active');
    });
  }
};

export const errMessageHandler = (errMessage, el, errText) => {
  errMessage = document.createElement('p');
  errMessage.textContent = errText;
  errMessage.style.color = 'red';
  errMessage.id = 'err-msg';
  el.after(errMessage);
  return errMessage;
};

export const showPassHandler = (el, pass) => {
  el.addEventListener('click', () => {
    if (pass.type === 'password') {
      pass.type = 'text';
    } else {
      pass.type = 'password';
    }
  });
};
