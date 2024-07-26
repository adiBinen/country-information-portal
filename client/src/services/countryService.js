import axios from 'axios';

const API_URL = 'http://localhost:8080/countries';

export const fetchCountries = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching countries:', error);
        throw error;
    }
};

export const fetchCountry = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching country details:', error);
        throw error;
    }
};

export const updateCountry = async (id, data) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, data);
        return response.data;
    } catch (error) {
        console.error('Error updating country:', error);
        throw error;
    }
};
