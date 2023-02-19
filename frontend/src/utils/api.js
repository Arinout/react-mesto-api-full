export class Api {
  constructor(data) {
    this._baseUrl = data.baseUrl;
    this._headers = data.headers;
  }

  _response(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`${res.status} ${res.statusText}`);
    }
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
        method: 'GET',
        credentials: 'include',
        headers: this._headers
      })
      .then((res) => this._response(res));
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
        method: 'GET',
        credentials: 'include',
        headers: this._headers
      })
      .then((res) => this._response(res));
  }

  editUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
        method: 'PATCH',
        credentials: 'include',
        headers: this._headers,
        body: JSON.stringify({
          name: data.name,
          about: data.profession
        })
      })
      .then((res) => this._response(res));
  }

  editAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        credentials: 'include',
        headers: this._headers,
        body: JSON.stringify({
          avatar: data.avatar
        })
      })
      .then((res) => this._response(res));
  }

  addNewCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
        method: 'POST',
        credentials: 'include',
        headers: this._headers,
        body: JSON.stringify({
          name: data.name,
          link: data.link
        })
      })
      .then((res) => this._response(res));
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: this._headers
      })
      .then((res) => this._response(res));
  }

  changeLikeCardStatus(cardId, likeCardStatus) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: (likeCardStatus ? "PUT": "DELETE"),
        credentials: 'include',
        headers: this._headers
      })
      .then((res) => this._response(res));
  }
}

const apiConfig = {
  baseUrl: 'https://api.arinout.students.nomoredomains.work',
  headers: {
    'Content-Type': 'application/json',
  },
};

const api = new Api(apiConfig);

export default api;