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
        <template>
          <v-dialog v-model="dialog" max-width="350">
            <template v-slot:activator="{ on }">
              <v-btn color="primary" v-on="on">New project</v-btn>
            </template>
            <v-card>
              <v-card-title class="headline">New Project</v-card-title>
              <v-card-text>
                <v-col>
                  <v-text-field
                    v-model="title"
                    :rules="rules"
                    counter="25"
                    label="Enter a valid project name"
                  ></v-text-field>
                </v-col>
              </v-card-text>
              <v-card-actions>
                <v-row justify="center">
                  <nuxt-link
                    style="text-decoration: none"
                    :event="isDisabled ? '' : 'click'"
                    :to="`projects/${newProject.id.toString()}`"
                  >
                    <v-btn
                      :disabled="isDisabled"
                      color="primary"
                      rounded
                      @click="createNewProject"
                    >
                      Create Project
                    </v-btn>
                  </nuxt-link>
                </v-row>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </template>
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
import { mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  data: () => {
    return {
      dialog: false,
      title: '',
      rules: [
        (v) =>
          (v.length <= 25 && v.length >= 6) || 'Min 6 and max 25 characters'
      ],
      newProject: {
        id: Date.now(),
        name: '',
        created: '',
        modified: '',
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
    ...mapGetters('project', {
      projects: 'filtered'
    }),
    isDisabled() {
      return this.title.length > 25 || this.title.length < 6
    }
  },
  created() {
    this.getProjects()
  },
  methods: {
    ...mapActions('project', ['getProjects', 'createProject', 'deleteProject']),
    ...mapMutations('project', ['updateProjectName']),
    createNewProject() {
      this.newProject.id = Date.now()
      this.newProject.created = new Date().toISOString()
      this.newProject.modified = new Date().toISOString()
      this.newProject.name = this.title
      this.createProject(this.newProject)
      this.dialog = false
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
