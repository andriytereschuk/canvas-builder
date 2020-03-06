<template>
  <v-data-table
    :headers="headers"
    :items="projects"
    sort-by="name"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>All projects</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <nuxt-link
          :to="{ name: 'projects-id', params: { id: Date.now() } }"
          class="projects-link"
        >
          <v-btn color="primary">New project</v-btn>
        </nuxt-link>
      </v-toolbar>
    </template>

    <template v-slot:item.created="{ item }">
      <div>{{ convertDate(item.created) }}</div>
    </template>

    <template v-slot:item.modified="{ item }">
      <div>{{ convertDate(item.modified) }}</div>
    </template>

    <template v-slot:item.action="{ item }">
      <nuxt-link :to="`/projects/${getProjectID(item)}`" class="no-undeline">
        <v-icon small class="mr-2">mdi-pencil</v-icon>
      </nuxt-link>
      <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
    </template>
  </v-data-table>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'

const { mapGetters, mapActions, mapMutations } = createNamespacedHelpers(
  'projects'
)

export default {
  data: () => {
    return {
      dialog: false,
      headers: [
        {
          text: 'Name',
          align: 'start',
          sortable: true,
          value: 'name'
        },
        {
          text: 'Created',
          align: 'start',
          sortable: true,
          value: 'created'
        },
        {
          text: 'Modified',
          align: 'start',
          sortable: true,
          value: 'modified'
        },
        {
          text: 'Actions',
          align: 'start',
          sortable: false,
          value: 'action'
        }
      ],
      editedIndex: -1
    }
  },
  computed: {
    ...mapGetters({
      projects: 'filtered'
    }),
    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    }
  },
  watch: {
    dialog(val) {
      val || this.close()
    }
  },
  mounted() {
    this.fetch()
  },
  methods: {
    ...mapActions({
      fetch: 'get'
    }),
    ...mapMutations({
      remove: 'remove'
    }),
    getProjectID(item) {
      const index = this.projects.indexOf(item)
      return this.projects[index].id.toString()
    },
    convertDate(date) {
      if (date) {
        return date.slice(0, 19).replace(/T/g, ' ')
      }
    },
    deleteItem(item) {
      const index = this.projects.indexOf(item)
      const projectToDeleteID = this.projects[index].id

      confirm('Are you sure you want to delete this item?') &&
        this.remove(projectToDeleteID)
    }
  }
}
</script>
