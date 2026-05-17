import { create } from 'zustand';

const useAuthStore = create((set) => ({
    // 1. The memory slots
    token: localStorage.getItem('access_token') || null, 
    isAuthenticated: !!localStorage.getItem('access_token'),

    // 2. The action to log in (save the badge)
    login: (token) => {
        localStorage.setItem('access_token', token); // Save to browser storage so it survives a refresh
        set({ token: token, isAuthenticated: true });
    },

    // 3. The action to log out (shred the badge)
    logout: () => {
        localStorage.removeItem('access_token');
        set({ token: null, isAuthenticated: false });
    }
}));

export default useAuthStore;