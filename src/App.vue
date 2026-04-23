<template>
  <header>
    <nav>
      <div class="nav-left">
        <ul>
          <li><router-link to="/">Главная</router-link></li>
          <li><router-link to="/trips">Маршруты</router-link></li>
          <li><router-link to="/posts">Посты</router-link></li>
          <li><router-link to="/profile">Профиль</router-link></li>
        </ul>
      </div>

      <div class="nav-right">
        <div v-if="isAuthenticated && user" class="user-info">
          Добро пожаловать, {{ user.name }}
          <button @click="logout" class="logout-btn">Выйти</button>
        </div>

        <div v-else class="login-form">
          <form @submit.prevent="login">
            <input v-model="email" type="email" placeholder="Email" required />
            <input v-model="password" type="password" placeholder="Пароль" required />
            <button type="submit">Войти</button>
          </form>
          <p v-if="authError" class="error">{{ authError }}</p>
        </div>
      </div>
    </nav>
  </header>

  <div class="router-view-container">
    <router-view></router-view>
  </div>
</template>

<script>
import { useAuthStore } from '@/stores/authStore'

export default {
  data() {
    return {
      email: '',
      password: '',
      authStore: useAuthStore(),
    }
  },
  computed: {
    isAuthenticated() {
      return this.authStore.isAuthenticated
    },
    user() {
      return this.authStore.user
    },
    authError() {
      return this.authStore.errorMessage
    },
  },
  methods: {
    logout() {
      this.authStore.logout()
    },
    login() {
      this.authStore.login({
        email: this.email,
        password: this.password,
      })
      this.email = ''
      this.password = ''
    },
  },
  mounted() {
    const token = localStorage.getItem('token')
    if (token) {
      this.authStore.isAuthenticated = true
      this.authStore.getUser()
    }
  },
}
</script>

<style scoped>
header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  //background-color: #1f1f1f;
  //box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px 30px;
  //color: white;
}

.nav-left ul {
  display: flex;
  list-style: none;
  gap: 32px;
  margin: 0;
  padding: 0;
}

.nav-left a {
  //color: #4ade80;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}

.nav-left a:hover {
  //color: #86efac;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 15px;
}

.login-form {
  display: flex;
  align-items: center;
  gap: 8px;
}

.login-form input {
  padding: 7px 12px;
  //border: none;
  //border-radius: 4px;
  //background-color: #333;
  //color: white;
  width: 160px;
}

.login-form input::placeholder {
  //color: #999;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 15px;
}

.logout-btn {
  padding: 7px 16px;
  background-color: #ef4444;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
}

.logout-btn:hover {
  background-color: #f87171;
}

.error {
  color: #ef4444;
  font-size: 13px;
  margin: 0;
  white-space: nowrap;
}

.router-view-container {
  margin-top: 80px;
}
</style>
