const BASE_URL = 'https://delightful-rugelach-108ed0.netlify.app/';

const apiClient = async (endpoint, options = {}) => {
  const response = await axios({
    url: `${BASE_URL}${endpoint}`,
    ...options,
  });
  return response;
};

export default apiClient;