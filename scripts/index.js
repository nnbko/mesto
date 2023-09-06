import { Card } from "./cards.js";
import { FormValidator } from "./validation.js";
import { initialCards } from "./elements.js";

const popups = Array.from(document.querySelectorAll('.popup'));

//инициализация переменных для открытия закрытия попапа
const profilePopup = document.querySelector('.popup_profile');
const buttonOpenProfilePopup = document.querySelector('.profile__edit-button');

//инициализация переменных для изменения данных попапа
const profileForm = document.querySelector('.popup__form_profile')
const nameInput = document.querySelector('.profile__name')
const jobInput = document.querySelector('.profile__description')
const nameText = document.querySelector('.popup__holder_name_text')
const jobText = document.querySelector('.popup__holder_job_text')
//инициализация переменных для открытия фото

const popupFull = document.querySelector('.popup_card')

const popupImage = document.querySelector('.popup__image')
const popupTitle = document.querySelector('.popup__title-photo')
//добавление карточки
const elAdd = document.querySelector('.profile__add-button')
const popupAdd = document.querySelector('.popup_add')
const popupName = popupAdd.querySelector('.popup__holder_input_name')
const popupSrc = popupAdd.querySelector('.popup__holder_input_src')


const cardForm = document.querySelector('.popup__form_add')

const elementsImage = document.querySelector('.elements');

const validationSettings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__holder',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'popup__submit_inactive',
    inputErrorClass: 'popup__input_invalid',
    errorClass: 'form__input-error_visible'
};



const openCard = (url, caption) => {
    popupImage.src = url;
    popupTitle.textContent = caption;
    popupImage.alt = caption;
    openPopup(popupFull);
};

const closePopupClickOnEsc = (evt) => {
    if (evt.code === 'Escape') {
        closePopup(document.querySelector('.popup_opened'));
    }
};

const openPopup = (popupElement) => {
    popupElement.classList.add('popup_opened');
    document.addEventListener('keyup', closePopupClickOnEsc);
};

const closePopup = (popupElement) => {
    popupElement.classList.remove('popup_opened');
    document.removeEventListener('keyup', closePopupClickOnEsc);
};


const setEventListenersToClosePopups = () => {
    popups.forEach((popup) => {
        popup.addEventListener('mouseup', (evt) => {
            const targetClassList = evt.target.classList;
            if (targetClassList.contains('popup') || targetClassList.contains('popup__close')) {
                closePopup(popup);
            }
        })
    });
};


const createPhoto = (cardData) => {
    return new Card(cardData, '.elements-add', openCard).createCard();
};

const createInitialCards = () => {
    initialCards.map(item => {
        elementsImage.append(createPhoto(item));
    });
};
const handleFormAddSubmit = (evt) => {
    evt.preventDefault();
    const cardData = { name: popupName.value, link: popupSrc.value };
    elementsImage.prepend(createPhoto(cardData));
    cardForm.reset();
    closePopup(popupAdd);
};

const addPlaceOpen = () => {
    openPopup(popupAdd);
};
const validatorAddCard = new FormValidator(validationSettings, cardForm);
validatorAddCard.enableValidation()

elAdd.addEventListener("click", function () {
    openPopup(popupAdd);
    validatorAddCard.removeErrors();
    validatorAddCard.disableButton();
});

const validatorEditProfile = new FormValidator(validationSettings, profileForm);
validatorEditProfile.enableValidation();




buttonOpenProfilePopup.addEventListener("click", function () {
    openPopup(profilePopup);
    nameText.value = nameInput.textContent;
    jobText.value = jobInput.textContent;
    validatorEditProfile.removeErrors();

});
profileForm.addEventListener("submit", function (event) {
    event.preventDefault();
    nameInput.textContent = nameText.value;
    jobInput.textContent = jobText.value;
    closePopup(profilePopup);
});

createInitialCards();
setEventListenersToClosePopups();




elAdd.addEventListener('click', addPlaceOpen);
popupAdd.addEventListener('submit', handleFormAddSubmit);



