export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl
    this._headers = options.headers    
  }
  
  _getData(res) {
    if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`); 
    }
    return res.json();  
  }

  getUserInfoApi() {    
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers      
    })
    .then(res => this._getData(res))            
  }  

  pushUserInfo(newUserInfo) {    
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: newUserInfo.name,
        about: newUserInfo.description
      })
    })
    .then(res => this._getData(res))
  }

  pushAvatar(newLinkAvatar) {        
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: newLinkAvatar.avatar        
      })
    })
    .then(res => this._getData(res)) 
  }

  getInitialCards() {    
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers      
    })
    .then(res => this._getData(res))            
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers      
    })
    .then(res => this._getData(res))
  }

  pushInfoCreateCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link         
      })
    })
    .then(res => this._getData(res))
  }

  likeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers      
    })
    .then(res => this._getData(res))  
  }

  deleteLikeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers      
    })
    .then(res => this._getData(res))
  }
}