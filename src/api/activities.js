import axios from "axios";

const API_URL = "http://localhost:5000/api/activities";

// Get recent activities
export const getActivities = async () => {
  const response = await axios.get(API_URL);
  return response.data; // array of activities
};

// Add new activity
export const addActivity = async (activity) => {
  const response = await axios.post(API_URL, activity);
  return response.data; // created activity
};
