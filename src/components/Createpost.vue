<template>
  <div class="flex justify-center">
    <form v-on:submit.prevent="savePost" class="w-1/2 p-6">
      <h2 class="text-2xl mb-4 text-center" style="color: dimgrey">
        {{ isEdit ? 'Редактирование' : 'Добавление' }} поста
      </h2>

      <div class="flex flex-col mb-4">
        <InputText type="text" placeholder="Введите заголовок" v-model="postTitle" />
      </div>

      <div class="flex flex-col mb-4">
        <Textarea placeholder="Введите содержание поста..." v-model="postContent" rows="5" />
      </div>

      <div class="mb-4 mt-4">
        <label
          for="file"
          id="file-label"
          class="block text-md font-medium text-gray-500 border border-gray-300 rounded-md p-2"
        >
          <span class="pi pi-upload mx-3"></span>Выбрать изображение
        </label>
        <input
          type="file"
          hidden
          id="file"
          name="file"
          v-on:change="changeCaption"
          :required="!isEdit"
          accept="image/*"
        />
      </div>

      <div class="flex flex-col mt-6">
        <Button type="submit" :label="isEdit ? 'Сохранить' : 'Создать'" />
      </div>
    </form>
  </div>

  <Toast position="bottom-right" />
</template>

<script>
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import Button from 'primevue/button'
import Toast from 'primevue/toast'
import { useDataStore } from '@/stores/dataStore'

export default {
  name: 'CreatePost',
  components: { InputText, Textarea, Button, Toast },
  data() {
    return {
      dataStore: useDataStore(),
      postTitle: '',
      postContent: '',
      postImage: null,
    }
  },
  computed: {
    errorMessage() {
      return this.dataStore.errorMessage
    },
    errorCode() {
      return this.dataStore.errorCode
    },
    isEdit() {
      return !!this.$route.params.id
    },
    postId() {
      return this.$route.params.id
    },
  },
  watch: {
    // Следим за ID: если он изменился, берем данные из стора и подставляем в форму
    postId: {
      handler(newId) {
        if (newId) {
          const post = this.dataStore.posts.find((p) => p.id == newId)
          if (post) {
            this.postTitle = post.title
            this.postContent = post.content
            this.postImage = null // Оставляем null если файл не меняется
          }
        } else {
          // Если ID пропал (перешли на страницу создания) — очищаем форму
          this.postTitle = ''
          this.postContent = ''
          this.postImage = null
        }
      },
      immediate: true, // Сработает сразу при загрузке страницы
    },
  },
  methods: {
    changeCaption(event) {
      const file = event.target.files[0]
      if (file) {
        document.getElementById('file-label').innerHTML =
          '<span class="pi pi-file mx-3"></span>' + file.name
        this.postImage = file
      } else {
        document.getElementById('file-label').innerHTML =
          '<span class="pi pi-upload mx-3"></span>Выбрать изображение'
        this.postImage = null
      }
    },
    async savePost() {
      const formData = new FormData()
      formData.append('title', this.postTitle)
      formData.append('content', this.postContent)
      if (this.postImage) {
        formData.append('image', this.postImage)
      }
      if (this.isEdit) {
        await this.dataStore.update_post(this.postId, formData)
      } else {
        await this.dataStore.add_post(formData)
      }
      if (this.errorCode > 0)
        this.$toast.add({severity:'error', summary: "Ошибка добавления данных", detail: this.errorMessage + " " +this.errorCode, life: 4000})
      else
        this.$toast.add({severity:'success', summary: 'Данные успешно добавлены', detail: this.errorMessage, life: 4000})
    },
  },
}
</script>

<style scoped></style>
