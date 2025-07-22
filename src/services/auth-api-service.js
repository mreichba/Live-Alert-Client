import config from '../config';
import TokenServices from '../services/token-services';

// Centralized helper functions for making authenticated fetch requests
const AuthHelper = {
  // Registers a new user
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

  // Logs in an existing user
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

  // Deletes a user's account
  deleteAccount(email, password) {
    return fetch(`${config.API_ENDPOINT}/users`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${TokenServices.getAuthToken()}`,
        'content-type': 'application/json'
      },
      body: JSON.stringify({ email: email.value, password: password.value })
    });
  },

  // Gets current user's alerts
  getMyAlerts() {
    return fetch(`${config.API_ENDPOINT}/alerts`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${TokenServices.getAuthToken()}`
      }
    });
  },

  // Gets alert data for contacts the user follows
  getMyContactAlerts() {
    return fetch(`${config.API_ENDPOINT}/alerts/contact-alerts`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${TokenServices.getAuthToken()}`
      }
    });
  },

  // Gets list of user's saved contacts
  getMyContacts() {
    return fetch(`${config.API_ENDPOINT}/contacts`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${TokenServices.getAuthToken()}`
      }
    });
  },

  // Gets nickname of current user
  getMyNickname() {
    return fetch(`${config.API_ENDPOINT}/users/home`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${TokenServices.getAuthToken()}`
      }
    });
  },

  // Adds a new contact by email
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

  // Sends a new alert with time, location, and active status
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

  // Updates alert_active status for a specific alert
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