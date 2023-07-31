
//инициализация переменных для открытия закрытия попапа
const profilePopup = document.querySelector('.popup');
const buttonOpenProfilePopup = document.querySelector('.profile__edit-button');
const buttonCloseProfilePopup = profilePopup.querySelector('.popup__close');
//инициализация переменных для изменения данных попапа
const profileForm = document.querySelector('.popup__form')
let nameInput = document.querySelector('.profile__name')
let jobInput = document.querySelector('.profile__description')
let nameText = document.querySelector('.popup__holder_name_text')
let jobText = document.querySelector('.popup__holder_job_text')
//инициализация переменных для открытия фото
//let elements = document.querySelector('.elements')
const cardsContainer = document.querySelector('.elements');
let elementsImage = cardsContainer.querySelector('.elements__image')
let elementsTitle = document.querySelector('.elements__title')
let popupFull = document.querySelector('.popup_card')
let popupCloseFull = document.querySelector('.popup__close_photo')
let popupImage = document.querySelector('.popup__image')
let popupTitle = document.querySelector('.popup__title-photo')
//добавление карточки
let elAdd = document.querySelector('.profile__add-button')
let popupAdd = document.querySelector('.popup_add')
let popupName = popupAdd.querySelector('.popup__holder_input_name')
let popupSrc = popupAdd.querySelector('.popup__holder_input_src')
let popupClose = popupAdd.querySelector('.popup__close_add')

let card = document.querySelector('.elements__card')




//инициализация переменных для лайка
//let save = document.querySelector('.popup__save')


//реализации функции лайка
const handleLikeButton = (evt) => {
    evt.target.classList.toggle('elements__like_active');
}
const deleteCard = (evt) => {
    evt.target.closest('.elements__card').remove();
}


//фунцкция передачи данныз в попап
function popupOpen() {
    openPopup(profilePopup);
    nameText.value = nameInput.textContent;
    jobText.value = jobInput.textContent;
}
//функции открытия и закрытия попапа 
function openPopup(popup) {
    popup.classList.add("popup_opened");
}
function closePopup(popup) {
    popup.classList.remove("popup_opened");
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



const template = document.querySelector('#elements-add').content;


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
};

cardForm.addEventListener('submit', addCard)
//обработчики событий
render()

elAdd.addEventListener('click', openPopupAdd);
buttonOpenProfilePopup.addEventListener('click', popupOpen);
buttonCloseProfilePopup.addEventListener('click', closePopupFormEdit);
profileForm.addEventListener("submit", handleProfileFormSubmit);
popupCloseFull.addEventListener('click', closePopupView);
popupClose.addEventListener('click', closePopupAdd);
