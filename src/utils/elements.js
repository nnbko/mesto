export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name  : 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

export const profilePopup = document.querySelector('.popup_profile');
export const buttonOpenProfilePopup = document.querySelector('.profile__edit-button');

export const nameText = document.querySelector('.popup__holder_name_text')
export const jobText = document.querySelector('.popup__holder_job_text')

export const elAdd = document.querySelector('.profile__add-button')
export const popupAddPhoto = document.querySelector('.popup_add')


export const validationSettings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__holder',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'popup__submit_inactive',
    inputErrorClass: 'popup__input_invalid',
    errorClass: 'form__input-error_visible'
};

