export const errMessageHandler = (errMessage, el, errText) => {
  errMessage = document.createElement('p');
  errMessage.textContent = errText;
  errMessage.style.color = 'red';
  errMessage.id = 'err-msg';
  el.after(errMessage);
  return errMessage;
};
