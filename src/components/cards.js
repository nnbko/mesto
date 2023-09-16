export class Card { 
  constructor({data, handleOpenPopup}, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._handleOpenPopup = handleOpenPopup;
    this._templateSelector = templateSelector;
  }; 
  _getTemplate() {
    return document.querySelector(this._templateSelector).content.querySelector('.elements__card') .cloneNode(true);
}

_handleLikeButton() {
    this._likeButton.classList.toggle('elements__like_active');
}

_handleDeleteCard() {
    this._element.remove();
    this._element = null;
}

_setEventListeners() {
    this._element.querySelector('.elements__image').addEventListener('click', () => {
        this._handleOpenPopup();
    })
    this._element.querySelector('.elements__delete').addEventListener('click', () => {
        this._handleDeleteCard();
    })
    this._likeButton.addEventListener('click', () => {
        this._handleLikeButton();
    })
}

createCard() {
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector('.elements__like');
    this._elementPhoto = this._element.querySelector('.elements__image');
    this._elementTitle = this._element.querySelector('.elements__title');
    this._elementPhoto.src = this._link;
    this._elementPhoto.alt = this._name;
    this._elementTitle.textContent = this._name;
    this._setEventListeners();
    return this._element;
}
}


  