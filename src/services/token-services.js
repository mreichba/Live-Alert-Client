import config from '../config'

const TokenServices = {
  saveAuthToken(token) {
    window.localStorage.setItem(config.TOKEN_KEY, token)
  },
  getAuthToken() {
    return window.localStorage.getItem(config.TOKEN_KEY)
  },
  saveUserId(id) {
    window.localStorage.setItem('user_id', id)
  },
  getUserId() {
    return window.localStorage.getItem('user_id')
  },
  clearAuthToken() {
    window.localStorage.removeItem(config.TOKEN_KEY)
  },
  hasAuthToken() {
    return !!TokenServices.getAuthToken()
  },
  makeBasicAuthToken(userName, password) {
    return window.btoa(`${userName}:${password}`)
  },
}

export default TokenServices
