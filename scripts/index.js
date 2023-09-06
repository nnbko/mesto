import { Card } from "./cards.js";
import { FormValidator } from "./validation.js";
import { initialCards } from "./elements.js";

const popups = Array.from(document.querySelectorAll('.popup'));
//const form = document.querySelector('.popup__form')
//инициализация переменных для открытия закрытия попапа
const profilePopup = document.querySelector('.popup_profile');
const buttonOpenProfilePopup = document.querySelector('.profile__edit-button');
//const buttonCloseProfilePopup = profilePopup.querySelector('.popup__close');
//инициализация переменных для изменения данных попапа
const profileForm = document.querySelector('.popup__form_profile')
const nameInput = document.querySelector('.profile__name')
const jobInput = document.querySelector('.profile__description')
const nameText = document.querySelector('.popup__holder_name_text')
const jobText = document.querySelector('.popup__holder_job_text')
//инициализация переменных для открытия фото
//const cardsContainer = document.querySelector('.elements');
const popupFull = document.querySelector('.popup_card')
//const popupCloseFull = document.querySelector('.popup__close_photo')
const popupImage = document.querySelector('.popup__image')
const popupTitle = document.querySelector('.popup__title-photo')
//добавление карточки
const elAdd = document.querySelector('.profile__add-button')
const popupAdd = document.querySelector('.popup_add')
const popupName = popupAdd.querySelector('.popup__holder_input_name')
const popupSrc = popupAdd.querySelector('.popup__holder_input_src')
//const popupClose = popupAdd.querySelector('.popup__close_add')
//const card = document.querySelector('.elements__card')
//const template = document.querySelector('#elements-add').content;

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


/**
const clickOnOverlay = (evt) => {
    if (evt.target.classList.contains('popup')) {
        closePopup(evt.target);
    }
};

const clickOnEsc = (evt) => {
    if (evt.key === 'Escape') {
        const popupOpened = document.querySelector('.popup_opened');
        closePopup(popupOpened);
    }
};
//реализации функции лайка
const handleLikeButton = (evt) => {
    evt.target.classList.toggle('elements__like_active');
}
const deleteCard = (evt) => {
    evt.target.closest('.elements__card').remove();
}
//фунцкция передачи данныз в попап
const openEditProfilePopup = () => {
    nameText.value = nameInput.textContent;
    jobText.value = jobInput.textContent;
    openPopup(profilePopup);
}
//функции открытия и закрытия попапа 
const openPopup = (popupElement) => {
    popupElement.classList.add('popup_opened');
    document.addEventListener('keyup', clickOnEsc);
    document.addEventListener('click', clickOnOverlay);
}
const closePopup = (popupElement) => {
    popupElement.classList.remove('popup_opened');
    document.removeEventListener('click', clickOnOverlay);
    document.removeEventListener('keydown', clickOnEsc);
}
const handleProfileFormSubmit = (evt) => {
    evt.preventDefault();
    nameInput.textContent = nameText.value;
    jobInput.textContent = jobText.value;
    closePopup(profileForm);
};

*/
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
const openPopupEditProfile = () => {
    nameText.value = nameInput.textContent;
    jobText.value = jobInput.textContent;
    openPopup(profilePopup);
};

const handleFormEditSubmit = (evt) => {
    evt.preventDefault();

    nameInput.textContent = jobText.value;
    jobInput.textContent = jobText.value;

    closePopup(profilePopup);
};

const createPhoto = (cardData) => {
    return new Card(cardData, '.elements-add', openCard).createCard();
};

const placeInitialCards = () => {
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

const AddPlaceOpen = () => {
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
    nameInput.textContent = jobText.value;
    jobInput.textContent = jobText.value;
    closePopup(profilePopup);
});

placeInitialCards();
setEventListenersToClosePopups();





buttonOpenProfilePopup.addEventListener('click', openPopupEditProfile);
profileForm.addEventListener('submit', handleFormEditSubmit);

elAdd.addEventListener('click', AddPlaceOpen);
popupAdd.addEventListener('submit', handleFormAddSubmit);




/**
function createCard(item) {

    const el = template.cloneNode(true);
    const elementsImage = el.querySelector('.elements__image')
    elementsImage.src = item.link;
    elementsImage.alt = item.name;
    const elementsTitle = el.querySelector('.elements__title')
    elementsTitle.textContent = item.name;


    const likeButton = el.querySelector('.elements__like')
    const cardDelete = el.querySelector('.elements__delete')



    function handleOpenImagePopup() {
        popupImage.src = elementsImage.src;
        popupTitle.textContent = elementsTitle.textContent;
        popupImage.alt = elementsImage.alt;
        openPopup(popupFull);
    }


    cardDelete.addEventListener('click', deleteCard);
    elementsImage.addEventListener('click', handleOpenImagePopup);
    likeButton.addEventListener('click', handleLikeButton);
    return el;
};
const render = () => {
    initialCards.forEach((item) => {
        cardsContainer.append(createCard(item));
    });
};

function addCard(evt) {
    evt.preventDefault();
    cardsContainer.prepend(createCard({ name: popupName.value, link: popupSrc.value }));
    closePopupAdd();
    evt.target.reset();
    disableButton(cardForm, validationSettings);
};

cardForm.addEventListener('submit', addCard)
//обработчики событий
render()
elAdd.addEventListener('click', openPopupAdd);
buttonOpenProfilePopup.addEventListener('click', openEditProfilePopup);
buttonCloseProfilePopup.addEventListener('click', closePopupFormEdit);
profileForm.addEventListener("submit", handleProfileFormSubmit);
popupCloseFull.addEventListener('click', closePopupView);
popupClose.addEventListener('click', closePopupAdd);
const validationFormEdit = new FormValidator(validationSettings, profileForm);
const validationFormContent = new FormValidator(validationSettings, cardForm);
validationFormEdit.enableValidation();
validationFormContent.enableValidation();
*/