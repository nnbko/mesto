export default class Popup {
    constructor({popupSelector}) {
        this._popup = document.querySelector(popupSelector);        
        this._buttonClosePopup = this._popup.querySelector(".popup__close");                
    }

    setEventListeners() {        
        this._popup.addEventListener("click", (evt) => {
            if (evt.target === this._popup) {
              this.close();
            }
          });          
        this._buttonClosePopup.addEventListener("click", () => {                        
            this.close()            
        });
    }

    open() {               
        this._popup.classList.add("popup_opened");        
        document.addEventListener("keydown", this._handleEscClose);
        
    }

    close() {              
        this._popup.classList.remove("popup_opened");        
        document.removeEventListener("keydown", this._handleEscClose);            
    }

    _handleEscClose = (evt) => {
        if (evt.code === "Escape") {            
            this.close();
          }
    }
}
