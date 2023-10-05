import { Popup } from './Popup.js';

class PopupWithForm extends Popup {
    constructor(popupSelector, { handleSubmit = null }) {
        super(popupSelector);
        this._handleSubmit = handleSubmit;
        this._form = this._popup.querySelector('.popup__form');
        this._inputList = this._form.querySelectorAll('.popup__holder');
        this._submitButton = this._form.querySelector('.popup__save');
        this._submitBtnText = this._submitButton.textContent;
    }
    _getInputValues() {
        const inputValuesObj = {};
        this._inputList.forEach(input => {
            inputValuesObj[input.name] = input.value;
        });
        return inputValuesObj;
    }
    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleSubmit(this._getInputValues());
        });
    }
    renderLoading(isLoading, loadingText = 'Сохранение...') {
        if (isLoading) {
            this._submitButton.textContent = loadingText;
        } else {
            this._submitButton.textContent = this._submitBtnText;
        }
    }
    close() {
        super.close();
        this._form.reset();
    }
}
export { PopupWithForm }
