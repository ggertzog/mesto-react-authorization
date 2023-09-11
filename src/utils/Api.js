export class Api {
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers;
    }

    #onResponse(res) {
        return res.ok ? res.json() : res.json().then(errData => Promise.reject(errData))
    }

    getAllInfo() {
        return Promise.all([this.getUserInfo(), this.getInitialCards()])
    }
   
    getUserInfo() {
        return fetch(`${this._url}/users/me`, {
            headers: this._headers
        })
            .then(this.#onResponse)
    }

    getInitialCards() {
        return fetch(`${this._url}/cards`, {
            headers: this._headers
        })
            .then(this.#onResponse)
    }

    editUserProfile(data) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about:  data.about
            }),
        })
            .then(this.#onResponse)
    }

    postNewCard(data) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: data.title,
                link: data.link
            }),
        })
            .then(this.#onResponse)
    }

    deleteCard(cardId) {
        return fetch(`${this._url}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers
        })
        .then(this.#onResponse)
    }

    changeLike(cardId, isLiked) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            method: isLiked ? 'DELETE' : 'PUT',
            headers: this._headers
        })
        .then(this.#onResponse)
    }

    changeAvatar(avatar) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(avatar)
        })
        .then(this.#onResponse)
    }
}

const api = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-73',
    headers: {
      "content-type": "application/json",
      authorization: "e8e3db00-8e62-4b7a-9288-f8f3414bebc7",
    }
});

export default api;