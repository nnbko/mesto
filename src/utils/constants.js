

export const captionPopupZoomImage = document.querySelector(".popup__title-photo");
export const imagePopupZoomImage = document.querySelector(".popup__image");
export const buttonOpenProfilePopup = document.querySelector(".profile__edit-button");
const profilePopup = document.querySelector(".popup_profile");
export const formPopupEditProfile = profilePopup.querySelector(".popup__form_profile");
export const elAdd = document.querySelector(".profile__add-button");
export const formPopupAddCard = document.querySelector(".popup__form_add");
export const buttonOpenPopupAvatarEdit = document.querySelector(".profile__avatar-edit-button");
export const formPopupAvatarEdit = document.querySelector('.popup__form_avatar-edit');
export const popupConfirmationDeleteCard = document.querySelector('.popup_confirm')
export const popupFormConfirmation = popupConfirmationDeleteCard.querySelector('.popup__form-confirm')
 
export const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__holder',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'popup__submit_inactive',
    inputErrorClass: 'popup__input_invalid',
    errorClass: 'form__input-error_visible'
};

