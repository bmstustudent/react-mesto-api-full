class Api {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(new Error(`Error: ${res.status}`))
  }

  getUserInfo() {
    return fetch(`${this.baseUrl}users/me`, {
      headers: {
        Accept: 'application/json',
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
      },
    }).then((res) => this._getResponseData(res))
  }

  getCards() {
    return fetch(`${this.baseUrl}cards`, {
      headers: {
        Accept: 'application/json',
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
      },
    }).then((res) => this._getResponseData(res))
  }

  setUserInfo(item) {
    return fetch(`${this.baseUrl}users/me`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item)
    }).then((res) => this._getResponseData(res))
  }

  createCard(newCard) {
    return fetch(`${this.baseUrl}cards`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newCard)
    }).then((res) => this._getResponseData(res))
  }

  deleteCard(id) {
    return fetch(`${this.baseUrl}cards/${id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
      },
    }).then((res) => this._getResponseData(res))
  }

  likeCard(id) {
    return fetch(`${this.baseUrl}cards/${id}/likes`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
      },
    }).then((res) => this._getResponseData(res))
  }

  dislikeCard(id) {
    return fetch(`${this.baseUrl}cards/${id}/likes`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
      },
    }).then((res) => this._getResponseData(res))
  }

  setAvatar(avatar) {
    return fetch(`${this.baseUrl}users/me/avatar`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(avatar),
    }).then((res) => this._getResponseData(res))
  }
}

const api = new Api({
  baseUrl: 'https://api.mestobm.students.nomoreparties.xyz/',
  headers: {
    'Content-Type': 'application/json',
  }
})

export default api;