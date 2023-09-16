import Popup from "./popup.js";

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupPhoto = this._popup.querySelector('.popup__image');
        this._popupTitle = this._popup.querySelector('.popup__title-photo');
    }

    open(data) {
        this._popupPhoto.src = data.link;
        this._popupPhoto.alt = data.name;
        this._popupTitle.textContent = data.name;
        super.open();
    }
}