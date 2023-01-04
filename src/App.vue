<script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <div>
    <main class="vh-100">
        <div class="d-flex align-items-center flex-column justify-content-center h-100 bg-light">
          <router-view />
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'App'
};
</script>
