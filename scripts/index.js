
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
//инициализация переменных для открытия фото
let elements = document.querySelector('.elements')
let elementsImage = elements.querySelector('.elements__image')
let elementsTitle = document.querySelector('.elements__title')
let popupFull = document.querySelector('.popup__full')
let popupCloseFull = document.querySelector('.popup__close_photo')
let popupImage = document.querySelector('.popup__image')
let popupTitle = document.querySelector('.popup__title-photo')
//добавление карточки
let elAdd = document.querySelector('.profile__add-button')
let popupAdd = document.querySelector('.popup__add')
let popupName = popupAdd.querySelector('.popup__input_name')
let popupSrc = popupAdd.querySelector('.popup__input_src')
let popupClose = popupAdd.querySelector('.popup__close_add')

let card = document.querySelector('.elements__card')




//инициализация переменных для лайка
//let save = document.querySelector('.popup__save')


//реализации функции лайка
const likeToggle = (evt) => {
    evt.target.classList.toggle('elements__like_active');
}
const deleteCard = (evt) => {
    evt.target.closest('.elements__card').remove();
}


//фунцкция передачи данныз в попап
function popupOpen() {
    openPopup(popupOpenButton);
    nameText.value = nameInput.textContent;
    jobText.value = jobInput.textContent;
}
//функции открытия и закрытия попапа 
function openPopup() {
    popup.classList.add('popup_opened');
}
function closePopup() {
    popup.classList.remove('popup_opened');
}
function openPopupPhoto() {
    popupFull.classList.add('popup_opened');
}
function closePopupPhoto() {
    popupFull.classList.remove('popup_opened');
}
function openPopupAdd() {
    popupAdd.classList.add('popup_opened');
}
function closePopupAdd() {
    popupAdd.classList.remove('popup_opened');
}
//фунцкия формы изменения данных
function handleFormSubmit(evt) {
    evt.preventDefault();
    nameInput.textContent = nameText.value;
    jobInput.textContent = jobText.value;
    closePopup();
};



const template = document.querySelector('#elements-add').content;
const elementsCard = document.querySelector('.elements');

function createEl(item) {

    const el = template.cloneNode(true);
    const elementsImage = el.querySelector('.elements__image')
    elementsImage.src = item.link;
    const elementsTitle = el.querySelector('.elements__title')
    elementsTitle.textContent = item.name;


    const likeButton = el.querySelector('.elements__like')
    const cardDelete = el.querySelector('.elements__delete')



    function handleElementsCard() {
        popupImage.src = elementsImage.src;
        popupTitle.textContent = elementsTitle.textContent;
        openPopupPhoto();
    }


    cardDelete.addEventListener('click',deleteCard);
    elementsImage.addEventListener('click', handleElementsCard);
    likeButton.addEventListener('click', likeToggle);
    return el;
};
const render = () => {
    initialCards.forEach((item) => {
        elementsCard.append(createEl(item));
    });
};
let popupS = document.querySelector('.popup_from_add')
function addCard(evt) {
    evt.preventDefault();
    elementsCard.prepend(createEl({name: popupName.value, link: popupSrc.value}));
    closePopupAdd();
    evt.target.reset();
};

popupS.addEventListener('submit',addCard)
//обработчики событий
//likeButton.addEventListener('click', likeToggle);
render()

elAdd.addEventListener('click', openPopupAdd);
popupOpenButton.addEventListener('click', popupOpen);
popupOpenClose.addEventListener('click', closePopup);
formElement.addEventListener("submit", handleFormSubmit);
popupCloseFull.addEventListener('click', closePopupPhoto);
popupClose.addEventListener('click',closePopupAdd);
