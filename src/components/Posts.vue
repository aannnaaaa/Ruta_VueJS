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
    :laading="true"
    :first="offset"
  >
    <Column field="id" header="№" />
    <Column field="title" header="Заголовок" />
    <Column field="content" header="Содержание" />
  </DataTable>
</template>

<script>
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { useDataStore } from '@/stores/dataStore'

export default {
  name: 'Posts',
  components: { DataTable, Column },
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
