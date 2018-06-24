import axiosClass from 'axios';

const API_URL = 'https://localhost:4000';

export const axios = axiosClass.create({
    baseURL: API_URL,
    timeout: 5000,
});
