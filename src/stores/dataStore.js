import { defineStore } from 'pinia'
import axios from 'axios'

const backendUrl = import.meta.env.VITE_BACKEND_URL

export const useDataStore = defineStore('data', {
  state: () => ({
    trips: [],
    trips_total: null,
    posts: [],
    posts_total: null,
    errorCode: '',
    errorMessage: '',
    loading: false,
  }),
  actions: {
    async get_trips(page = 0, perpage = 5, search = '') {
      this.errorMessage = ''
      try {
        const response = await axios.get(backendUrl + '/api/trips', {
          params: {
            page: page,
            perpage: perpage,
            search: search,
          },
        })
        this.trips = response.data
      } catch (error) {
        if (error.response) {
          this.errorCode = 1
          this.errorMessage = error.response.data.message
          console.log(error)
        } else if (error.request) {
          this.errorCode = 2
          this.errorMessage = error.message
          console.log(error)
        } else {
          this.errorCode = 3
          console.log(error)
        }
      }
    },

    async get_trips_total(search = '') {
      this.errorMessage = ''
      try {
        const response = await axios.get(backendUrl + '/api/trips_total', {
          params: {
            search: search,
          },
        })

        this.trips_total = response.data
      } catch (error) {
        if (error.response) {
          this.errorCode = 1
          this.errorMessage = error.response.data.message
          console.log(error)
        } else if (error.request) {
          this.errorCode = 2
          this.errorMessage = error.message
          console.log(error)
        } else {
          this.errorCode = 3
          console.log(error)
        }
      }
    },

    async get_posts(page = 0, perpage = 5, search = '') {
      this.loading = true
      this.errorMessage = ''
      try {
        const response = await axios.get(backendUrl + '/api/posts', {
          params: {
            page: page,
            perpage: perpage,
            search: search,
          },
        })
        this.posts = response.data
      } catch (error) {
        if (error.response) {
          this.errorCode = 1
          this.errorMessage = error.response.data.message
          console.log(error)
        } else if (error.request) {
          this.errorCode = 2
          this.errorMessage = error.message
          console.log(error)
        } else {
          this.errorCode = 3
          console.log(error)
        }
      }
    },

    async get_posts_total(search = '') {
      this.errorMessage = ''
      try {
        const response = await axios.get(backendUrl + '/api/posts_total', {
          params: {
            search: search,
          },
        })
        this.posts_total = response.data
      } catch (error) {
        if (error.response) {
          this.errorCode = 1
          this.errorMessage = error.response.data.message
          console.log(error)
        } else if (error.request) {
          this.errorCode = 2
          this.errorMessage = error.message
          console.log(error)
        } else {
          this.errorCode = 3
          console.log(error)
        }
      }
    },

    async add_post(postData) {
      this.errorMessage = ''
      try {
        const response = await axios.post(backendUrl + '/api/post', postData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        })
        this.errorCode = response.data.code
        this.errorMessage = response.data.message
      } catch (error) {
        if (error.response) {
          this.errorCode = 11
          this.errorMessage = error.response.data.message
          console.log(error)
        } else if (error.request) {
          this.errorCode = 12
          this.errorMessage = error.message
          console.log(error)
        } else {
          this.errorCode = 13
          console.log(error)
        }
      }
    },
    async delete_post(id) {
      this.errorMessage = ''
      this.errorCode = 0

      try {
        const response = await axios.delete(backendUrl + '/api/posts/' + id, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json',
          },
        })
        this.errorCode = response.data.code;
        this.errorMessage = response.data.error;
      } catch (error) {
        if (error.response) {
          this.errorCode = 11
          this.errorMessage = error.response.data.message;
          console.log(error);
        } else if (error.request) {
          this.errorCode = 12
          this.errorMessage = error.message;
          console.log(error)
        } else {
          this.errorCode = 13;
          console.log(error);
        }
      }
    },

    async get_post(id) {
      this.errorMessage = ''
      this.loading = true
      try {
        const response = await axios.get(backendUrl + '/api/posts/' + id)
        return response.data
      } catch (error) {
        if (error.response) {
          this.errorCode = 1
          this.errorMessage = error.response.data.message
        } else {
          this.errorCode = 2
          this.errorMessage = error.message
        }
        console.log(error)
        return null
      } finally {
        this.loading = false
      }
    },

    async update_post(id, postData) {
      this.errorMessage = ''
      try {
        const response = await axios.post(backendUrl + '/api/posts/' + id, postData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        })
        this.errorCode = response.data.code
        this.errorMessage = response.data.message
      } catch (error) {
        if (error.response) {
          this.errorCode = 11
          this.errorMessage = error.response.data.message
        } else if (error.request) {
          this.errorCode = 12
          this.errorMessage = error.message
        } else {
          this.errorCode = 13
        }
        console.log(error)
      }
    },
  },
})
