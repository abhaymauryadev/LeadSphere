import axios from 'axios';

const API_URL = 'http://localhost:5000/api/leads'; // backend URL

// Get all leads
export const getLeads = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Get a lead by ID
export const getLead = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// Create a new lead
export const createLead = async (leadData) => {
  const payload = {
    ...leadData,
    // ✅ combine date + time into nextFollowup
    ...(leadData.date && leadData.time && {
      nextFollowup: new Date(`${leadData.date}T${leadData.time}`)
    })
  };

  const response = await axios.post(API_URL, payload);
  return response.data;
};

// Update a lead
export const updateLead = async (id, leadData) => {
  const payload = {
    ...leadData,
    ...(leadData.date && leadData.time && {
      nextFollowup: new Date(`${leadData.date}T${leadData.time}`)
    })
  };

  const response = await axios.put(`${API_URL}/${id}`, payload);
  return response.data;
};

// Delete a lead
export const deleteLead = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

// Get monthly count
export const getMonthlyLeadsCount = async () => {
  const res = await axios.get(`${API_URL}/monthly-count`);
  return res.data;
};