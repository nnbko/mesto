import { Popup } from './popup.js';
class PopupWithImage extends Popup {
    constructor(popupSelector){
        super(popupSelector);
        this._image = document.querySelector('.popup__image');
        this._caption = document.querySelector('.popup__title-photo');
    }
    open(url, text) {
        super.open();
        this._image.src = url;
        this._image.alt = text;
        this._caption.textContent = text;
    } 
}
export { PopupWithImage }