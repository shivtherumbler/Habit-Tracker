import axios from 'axios';

const IP_ADDRESSES = [
  'http://44.226.145.213:5000',
  'http://54.187.200.255:5000',
  'http://34.213.214.55:5000',
  'http://35.164.95.156:5000',
  'http://44.230.95.183:5000',
  'http://44.229.200.200:5000',
];

let currentIpIndex = 0;

const apiClient = async (endpoint, options = {}) => {
  for (let i = 0; i < IP_ADDRESSES.length; i++) {
    const baseUrl = IP_ADDRESSES[currentIpIndex];
    currentIpIndex = (currentIpIndex + 1) % IP_ADDRESSES.length; // Move to the next IP address

    try {
      const response = await axios({
        url: `${baseUrl}${endpoint}`,
        ...options,
      });
      return response; // Return the successful response
    } catch (error) {
      console.error(`Error with IP ${baseUrl}:`, error.message);
      // Continue to the next IP address if the current one fails
    }
  }

  throw new Error('All IP addresses failed to respond.');
};

export default apiClient;