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
      </v-toolbar>
    </template>

    <template v-slot:item.created="{ item }">
      <div>{{ date(item.created) }}</div>
    </template>
    <template v-slot:item.modified="{ item }">
      <div>{{ date(item.modified) }}</div>
    </template>
    <template v-slot:item.action="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
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
      editedIndex: -1,
      editedItem: {
        name: '',
        created: 0,
        modified: 0,
        actions: null
      },
      defaultItem: {
        name: '',
        created: 0,
        modified: 0,
        actions: null
      }
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
    date(date) {
      console.log(date)
      if (date) {
        return date.slice(0, 19).replace(/T/g, ' ')
      }
    }
    // convertDate(projects) {
    //   const convertedDateProjects = []
    //   Object.assign(convertedDateProjects, projects)
    //   return convertedDateProjects.map((el) => {
    //     el.created = el.created.slice(0, 19).replace(/T/g, ' ')
    //     el.modified = el.modified.slice(0, 19).replace(/T/g, ' ')
    //   })
  },
  editItem(item) {
    // save the item to the store and redirect
    this.editedIndex = this.desserts.indexOf(item)
    this.editedItem = Object.assign({}, item)
    this.dialog = true
  },

  deleteItem(item) {
    // add removing from the store
    const index = this.projects.indexOf(item)
    confirm('Are you sure you want to delete this item?') &&
      this.projects.splice(index, 1)
  },

  close() {
    this.dialog = false
    setTimeout(() => {
      this.editedItem = Object.assign({}, this.defaultItem)
      this.editedIndex = -1
    }, 300)
  },
  save() {
    if (this.editedIndex > -1) {
      Object.assign(this.desserts[this.editedIndex], this.editedItem)
    } else {
      this.desserts.push(this.editedItem)
    }
    this.close()
  }
}
// }
</script>

<style></style>
