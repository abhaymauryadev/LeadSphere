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
  const response = await axios.post(API_URL, leadData);
  return response.data;
};

// Update a lead
export const updateLead = async (id, leadData) => {
  const response = await axios.put(`${API_URL}/${id}`, leadData);
  return response.data;
};

// Delete a lead
export const deleteLead = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
