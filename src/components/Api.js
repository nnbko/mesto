class Api {
    constructor(apiOptions) {
        this._baseUrl = apiOptions.url;
        this._headers = apiOptions.headers;
    }

    _getData(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
    }

    getUserInfo() {
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
                name: newUserInfo.profile,
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
                avatar: newLinkAvatar.avatar,
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
    changeCardLike(cardId, isLiked) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: isLiked ? 'DELETE' : 'PUT',
            headers: this._headers,
        })
            .then(res => this._getData(res))
    }
    pushInfoCreateCard(data) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify(data)
        })
            .then(res => this._getData(res))
    }
    getAllInfo() {
        return Promise.all([this.getUserInfo(), this.getInitialCards()])
    }
};
export { Api };