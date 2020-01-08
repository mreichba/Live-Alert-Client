import config from '../config'

const TokenServices = {
  saveAuthToken(token) {
    window.localStorage.setItem(config.TOKEN_KEY, token)
  },
  getAuthToken() {
    return window.localStorage.getItem(config.TOKEN_KEY)
  },
  clearAuthToken() {
    window.localStorage.removeItem(config.TOKEN_KEY)
    // window.localStorage.removeItem(user_id)
  },
  hasAuthToken() {
    return !!TokenServices.getAuthToken()
  }
}

export default TokenServices
