import './index.css'
import {
  popupAddPhoto,
  apiOptions,
  validationSettings,
  profilePopup,
  formPopupAvatarEdit,
  openButtonAvatar,
  openButtonProfile,
  openButtonAdd,
  nameText,
  jobText
} from '../utils/constants.js';
import { Card } from '../components/card.js';
import { FormValidator } from '../components/validation.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';
import { PopupConfirm } from '../components/PopupWithConfirm.js';
import { Api } from '../components/Api.js';
let idProfile = null;
const api = new Api(apiOptions);

api.getAllInfo()
  .then(([userData, cardAll]) => {
    userInfo.setUserInfo({ profile: userData.name, description: userData.about, avatar: userData.avatar })
    idProfile = userData._id
    cardsSection.renderItems(cardAll)
  });


const popupWithImage = new PopupWithImage('.popup_card');
const popupWithConfirm = new PopupConfirm('.popup_confirm', null);

const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  aboutMyselfSelector: '.profile__description',
  avatarSelector: '.profile__avatar'
});

const cardsSection = new Section({
  renderer: (data) => {
    const card = createCard(data);
    cardsSection.appendItem(card);
  }
}, '.elements');

function createCard(data) {
  const newCard = new Card(data, '.elements-add', handleCardLike, handleTrashClick, idProfile, openImagePopup);
  return newCard.generateCard();
}

function openImagePopup(url, text) {
  popupWithImage.open(url, text);
};

function handleCardLike(card) {
  api.changeCardLike(card.getId(), card.isLiked())
    .then((res) => {
      card.setLikesData(res)
    })
    .catch(err => console.log(err))
};

function handleTrashClick(card) {
  popupWithConfirm.open();
  popupWithConfirm.setCallback(() => {
    popupWithConfirm.renderLoading(true);
    api.deleteCard(card.getId())
      .then(() => {
        card.deleteCard()
        popupWithConfirm.close()
      })
      .catch(err => console.log(err))
      .finally(() => {
        popupWithConfirm.renderLoading(false)
      });
  })
};

const validationAvatar = new FormValidator(formPopupAvatarEdit, validationSettings);
validationAvatar.enableValidation();

const editValidator = new FormValidator(profilePopup, validationSettings);
editValidator.enableValidation();

const addValidator = new FormValidator(popupAddPhoto, validationSettings);
addValidator.enableValidation();




const popupFormAdd = new PopupWithForm('.popup_add', {
  handleSubmit: (data) => {
    popupFormAdd.renderLoading(true);
    api.pushInfoCreateCard(data)
      .then((res) => {
        const card = createCard(res)
        cardsSection.prependItem(card)
        popupFormAdd.close()
      })
      .catch(err => console.log(err))
      .finally(() => {
        popupFormAdd.renderLoading(false)
      })
  }
});

const popupFormEdit = new PopupWithForm('.popup_profile', {
  handleSubmit: (data) => {
    popupFormEdit.renderLoading(true);
    api.pushUserInfo(data)
      .then((res) => {
        userInfo.setUserInfo({
          profile: res.name,
          description: res.about,
          avatar: res.avatar
        })
        popupFormEdit.close()
      })
      .catch(err => console.log(err))
      .finally(() => {
        popupFormEdit.renderLoading(false)
      });
  }
});

const popupFormAvatar = new PopupWithForm('.popup_avatar', {
  handleSubmit: (data) => {
    popupFormAvatar.renderLoading(true);
    api.pushAvatar(data)
      .then((res) => {
        userInfo.setUserInfo({
          profile: res.name,
          description: res.about,
          avatar: res.avatar
        })
        popupFormAvatar.close()
      })
      .catch(err => console.log(err))
      .finally(() => {
        popupFormAvatar.renderLoading(false)
      })
  }
});
popupWithImage.setEventListeners();
popupWithConfirm.setEventListeners();
popupFormAdd.setEventListeners();
popupFormEdit.setEventListeners();
popupFormAvatar.setEventListeners();


function handleOpenEditProfilePopup() {
  popupFormEdit.open();
  const userData = userInfo.getUserInfo();
  nameText.value = userData.profile;
  jobText.value = userData.description;
  editValidator.removeErrors();
  editValidator.disableSubmitButton();
};

function handleOpenEditAvatarPopup() {
  popupFormAvatar.open();
  validationAvatar.removeErrors();
  validationAvatar.disableSubmitButton();
};

function handleOpenAddCardPopup() {
  popupFormAdd.open();
  addValidator.removeErrors();
  addValidator.disableSubmitButton();
};
openButtonProfile.addEventListener('click', handleOpenEditProfilePopup);
openButtonAvatar.addEventListener('click', handleOpenEditAvatarPopup);
openButtonAdd.addEventListener('click', handleOpenAddCardPopup);