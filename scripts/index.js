const form = document.querySelector('.popup__form')
//инициализация переменных для открытия закрытия попапа
const profilePopup = document.querySelector('.popup_profile');
const buttonOpenProfilePopup = document.querySelector('.profile__edit-button');
const buttonCloseProfilePopup = profilePopup.querySelector('.popup__close');
//инициализация переменных для изменения данных попапа
const profileForm = document.querySelector('.popup__form_profile')
const nameInput = document.querySelector('.profile__name')
const jobInput = document.querySelector('.profile__description')
const nameText = document.querySelector('.popup__holder_name_text')
const jobText = document.querySelector('.popup__holder_job_text')
//инициализация переменных для открытия фото
const cardsContainer = document.querySelector('.elements');
const popupFull = document.querySelector('.popup_card')
const popupCloseFull = document.querySelector('.popup__close_photo')
const popupImage = document.querySelector('.popup__image')
const popupTitle = document.querySelector('.popup__title-photo')
//добавление карточки
const elAdd = document.querySelector('.profile__add-button')
const popupAdd = document.querySelector('.popup_add')
const popupName = popupAdd.querySelector('.popup__holder_input_name')
const popupSrc = popupAdd.querySelector('.popup__holder_input_src')
const popupClose = popupAdd.querySelector('.popup__close_add')
const card = document.querySelector('.elements__card')
const template = document.querySelector('#elements-add').content;
function clickOnOverlay(evt) {
    if (evt.target.classList.contains('popup')) {
        closePopup(evt.target);
    }
};

function clickOnEsc(evt) {
    const popupOpened = document.querySelector('.popup_opened');
    if (evt.key === 'Escape') {
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
function openEditProfilePopup() {
    openPopup(profilePopup);
    nameText.value = nameInput.textContent;
    jobText.value = jobInput.textContent;
}
//функции открытия и закрытия попапа 
function openPopup(popup) {
    popup.classList.add("popup_opened");
    document.addEventListener('keydown', clickOnEsc);
    document.addEventListener('click', clickOnOverlay);
}
function closePopup(popup) {
    popup.classList.remove("popup_opened");
    document.removeEventListener('click', clickOnOverlay);
    document.removeEventListener('keydown', clickOnEsc);
}
function closePopupFormEdit() {
    closePopup(profilePopup);
}
function closePopupView() {
    closePopup(popupFull);
}
function openPopupAdd() {
    openPopup(popupAdd);
}
function closePopupAdd() {
    closePopup(popupAdd);
}
//фунцкия формы изменения данных
function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    nameInput.textContent = nameText.value;
    jobInput.textContent = jobText.value;
    closePopupFormEdit();
};






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
const cardForm = document.querySelector('.popup__form_add')
function addCard(evt) {
    evt.preventDefault();
    cardsContainer.prepend(createCard({ name: popupName.value, link: popupSrc.value }));
    closePopupAdd();
    evt.target.reset();
    enableButton(cardForm,validationSettings);
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
