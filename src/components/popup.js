class Popup {

    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._buttonClosePopup = this._buttonClosePopup .bind(this);
    }

    setEventListeners() {
        this._popup.addEventListener('mousedown', evt => {
            if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close')) {
                this.close();
            }
        })
    }

    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._buttonClosePopup );
    }

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._buttonClosePopup );
    }

    _buttonClosePopup(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }
}
export { Popup }