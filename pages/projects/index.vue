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
        <nuxt-link :to="`/projects/${newProject.id}`" class="projects-link">
          <v-btn color="primary" @click="createProject">New project</v-btn>
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
        <v-icon small class="mr-2">
          mdi-pencil
        </v-icon>
      </nuxt-link>
      <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
    </template>
  </v-data-table>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'

const { mapGetters, mapActions } = createNamespacedHelpers('projects')

export default {
  data: () => {
    return {
      dialog: false,
      newProject: {
        id: Date.now(),
        name: 'New Project',
        created: '2012-04-22T18:25:43.511Z',
        modified: '2012-04-22T18:25:43.511Z',
        desktop: {
          rows: []
        },
        mobile: {
          rows: []
        }
      },
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
    })
  },
  mounted() {
    this.fetch()
  },
  methods: {
    ...mapActions({
      fetch: 'get',
      addProject: 'addProject',
      deleteProject: 'deleteProject'
    }),
    createProject() {
      this.newProject.id = Date.now()
      this.newProject.created = new Date().toISOString()
      this.newProject.modified = new Date().toISOString()
      this.addProject(this.newProject)
    },
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
        this.deleteProject(projectToDeleteID)
    }
  }
}
</script>
