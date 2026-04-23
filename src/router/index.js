import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/components/Home.vue'
import PostsView from '@/components/Posts.vue'
import TripsView from '@/components/Trips.vue'
import ProfileView from '@/components/Profile.vue'

const  routes  = [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/posts',
      name: 'posts',
      component: PostsView,
    },
    {
      path: '/trips',
      name: 'trips',
      component: TripsView,
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
    },
  ]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
