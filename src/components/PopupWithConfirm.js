import { Popup } from "./popup.js";

class PopupConfirm extends Popup {
    constructor(popupSelector, popupSubmitCallback) {
        super(popupSelector);
        this._form = this._popup.querySelector('.popup__form-confirm');
        this._submitButton = this._form.querySelector('.popup__save');
        this._submitBtnText = this._submitButton.textContent
        this._handleSubmit  = popupSubmitCallback;
    }

    setCallback(submitCb) {
        this._handleSubmit  = submitCb;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleSubmit ();
        });
    }
    renderLoading(isLoading, loadingText = 'Удаление...') {
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

export { PopupConfirm }