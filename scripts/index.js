//инициализация переменных для открытия закрытия попапа
const popup = document.querySelector('.popup');
const popupOpenButton = document.querySelector('.profile__edit-button');
const popupOpenClose = popup.querySelector('.popup__close');
//инициализация переменных для изменения данных попапа
let formElement = document.querySelector('.popup__form')
let nameInput = document.querySelector('.profile__name')
let jobInput = document.querySelector('.profile__description')
let nameText = document.querySelector('.popup__holder_name_text')
let jobText = document.querySelector('.popup__holder_job_text')


//инициализация переменных для лайка
//let save = document.querySelector('.popup__save')
//let elementsCards = document.querySelector('.elements__cards')
//let likeButton = elementsCards.querySelector('.elements__like')

//попытака реализации функции лайка
//const likeToggle = function () {
//    likeButton.classList.toggle('elements__like_active');
//}


//фунцкция передачи данныз в попап
function popupOpen() {
    openPopup(popupOpenButton);
    nameText.value = nameInput.textContent;
    jobText.value = jobInput.textContent;
}
//функции открытия и закрытия попапа 
function openPopup(){
    popup.classList.add('popup_opened');
}
function closePopup(){
    popup.classList.remove('popup_opened');
}
//фунцкия формы изменения данных
function handleFormSubmit(evt) {
    evt.preventDefault();
    nameInput.textContent = nameText.value;
    jobInput.textContent = jobText.value;
    closePopup();
};
//обработчики событий
//likeButton.addEventListener('click', likeToggle);
popupOpenButton.addEventListener('click', popupOpen);
popupOpenClose.addEventListener('click', closePopup);
formElement.addEventListener("submit", handleFormSubmit);