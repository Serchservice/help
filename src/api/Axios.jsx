import axios from 'axios';
import Keys from './Keys';

const Axios = axios.create({
    baseURL: Keys.baseUrl,
    headers: {
        'Content-Type': 'application/json',
    },
});

export { Axios, axios as default };