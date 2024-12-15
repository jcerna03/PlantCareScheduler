import axios from 'axios';

const API_BASE_URL = 'https://localhost:7208/api/plants';

export const getPlants = () => axios.get(API_BASE_URL);
export const addPlant = (plant) => axios.post(API_BASE_URL, plant);
export const waterPlant = (id) => axios.put(`${API_BASE_URL}/${id}/water`);
export const getPlantsDue = () => axios.get(`${API_BASE_URL}/due`);