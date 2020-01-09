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
  deleteAccount(email, password) {
    return fetch(`${config.API_ENDPOINT}/users`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${TokenServices.getAuthToken()}`
      },
      body: JSON.stringify({ email: email.value, password: password.value })
    });
  },
  getMyAlerts() {
    return fetch(`${config.API_ENDPOINT}/alerts`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${TokenServices.getAuthToken()}`
      }
    });
  },
  getMyContactAlerts() {
    return fetch(`${config.API_ENDPOINT}/alerts/contact-alerts`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${TokenServices.getAuthToken()}`
      }
    });
  },
  getMyContacts() {
    return fetch(`${config.API_ENDPOINT}/contacts`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${TokenServices.getAuthToken()}`
      }
    });
  },
  getMyNickname() {
    return fetch(`${config.API_ENDPOINT}/users/home`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${TokenServices.getAuthToken()}`
      }
    });
  },
  addContact(email) {
    return fetch(`${config.API_ENDPOINT}/contacts`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${TokenServices.getAuthToken()}`
      },
      body: JSON.stringify({ email })
    });
  },
  addAlert(alert_time, longitude, latitude, alert_active) {
    return fetch(`${config.API_ENDPOINT}/alerts`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${TokenServices.getAuthToken()}`
      },
      body: JSON.stringify({ alert_time, longitude, latitude, alert_active })
    });
  },
  editAlert(alert_active, alert_id) {
    return fetch(`${config.API_ENDPOINT}/alerts/${alert_id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${TokenServices.getAuthToken()}`
      },
      body: JSON.stringify({ alert_active })
    });
  }
};

export default AuthHelper;