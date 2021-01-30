import {getToken} from "./token";

class Api {
  constructor({baseUrl, headers}) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  getHeaders() {
    const token = getToken();

    return {
      ...this.headers,
      'Authorization': `Bearer ${token}`
    }
  }

  getUserInfo() {
    return fetch(`${this.baseUrl}users/me`, {
      headers: this.getHeaders(),
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`)
      })
  }

  getCards() {
    return fetch(`${this.baseUrl}cards`, {
      headers: this.getHeaders(),
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`)
      })
  }

  setUserInfo(item) {
    return fetch(`${this.baseUrl}users/me`, {
      method: 'PATCH',
      headers: this.getHeaders(),
      body: JSON.stringify({
        name: item.name,
        about: item.about
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`)
      })
  }

  createCard(newCard) {
    return fetch(`${this.baseUrl}cards`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({
        name: newCard.name,
        link: newCard.link,
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`)
      })
  }

  deleteCard(id) {
    return fetch(`${this.baseUrl}cards/${id}`, {
      method: 'DELETE',
      headers: this.getHeaders(),
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`)
      })
  }

  likeCard(id) {
    return fetch(`${this.baseUrl}cards/${id}/likes`, {
      method: 'PUT',
      headers: this.getHeaders(),
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`)
      })
  }

  dislikeCard(id) {
    return fetch(`${this.baseUrl}cards/${id}/likes`, {
      method: 'DELETE',
      headers: this.getHeaders(),
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`)
      })
  }

  setAvatar(avatar) {
    return fetch(`${this.baseUrl}users/me/avatar`, {
      method: 'PATCH',
      headers: this.getHeaders(),
      body: JSON.stringify(avatar),
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`)
      })
  }
}

const api = new Api({
  baseUrl: 'https://api.mestobm.students.nomoreparties.xyz/',
  headers: {
    'Content-Type': 'application/json',
  }
})

export default api;