import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000/api',
});

// Add a request interceptor to include the auth token in headers
API.interceptors.request.use((req) => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
        try {
            const parsedUser = JSON.parse(userInfo);
            if (parsedUser && parsedUser.token) {
                req.headers.Authorization = `Bearer ${parsedUser.token}`;
            }
        } catch (error) {
            console.error('Error parsing userInfo in interceptor', error);
        }
    }
    return req;
});

export default API;
