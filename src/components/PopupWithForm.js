import Popup from "./popup.js";

export default class PopupWithForm extends Popup {
    constructor({popupSelector, handleSubmit}) {
        super({popupSelector});
        this._handleSubmit = handleSubmit;
        this._form = this._popup.querySelector('.popup__form');
        this._inputList = this._form.querySelectorAll('.popup__holder')                        
        this._submitButton = this._form.querySelector(".popup__save");
    }

    _getInputValues() {
        const inputValuesObj = {}
        this._inputList.forEach(input => {
            inputValuesObj[input.name] = input.value        
        });        
        return inputValuesObj;
    }

    setInputValues(data) {        
        this._inputList.forEach((input) => {                     
            input.value = data[input.name];            
        });        
    } 

    setEventListeners() {                
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleSubmit(this._getInputValues());            
        });        
        super.setEventListeners();
        
    }

    setSubmitButtonText(text) {
        this._submitButton.textContent = text;
    }

    close() {                
        this._form.reset()
        super.close();                
    }
}