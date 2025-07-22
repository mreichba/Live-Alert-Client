import config from '../config';

// functions used for managing the auth token in localStorage
const TokenServices = {
  // saves token to localStorage under TOKEN_KEY
  saveAuthToken(token) {
    window.localStorage.setItem(config.TOKEN_KEY, token);
  },

  // retrieves token from localStorage
  getAuthToken() {
    return window.localStorage.getItem(config.TOKEN_KEY);
  },

  // removes token from localStorage
  clearAuthToken() {
    window.localStorage.removeItem(config.TOKEN_KEY);
  },

  // checks if a token exists and returns true/false
  hasAuthToken() {
    // !! casts a string (or null) into a boolean
    return !!TokenServices.getAuthToken();
  },
};

export default TokenServices;