class Card {
  constructor(data, templateSelector, handleCardLike, handleTrashClick, idProfile, renderLikeCard) {
    this._data = data;
    this._ownerId = data.owner._id;
    this._idProfile = idProfile;
    this._openPopupZoomImage = renderLikeCard;
    this._openPopupConfirmation = handleTrashClick;
    this._handleCardLike = handleCardLike;
    this._template = templateSelector;
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".elements__image");
    this._cardTitle = this._element.querySelector(".elements__title");
    this._likeIcon = this._element.querySelector(".elements__like");
    this._likelikesCountElement = this._element.querySelector(".element__like-count");
    this._deleteButton = this._element.querySelector(".elements__delete");
  }
  _getTemplate() {
    return document
      .querySelector(this._template)
      .content.querySelector(".elements__card")
      .cloneNode(true);
  }

  generateCard() {
    this._cardImage.alt = this._data.name;
    this._cardImage.src = this._data.link;
    this._cardTitle.textContent = this._data.name;
    this._setEventListeners();
    this._checkDeleteButtonVisibility();
    return this._element;
  }
  _setEventListeners() {
    this._likeIcon.addEventListener("click", () => {
      this._handleCardLike(this);
    });

    this._deleteButton.addEventListener("click", () => {
      this._openPopupConfirmation(this);
    });
    this._updateLike();

    this._cardImage.addEventListener("click", () => {
      this._openPopupZoomImage(this._data.link, this._data.name);
    });
  }
  deleteCard() {
    this._element.remove();
    this._element = null;
  }
  _updateLike() {
    this._likelikesCountElement.textContent = this._data.likes.length;
    if (this.isLiked()) {
      this._likeIcon.classList.add('elements__like_active');
    } else {
      this._likeIcon.classList.remove('elements__like_active');
    }
  }
  setLikesData(data) {
    this._data.likes = data.likes;
    this._updateLike();
  }
  _checkDeleteButtonVisibility() {
    if (this._idProfile !== this._ownerId) {
      this._deleteButton.remove();
    }
  }
  isLiked() {
    return this._data.likes.some((item) => {
      return item._id === this._idProfile;
    })
  }
  getId() {
    return this._data._id;
  }
}
export { Card };