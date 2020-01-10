export default {
  // API_ENDPOINT: 'http://localhost:8000/api',
  // API_ENDPOINT: 'https://murmuring-refuge-36938.herokuapp.com/api',
  TOKEN_KEY: process.env.REACT_APP_API_KEY,
  API_ENDPOINT: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api'
}