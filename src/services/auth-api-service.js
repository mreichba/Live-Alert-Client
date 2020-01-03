import config from '../config';
import TokenServices from '../services/token-services';

const AuthHelper = {
  createAccount(newAccount) {
    return fetch(`${config.API_ENDPOINT}/auth/sign-up`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(newAccount)
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },
  login(credentials) {
    return fetch(`${config.API_ENDPOINT}/auth/login`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(credentials)
    }).then(res => {
      return !res.ok ? res.json().then(e => Promise.reject(e)) : res.json();
    });
  },
  // getCurrentUser(token) {
  //   return fetch(`${config.API_ENDPOINT}/users`, {
  //     method: 'GET',
  //     headers: {
  //       'content-type': 'application/json',
  //       Authorization: `Bearer ${token}`
  //     }
  //   })
  //     .then(res => res.json())
  //     .then(data => {
  //       return data.dbUser;
  //     });
  // },
  deleteAccount() {
    return fetch(`${config.API_ENDPOINT}/users/${TokenServices.getUserId()}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${config.API_TOKEN}`
      }
    });
  },
  getMyAlerts() {
    return fetch(`${config.API_ENDPOINT}/alerts`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${config.API_TOKEN}`
      }
    });
  }
};

export default AuthHelper;