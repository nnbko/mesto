import './index.css';
import { Card } from "../components/cards.js";
import { FormValidator } from "../components/validation.js";
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/section.js';
import UserInfo from '../components/UserInfo.js';
import {
  buttonOpenProfilePopup,
  formPopupEditProfile,
  elAdd,
  formPopupAddCard,
  captionPopupZoomImage,
  imagePopupZoomImage,
  buttonOpenPopupAvatarEdit,
  formPopupAvatarEdit
} from '../utils/constants.js';
import PopupConfirm from "../components/PopupWithConfirm.js"
import { validationConfig } from '../utils/constants.js';
import Api from '../components/Api.js';

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-76",
  headers: {
    authorization: "7cbb9037-1aa3-4e4a-b012-940234b48bc1",
    "Content-Type": "application/json",
  },
});

const popupWithImage = new PopupWithImage({
  popupSelector: ".popup_card",
  imagePopupZoomImage,
  captionPopupZoomImage
})

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  aboutMyselfSelector: ".profile__description ",
  avatarSelector: ".profile__avatar"
})

const popupConfirmation = new PopupConfirm({
  popupSelector: '.popup_confirm'
})


const cardsSection = new Section({
  renderer: (data) => {
    const url = data.url;
    const name = data.name;
    const idCard = data.idCard
    const card = new Card(data,
      () => {
        popupWithImage.open(url, name)
      },
      () => {
        const handleDeleteCard = () => {
          popupConfirmation.setSubmitButtonText('Удаление...')
          api.deleteCard(idCard)
            .catch((err) => {
              console.log(err);
            })
            .finally(() => {
              card.deleteCard();
              popupConfirmation.close();
              popupConfirmation.setSubmitButtonText('Да')
            })
        }
        popupConfirmation.setCallback(handleDeleteCard);
        popupConfirmation.open()
      },
      userInfo.getUserId(),
      (trueContains, likeIcon) => {
        if (!trueContains) {
          api.likeCard(idCard)
            .then(res => {
              card.updateLikes(res.likes.length)
              likeIcon.classList.add("elements__like_active")
            })
            .catch((err) => {
              console.log(err);
            })
        } else {
          api.deleteLikeCard(idCard)
            .then(res => {
              card.updateLikes(res.likes.length)
              likeIcon.classList.remove("elements__like_active")
            })
            .catch((err) => {
              console.log(err); 
            })
        }
      }
    )
    const cardElement = card.generateCard();

    return cardElement
  },
  containerSelector: ".elements"
})


const enableValidation = (form) => {
  const formValidator = new FormValidator(form, validationConfig);
  formValidator.setEventListeners();
}


const profilePopup = new PopupWithForm({
  popupSelector: '.popup_profile',
  handleSubmit: (data) => {
    profilePopup.setSubmitButtonText('Сохранение...')
    api.pushUserInfo(data)
      .then((res) => {
        const data = {}
        data.name = res.name;
        data.description = res.about;
        data.avatar = res.avatar;
        userInfo.setUserInfo(data)
        profilePopup.close()
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => profilePopup.setSubmitButtonText('Сохранить'))
  }
})

const popupAddCard = new PopupWithForm({
  popupSelector: '.popup_add',
  handleSubmit: (data) => {
    popupAddCard.setSubmitButtonText('Создание...')
    api.pushInfoCreateCard(data)
      .then((res) => {
        data.templateSelector = ".elements-add";
        data.name = res.name;
        data.url = res.link;
        data.idCard = res._id;
        data.ownerId = res.owner._id
        cardsSection.prependItem(data)
        popupAddCard.close()
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => popupAddCard.setSubmitButtonText('Создать'))
  }
})

const popupAvatarEdit = new PopupWithForm({
  popupSelector: '.popup_avatar',
  handleSubmit: (data) => {
    popupAvatarEdit.setSubmitButtonText('Сохранение...')
    api.pushAvatar(data)
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        userInfo.setAvatarImage(data);
        popupAvatarEdit.close();
        popupAvatarEdit.setSubmitButtonText('Сохранить')
      })
  }
})



const openPopupEditProfile = () => {
  formPopupEditProfile.reset();
  profilePopup.setInputValues(userInfo.getUserInfo())
  profilePopup.open();
}

const openPopupAddCard = () => {
  formPopupAddCard.reset();
  popupAddCard.open();
}

const openPopupAvatarEdit = () => {
  formPopupAvatarEdit.reset();
  popupAvatarEdit.open();
}

popupAddCard.setEventListeners();
profilePopup.setEventListeners();
popupAvatarEdit.setEventListeners();
popupWithImage.setEventListeners();
popupConfirmation.setEventListeners();

buttonOpenProfilePopup.addEventListener("click", openPopupEditProfile);
elAdd.addEventListener("click", openPopupAddCard);
buttonOpenPopupAvatarEdit.addEventListener('click', openPopupAvatarEdit);


enableValidation(formPopupEditProfile);
enableValidation(formPopupAddCard);
enableValidation(formPopupAvatarEdit);


Promise.all([
  api.getInitialCards(),
  api.getUserInfoApi()
])
  .then(([cards, user]) => {
    return {
      initialCards: cards,
      userInformation: user
    }
  })
  .then(({ initialCards, userInformation }) => {
    const data = {}
    data.name = userInformation.name;
    data.description = userInformation.about;
    data.avatar = userInformation.avatar
    data.idProfile = userInformation._id
    userInfo.setUserInfo(data)
    userInfo.setAvatarImage(data)
    const itemsForCard = {};
    itemsForCard.templateSelector = ".elements-add";
    initialCards.forEach((card) => {
      itemsForCard.likesList = card.likes
      itemsForCard.idCard = card._id;
      itemsForCard.ownerId = card.owner._id
      itemsForCard.name = card.name;
      itemsForCard.url = card.link;
      itemsForCard.likesCount = card.likes.length;
      cardsSection.appendItem(itemsForCard)
    })
  })
  .catch((err) => {
    console.log(err);
  }) 