import { setToken } from "./utils/token";

export const BASE_URL = 'https://api.mestobm.students.nomoreparties.xyz';

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password })
  })
    .then(response => {
      let data = response.json();
      if (!response.ok) {
        return Promise.reject(response.status);
      }
      return data;
    })
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
    .then((response => {
      let data = response.json();
      if (!response.ok) {
        return Promise.reject(response.status);
      }
      return data;
    }))
    .then((data) => {
      if (data.token) {
        setToken(data.token);
        return data;
      }
    })
};

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
    .then((res => {
      let data = res.json();
      if (!res.ok) {
        return Promise.reject(res.status);
      }
      return data;
    }))
};

