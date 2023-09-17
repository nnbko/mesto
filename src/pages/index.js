import './index.css';
import { Card } from "../components/cards.js";
import { FormValidator } from "../components/validation.js";
import { initialCards } from "../utils/constants.js";
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { Section } from '../components/section.js';
import { UserInfo } from '../components/UserInfo.js';
import {profilePopup, buttonOpenProfilePopup, nameText, jobText, elAdd, popupAddPhoto, validationSettings} from '../utils/constants.js'





const editValidator = new FormValidator(profilePopup, validationSettings);
editValidator.enableValidation();

const addValidator = new FormValidator(popupAddPhoto, validationSettings);
addValidator.enableValidation();

const profile = new UserInfo({
    nameSelector: '.profile__name',
    descriptionSelector: '.profile__description'
});
const popupEdit = new PopupWithForm('.popup_profile', {
    handleSubmitForm: (data) => {
        profile.setUserInfo(data);
    }
});

function editProfile() {
    const userData = profile.getUserInfo();
    nameText.value = userData.userName;
    jobText.value = userData.userDescription;
    editValidator.removeErrors();
}

popupEdit.setEventListeners();

buttonOpenProfilePopup.addEventListener('click', function () {
    editProfile();
    popupEdit.open();
});
const popupAdd = new PopupWithForm('.popup_add', {
    handleSubmitForm: (formData) => {
        cards.addItem(createNewCard(formData));
        popupAdd.close();
    }
});

popupAdd.setEventListeners();

elAdd.addEventListener('click', () => {
    popupAdd.open();
    addValidator.removeErrors();
});

const popupOpenCard = new PopupWithImage('.popup_card');
popupOpenCard.setEventListeners();

function createNewCard(data) {
    const card = new Card({
        data,
        handleOpenPopup: () => {
            popupOpenCard.open(data);
        },
        
    }, '.elements-add');
    return card.createCard();
}


const cards = new Section({
    items: initialCards,
    renderer: (initialCard) => {
        return createNewCard(initialCard);
    },
    containerSelector: '.elements',
});
cards.renderItems();