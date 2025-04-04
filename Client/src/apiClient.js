import axios from 'axios';

const BASE_URL = 'https://habit-tracker-imm2025.netlify.app';

const apiClient = async (endpoint, options = {}) => {
  const response = await axios({
    url: `${BASE_URL}${endpoint}`,
    ...options,
  });
  return response;
};

export default apiClient;