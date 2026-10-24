<template>
  <AppHeader />
  <div class="router-view-container">
    <router-view></router-view>
  </div>
</template>

<script setup>
import {onMounted} from 'vue';
import { useAuthStore } from '@/stores/authStore';
import AppHeader from '@/components/AppHeader.vue';

const authStore = useAuthStore();
onMounted(() => {
    const token = localStorage.getItem('token')
    if (token) {
      authStore.isAuthenticated = true
      authStore.getUser()
    }
})

</script>

<style scoped>

.router-view-container {
  margin-top: 80px;
}
</style>
