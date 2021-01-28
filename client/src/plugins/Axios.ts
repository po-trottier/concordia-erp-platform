import axios from 'axios';

// Simple variable to determine the base URL for API requests
const url = process.env.NODE_ENV === 'production'
  ? '/api'
  : 'http://localhost:5500/api';

export default axios.create({
  baseURL: url,
});
