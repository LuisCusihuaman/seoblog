import fetch from 'isomorphic-fetch';
import { API } from '../config';
import cookie from 'js-cookie';
export const signup = (user) => {
  return fetch(`${API}/signup`, {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  })
    .then((resp) => resp.json())
    .catch((err) => console.log(err));
};

export const signin = (user) => {
  return fetch(`${API}/signin`, {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  })
    .then((resp) => resp.json())
    .catch((err) => console.log(err));
};

export const setCookie = (key, value) => process.browser && cookie.set(key, value, { expires: 1 });

export const removeCookie = (key) => process.browser && cookie.remove(key, { expires: 1 });

export const getCookie = (key) => process.browser && cookie.get(key);

export const setLocalStorage = (key, value) =>
  process.browser && localStorage.setItem(key, JSON.stringify(value));

export const removeLocalStorage = (key) => process.browser && localStorage.removeItem(key);

// authenticate user by pass data to cookie and localstorage
export const authenticate = (data, cb) => {
  setCookie('token', data.token);
  setLocalStorage('user', data.user);
  cb();
};

export const isAuth = () => {
  if (process.browser && getCookie('token')) {
    const user = localStorage.getItem('user');
    return user && JSON.parse(user);
  }
  return false;
};
