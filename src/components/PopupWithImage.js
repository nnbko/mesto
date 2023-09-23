import Popup from "./popup.js";
export default class PopupWithImage extends Popup {
    constructor({ popupSelector, imagePopupZoomImage, captionPopupZoomImage }) {
        super({ popupSelector })
        this.imagePopupZoomImage = imagePopupZoomImage;
        this.captionPopupZoomImage = captionPopupZoomImage;
    }

    open(url, text) {
        this.imagePopupZoomImage.src = url;
        this.imagePopupZoomImage.alt = text;
        this.captionPopupZoomImage.textContent = text;

        super.open();
    }

}

