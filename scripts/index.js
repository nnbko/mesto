const popup = document.querySelector('.popup');
const popupOpenButton = document.querySelector('.profile__edit-button');
const popupOpenClose = popup.querySelector('.popup__close');

let formElement = document.querySelector('.popup__form')

let Save = document.querySelector('.popup__save')
let nameInput = document.querySelector('.profile__name')
let jobInput = document.querySelector('.profile__description')
let nameText = document.querySelector('.popup__name')
let jobText = document.querySelector('.popup__job')

let elementsCards = document.querySelector('.elements__cards')
let likeButton = elementsCards.querySelector('.elements__like')
//получилось почему-то только на одной карточке лайк реализовать
const likeToggle = function () {
    likeButton.classList.toggle('elements__like_active');
}

const popupToggle = function () {
    popup.classList.toggle('popup__visible');
}

function handleFormSubmit(evt) {
    evt.preventDefault();
    let a = nameText.value;
    let b = jobText.value;
    nameInput.textContent = a;
    jobInput.textContent = b;
    popupToggle();
    console.log(nameInput);
    console.log(jobInput);

};

likeButton.addEventListener('click', likeToggle);
popupOpenButton.addEventListener('click', popupToggle);
popupOpenClose.addEventListener('click', popupToggle);
formElement.addEventListener("submit", handleFormSubmit);