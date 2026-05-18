import axios from 'axios';

const api = axios.create({
    // 👇 Replace this string with YOUR actual Render URL!
    baseURL: 'https://hospital-system-app.onrender.com/api/', 
    headers: {
        'Content-Type': 'application/json',
    }
});

// 👇 Add an Interceptor: This intercepts every request right before it leaves the browser
api.interceptors.request.use((config) => {
    // Look in the browser's local storage for our badge
    const token = localStorage.getItem('access_token');
    
    // If we have a badge, tape it to the authorization header
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;