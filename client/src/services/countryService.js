import axios from 'axios';
import { BASE_URL } from '../config/config';

export const fetchCountries = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/countries`);
        return response.data;
    } catch (error) {
        console.error('Error fetching countries:', error);
        throw error;
    }
};

export const fetchCountry = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/countries/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching country details:', error);
        throw error;
    }
};

export const updateCountry = async (id, data) => {
    try {
        const response = await axios.put(`${BASE_URL}/countries/${id}`, data);
        return response.data;
    } catch (error) {
        console.error('Error updating country:', error);
        throw error;
    }
};
