import { defineStore } from 'pinia'
import axios from 'axios'

const backendUrl = import.meta.env.VITE_BACKEND_URL

export const useDataStore = defineStore('data', {
  state: () => ({
    trips: [],
    trips_total: null,
    posts: [],
    posts_total: null,
    errorMessage: '',
  }),
  actions: {
    async get_trips(page = 0, perpage = 5) {
      this.errorMessage = ''
      try {
        const response = await axios.get(backendUrl + '/api/trips', {
          params: {
            page: page,
            perpage: perpage,
          },
        })
        this.trips = response.data
      } catch (error) {
        if (error.response) {
          this.errorMessage = error.response.data.message
          console.log(error)
        } else if (error.request) {
          this.errorMessage = error.message
          console.log(error)
        } else {
          console.log(error)
        }
      }
    },

    async get_trips_total() {
      this.errorMessage = ''
      try {
        const response = await axios.get(backendUrl + '/api/trips_total')
        this.trips_total = response.data
      } catch (error) {
        if (error.response) {
          this.errorMessage = error.response.data.message
          console.log(error)
        } else if (error.request) {
          this.errorMessage = error.message
          console.log(error)
        } else {
          console.log(error)
        }
      }
    },

    async get_posts(page = 0, perpage = 5) {
      this.errorMessage = ''
      try {
        const response = await axios.get(backendUrl + '/api/posts', {
          params: {
            page: page,
            perpage: perpage,
          },
        })
        this.posts = response.data
      } catch (error) {
        if (error.response) {
          this.errorMessage = error.response.data.message
          console.log(error)
        } else if (error.request) {
          this.errorMessage = error.message
          console.log(error)
        } else {
          console.log(error)
        }
      }
    },

    async get_posts_total() {
      this.errorMessage = ''
      try {
        const response = await axios.get(backendUrl + '/api/posts_total')
        this.posts_total = response.data
      } catch (error) {
        if (error.response) {
          this.errorMessage = error.response.data.message
          console.log(error)
        } else if (error.request) {
          this.errorMessage = error.message
          console.log(error)
        } else {
          console.log(error)
        }
      }
    },
  },
})
