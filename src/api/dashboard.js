import axios from 'axios';

const API_URL = 'http://localhost:5000/api/dashboard'; //backend url

export const getDashboardStats = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};
