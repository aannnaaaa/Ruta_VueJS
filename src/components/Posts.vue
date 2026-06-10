<template>
  <DataTable
    :value="posts"
    :lazy="true"
    :loading="false"
    :paginator="true"
    :rows="perpage"
    :rowsPerPageOptions="[2, 5, 10]"
    :totalRecords="posts_total"
    @page="onPageChange"
    responsive-layout="scroll"
    :first="offset"
  >
    <template #header>
      <InputText
        v-model="search"
        type="text"
        id="search"
        required
        placeholder="Наименование"
        class="m-2 sm:w-auto"
      />
      <Button type="button" @click="onPushSearchButton" icon="pi pi-search" label="Найти" />
    </template>

    <Column field="id" header="№" />
    <Column field="title" header="Заголовок" />
    <Column field="content" header="Содержание" />

    <Column header="Изображение">
      <template #body="slotProps">
        <img
          v-if="slotProps.data.image"
          :src="slotProps.data.image"
          alt="Post Image"
          style="width: 80px; height: 80px; object-fit: cover; border-radius: 4px"
        />
        <span v-else>Нет картинки</span>
      </template>
    </Column>

    <Column header="Действия" class="w-24 !text-end">
      <template #body="{ data }">
        <div class="flex justify-end gap-2">
          <Button
            icon="pi pi-times-circle"
            @click="openPopupConfirm($event, data)"
            severity="secondary"
            rounded
          />
          <Button icon="pi pi-file-edit" @click="selectRow(data)" severity="secondary" rounded />
        </div>
      </template>
    </Column>

    <template #footer>
      <div class="text-end">
        <Button
          type="button"
          @click="$router.push('/createPost')"
          icon="pi pi-plus"
          label="Добавить пост"
        />
      </div>
    </template>
  </DataTable>
  <ConfirmPopup></ConfirmPopup>
  <Toast></Toast>
</template>

<script>
import ConfirmPopup from 'primevue/confirmpopup'
import Toast from 'primevue/toast'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import { useDataStore } from '@/stores/dataStore'

export default {
  name: 'Posts',
  components: {
    DataTable,
    Column,
    Button,
    InputText,
    ConfirmPopup,
    Toast,
  },
  data() {
    return {
      dataStore: useDataStore(),
      perpage: 5,
      offset: 0,
      search: '',
    }
  },
  computed: {
    posts() {
      return this.dataStore.posts
    },
    posts_total() {
      return this.dataStore.posts_total
    },
    error_code() {
      return this.dataStore.errorCode
    },
    error_message() {
      return this.dataStore.errorMessage
    },
  },
  mounted() {
    this.dataStore.get_posts()
    this.dataStore.get_posts_total()
  },
  methods: {
    onPageChange(event) {
      this.offset = event.first
      this.perpage = event.rows
      this.dataStore.get_posts(this.offset / this.perpage, this.perpage, this.search)
    },

    onPushSearchButton() {
      this.dataStore.get_posts_total(this.search)
      this.dataStore.get_posts(undefined, undefined, this.search)
    },

    openPopupConfirm(event, data) {
      this.$confirm.require({
        target: event.currentTarget,
        message: 'Вы уверены, что хотите удалить пост ' + data.title + '?',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Да',
        rejectLabel: 'Нет',
        accept: () => {
          this.deletePost(data.id)
        },
      })
    },
    selectRow(data) {
      this.$router.push('/createPost/' + data.id)
    },
    async deletePost(id) {
      await this.dataStore.delete_post(id)

      if (this.error_code > 0) {
        this.$toast.add({
          severity: 'error',
          summary: 'Ошибка удаления поста',
          detail: this.error_message,
          life: 4000,
        })
      } else {
        this.$toast.add({
          severity: 'success',
          summary: 'Пост успешно удален',
          detail: this.error_message,
          life: 4000,
        })
      }
      this.dataStore.get_posts(this.offset / this.perpage, this.perpage, this.search)
    },
  },
}
</script>
