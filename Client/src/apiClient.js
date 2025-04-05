import axios from 'axios';

// Use the environment variable for the base URL
const BASE_URL = process.env.REACT_APP_API_URL; // Ensure this does not have a trailing slash

const apiClient = async (endpoint, options = {}) => {
    const url = `${BASE_URL}${endpoint}`;
    console.log('API URL:', url); // Debugging log
    const response = await axios({
      url,
      ...options,
    });
    return response;
  };

export default apiClient;