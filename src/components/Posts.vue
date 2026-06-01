<template>
  <DataTable
    :value="posts"
    :lazy="true"
    :loading="dataStore.loading"
    :paginator="true"
    :rows="perpage"
    :rowsPerPageOptions="[2, 5, 10]"
    :totalRecords="posts_total"
    @page="onPageChange"
    responsive-layout="scroll"
    :first="offset"
  >
    <Column field="id" header="№" />
    <Column field="title" header="Заголовок" />
    <Column field="content" header="Содержание" />

    <Column header="Изображение">
      <template #body="slotProps">
        <img
          v-if="slotProps.data.image"
          :src="slotProps.data.image"
          alt="Post Image"
          style="width: 80px; height: 80px; object-fit: cover; border-radius: 4px;"
        />
        <span v-else>Нет картинки</span>
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
</template>

<script>
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import { useDataStore } from '@/stores/dataStore'

export default {
  name: 'Posts',
  components: { DataTable, Column, Button },
  data() {
    return {
      dataStore: useDataStore(),
      perpage: 5,
      offset: 0,
    }
  },
  computed: {
    posts() {
      return this.dataStore.posts
    },
    posts_total() {
      return this.dataStore.posts_total
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
      this.dataStore.get_posts(this.offset / this.perpage, this.perpage)
    },
  },
}
</script>

<style scoped></style>
