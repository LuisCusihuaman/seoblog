import fetch from 'isomorphic-fetch';
import { API } from '../config';

export const userPublicProfile = (username) => {
  return fetch(`${API}/user/${username}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};
