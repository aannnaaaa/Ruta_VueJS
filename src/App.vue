<template>
  <Menubar :model="items">
    <template #start>
      <span>
        <img src="@/assets/logo.png" width="50" alt="My SVG icon" />
      </span>
    </template>
    <template #item="{ item, props, hasSubmenu, root }">
      <a class="flex items-center ml-6 p-4">
        <router-link v-if="item.route" :to="item.route">
          <span :class="item.icon" />
          <span class="ml-1">{{ item.label }}</span>
        </router-link>
      </a>
    </template>
    <template #end>
      <div class="flex items-center gap-2">
        <div v-if="isAuthenticated && user">
          <span class="pi pi-fw pi-user mr-4" /> {{ user.name }}
          <Button @click="logout" class="ml-4">Exit</Button>
        </div>
        <div v-else>
          <form @submit.prevent="login">
            <InputText
              v-model="email"
              type="email"
              id="email"
              required
              placeholder="Email"
              class="m-2 sm:w-auto"
              :class="{ 'p-invalid': authError }"
            />
            <InputText
              v-model="password"
              type="password"
              id="password"
              required
              placeholder="Password"
              class="m-2 sm:w-auto"
              :class="{ 'p-invalid': authError }"
            />
            <Button type="submit">Login</Button>
            <div class="ml-2">
              <small v-if="authError" class="error">{{ authError }}</small>
            </div>
          </form>
        </div>
      </div>
    </template>
  </Menubar>

  <div class="router-view-container">
    <router-view></router-view>
  </div>
</template>

<script>
import { useAuthStore } from '@/stores/authStore'
import Button from 'primevue/button'
import Menubar from 'primevue/menubar'
import InputText from 'primevue/inputtext'

export default {
  components: { Button, Menubar, InputText },
  data() {
    return {
      email: '',
      password: '',
      authStore: useAuthStore(),
      items: [
        {
          label: 'Главная страница',
          icon: 'pi pi-fw pi-home',
          route: '/',
          shortcut: 'Ctrl + H',
          submenu: [],
        },
        {
          label: 'Маршруты',
          icon: 'pi pi-fw pi-flag',
          route: '/trips',
        },
        {
          label: 'Посты',
          icon: 'pi pi-fw pi-book',
          route: '/posts',
        },
        {
          label: 'Профиль',
          icon: 'pi pi-fw pi-user',
          route: '/profile',
        },
      ],
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
