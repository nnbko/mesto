export class FormValidator {
  constructor(form, config) {
    this._form = form;
    this._listSelectors = config;
    this._inputList = Array.from(this._form.querySelectorAll(this._listSelectors.inputSelector));
    this._button = this._form.querySelector(this._listSelectors.submitButtonSelector);

  }

  _showInputError(inputElement) {
    inputElement.classList.add(this._listSelectors.inputErrorClass);
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._listSelectors.errorClass);
  }

  _hideInputError(inputElement) {
    inputElement.classList.remove(this._listSelectors.inputErrorClass);
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = "";
    errorElement.classList.remove(this._listSelectors.errorClass);
  }
  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidValue() {
    return this._inputList.some((inputElement) => !inputElement.validity.valid);
  }

  setEventListeners() {
    this._toggleButtonState();
    this._form.addEventListener('reset', () => this._removeErrors())
    this._inputList.forEach((input) => {
      input.addEventListener("input", () => {
        this._isValid(input);
        this._toggleButtonState();
      });
    });
  }
  _resetSaveButtonState() {
    this._button.classList.add(this._listSelectors.inactiveButtonClass);
    this._button.disabled = true;
  }
  _enableSaveButton() {
    this._button.classList.remove(this._listSelectors.inactiveButtonClass);
    this._button.disabled = false;
  }

  _toggleButtonState() {
    if (this._hasInvalidValue()) {
      this._resetSaveButtonState();
    } else {
      this._enableSaveButton();
    }
  }

  _removeErrors() {
    this._toggleButtonState();
    this._inputList.forEach((input) => {
      this._hideInputError(input);
    });
  }



}
