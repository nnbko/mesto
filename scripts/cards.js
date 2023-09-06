export class Card {
  constructor(cardObj, cardTemplate, handleImageClick) {
    this._cardName = cardObj.name;
    this._cardLink = cardObj.link;
    this._cardTemplate = document.querySelector(cardTemplate).content.querySelector('.elements__card');
    this._cardNew = this._cardTemplate.cloneNode(true);
    this._cardElementPicture = this._cardNew.querySelector('.elements__image');
    this._cardElementTitle = this._cardNew.querySelector('.elements__title');
    this._cardElementButtonLike = this._cardNew.querySelector('.elements__like');
    this._cardElementButtonDelete = this._cardNew.querySelector('.elements__delete');
    this._handleImageClick = handleImageClick;
  };

  _fillCardData() {
    this._cardElementPicture.src = this._cardLink;
    this._cardElementPicture.alt = this._cardName;
    this._cardElementTitle.textContent = this._cardName;
  };

  _setEventListeners() {
    this._cardElementButtonLike.addEventListener('click', () => {this._handleCardLike()});
    this._cardElementButtonDelete.addEventListener('click', () => {this._handleCardDelete()});
    this._cardElementPicture.addEventListener('click', () => {this._handleCardOpen()});
  }

  _handleCardLike() {
    this._cardElementButtonLike.classList.toggle('elements__like_active');
  };

  _handleCardDelete() {
    this._cardNew.remove();
    this._cardNew = null;
  };

  _handleCardOpen() {
    this._handleImageClick(this._cardLink, this._cardName);
  };

  createCard() {
    this._fillCardData();
    this._setEventListeners();
    return this._cardNew;
  };
}