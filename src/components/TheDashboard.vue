<script setup>
import { RouterLink } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import router from '../router';

const { user, token } = storeToRefs(useAuthStore());
const authStore = useAuthStore();

const onLogOut = async () => {
  await authStore.logout()
      .then(() => router.push({ name: 'home' }))
      .catch(e => alert('An error has occured.'));
}
</script>

<template>
  <div>
    <div class="mb-4">
      <h4 class="mb-4">Welcome to Dashboard,</h4>

      <h1>Account Information:</h1>
      <h2 class="mb-4">Name:</h2>
      <p>{{ user.name }}</p>

      <h2 class="mb-4">E-mail Address:</h2>
      <p>{{ user.email }}</p>

      <h2 class="mb-4">Date E-mail Verified:</h2>
      <p>{{ user.email_verified_at ?? 'Unverified' }}</p>
    </div>

    <div class="mt-4">
      <button @click="onLogOut" class="btn btn-primary w-100">Logout</button>
    </div>
  </div>
</template>
