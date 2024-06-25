import { defineStore } from 'pinia'
import jwtDecode from 'jwt-decode';

const isBrowser = typeof window !== 'undefined';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        username: null,
        token: isBrowser ? localStorage.getItem('authToken') || '' : '',
        errorMessage: ''
    }),
    actions: {
        async login(email, password, router) {
            try {
                const response = await fetch('/api/user/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password })
                });
        
                if (!response.ok) {
                    throw new Error('Login failed');
                }
        
                const data = await response.json();
                this.token = data.token;
                localStorage.setItem('authToken', data.token);
                
                router.push('/');
            } catch (error) {
                this.errorMessage = error.message;
            }
        },
        async logout(router) {
            this.user = null;
            this.token = '';
            localStorage.removeItem('authToken');
            router.push('/login');
        },
        async checkAuth(router) {
            if (isBrowser) {
                const token = localStorage.getItem('authToken');
                if (token) {
                    this.token = token;
                    const decoded = jwtDecode(token);

                    // Validate exp date
                    const now = Date.now().valueOf() / 1000;
                    if (decoded.exp && decoded.exp < now) {
                        this.logout(router); // Token has expired
                        return;
                    }

                    this.username = decoded.username;
                    this.errorMessage = '';
                } else {
                    this.username = null;
                    this.token = '';
                }
            }
        },
    },
    getters: {
        isAuthenticated: (state) => !!state.token,
        getToken: (state) => state.token,
    }
})