import axios from 'axios';
import { defineStore } from 'pinia';

const baseUrl = `${import.meta.env.VITE_API_URL}/api`;

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: JSON.parse(localStorage.getItem('token')) || null,
  }),

  actions: {
    async register(name, email, password, password_confirmation) {
      await axios
        .post(`${baseUrl}/register`, {
          name: name,
          email: email,
          password: password,
          password_confirmation: password_confirmation,
        })
        .then((response) => {
          const user = response.data.user;
          const token = response.data.token;
          
          this.user = user;
          this.token = token;
          
          localStorage.setItem('user', user);
          localStorage.setItem('token', token);
        });
    },
    async login(email, password) {
      await axios
        .post(`${baseUrl}/login`, {
          email: email,
          password: password,
        })
        .then((response) => {
          const user = response.data.user;
          const token = response.data.token;
          
          this.user = user;
          this.token = token;
          
          localStorage.setItem('user', user);
          localStorage.setItem('token', token);
        });
    },
    async logout() {
      await axios
        .post(
          `${baseUrl}/logout`,
          {},
          {
            headers: { Authorization: `Bearer ${this.token}` },
          }
        )
        .then((response) => {
          this.user = null;
          this.token = null;

          localStorage.removeItem('user');
          localStorage.removeItem('token');
        });
    },
  },
});
