const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__holder',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__input_invalid',
  errorClass: 'popup__input-error'
}

const showInputError = (inputElement, errorMessage, validationSettings) => {
  inputElement.classList.add(validationSettings.inputErrorClass);
  errorMessage.classList.add(validationSettings.errorClass);
  errorMessage.textContent = inputElement.validationMessage;
};

const hideInputError = (inputElement, errorMessage, validationSettings) => {
  inputElement.classList.remove(validationSettings.inputErrorClass);
  errorMessage.classList.remove(validationSettings.errorClass);
  errorMessage.textContent = "";
};
function enableButton(formElement, validationConfig) {
  const submitButtonElement = formElement.querySelector(validationConfig.submitButtonSelector);
  submitButtonElement.disabled = false;
  submitButtonElement.classList.remove(validationConfig.inactiveButtonClass);
}
function disableButton(formElement, validationSettings) {
  const submitButtonElement = formElement.querySelector(validationSettings.submitButtonSelector);
  submitButtonElement.disabled = true;
  submitButtonElement.classList.add(validationSettings.inactiveButtonClass);
}

const toggleButtonState = (formElement,validationSettings) => {
  if (!formElement.checkValidity()) {
    disableButton(formElement, validationSettings);
  } else {
    enableButton(formElement, validationSettings);
  }
};



function checkInputValidity(inputElement, validationSettings) {
  const errorElement = document.querySelector(`.${inputElement.id}-error`);
  if (!inputElement.validity.valid) {
    showInputError(inputElement, errorElement, validationSettings);
  } else {
    hideInputError(inputElement, errorElement, validationSettings);
  }
}

const setEventListeners = (formElement, validationSettings) => {
  const inputList = Array.from(formElement.querySelectorAll(validationSettings.inputSelector));
  toggleButtonState(formElement, validationSettings);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(inputElement, validationSettings);
      toggleButtonState(formElement, validationSettings);
    });
  });
};

function enableValidation(validationSettings) {
  const formList = document.querySelectorAll(validationSettings.formSelector);
  formList.forEach((formElement) => {
    setEventListeners(formElement, validationSettings);
  });
}

enableValidation(validationSettings);




