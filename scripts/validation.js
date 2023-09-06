export class FormValidator {
  constructor(config, formEl) {
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._formEl = formEl;
    this._inputList = Array.from(this._formEl.querySelectorAll(this._inputSelector));
    this._buttonElement = this._formEl.querySelector(this._submitButtonSelector);
  };



  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formEl.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  };


  _hideInputError(inputElement) {
   const errorElement = this._formEl.querySelector(`.${inputElement.id}-error`);
   inputElement.classList.remove(this._inputErrorClass);
   errorElement.classList.remove(this._errorClass);
   errorElement.textContent = '';
  };


  _hasInvalidInput () {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
   };

   disableButton () {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.setAttribute('disabled', true);
   };

   enableButton () {
    this._buttonElement.classList.remove(this._inactiveButtonClass);
    this._buttonElement.removeAttribute('disabled');
  };

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this.disableButton();
    } else {
      this.enableButton();
    }
  };

  _setEventListeners() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
          this._isValid(inputElement)
          this._toggleButtonState();
        });
    });
   };

  enableValidation() {
    this._toggleButtonState();
    this._setEventListeners();
  };
  removeErrors () {
    this._inputList.forEach(inputElement => {
      this._hideInputError (inputElement);
    });
   }

}

