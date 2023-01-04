import axios from 'axios';
import { defineStore } from 'pinia';

const baseUrl = `${import.meta.env.VITE_API_URL}/api`;

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: JSON.parse(localStorage.getItem('token')) || null,
    message: null,
  }),

  actions: {
    async register(name, email, password, password_confirmation) {
      await axios.post(`${baseUrl}/register`, {
        name: name,
        email: email,
        password: password,
        password_confirmation: password_confirmation
      })
      .then((response) => {
        const user = JSON.stringify(response.data.user);
        const token = JSON.stringify(response.data.token);
        
        localStorage.setItem('user', user);
        localStorage.setItem('token', token);
      })
      .catch((e) => {
        console.log(e);
      });
    },
    async login(email, password) {
      await axios.post(`${baseUrl}/login`, {
        email: email,
        password: password
      })
      .then((response) => {
        const user = JSON.stringify(response.data.user);
        const token = JSON.stringify(response.data.token);
        
        localStorage.setItem('user', user);
        localStorage.setItem('token', token);
      })
      .catch((e) => {
        if (e.response.code === 401) {
          this.message = 'Invalid credentials';
        }
      });
    },
    logout() {
      this.user = null;
      localStorage.removeItem('user');
    },
  },
});
