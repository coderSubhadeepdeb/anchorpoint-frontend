import axios from "axios";

const api = axios.create({
    baseURL: 'https://anchorpoint-api.onrender.com',  // Replace with your backend URL
    withCredentials: true // Automatically sends cookies
});

export const checkAuth = async () => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    if (!accessToken && !refreshToken) {
        return { isAuthenticated: false };
    }

    try {
        // First try with access token
        const response = await api.get('/api/v1/admins/verify-token', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
    return { isAuthenticated: true, admin: response.data.admin };
    } catch (error) {
        if (error.response?.status === 401 && refreshToken) {
        // Access token expired, try refreshing
        try {
            const refreshResponse = await api.post('/api/v1/admins/refresh-access-token', {
                refreshToken,
            });
        
            localStorage.setItem('accessToken', refreshResponse.data.accessToken);
            localStorage.setItem('refreshToken', refreshResponse.data.refreshToken);
        
            return { isAuthenticated: true };
        } catch (refreshError) {
            // Refresh token also expired or invalid
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('admin');
            return { isAuthenticated: false };
        }
    }
    return { isAuthenticated: false };
  }
};