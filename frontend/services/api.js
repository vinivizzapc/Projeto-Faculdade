import axios from 'axios';

const api = axios.create({
    baseURL: 'http://172.22.0.27:3333/'
});

export default api;