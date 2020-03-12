<template>
  <v-dialog
    v-if="component"
    v-model="dialog"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <v-card>
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title
          >{{ component.type | capitalize }} settings</v-toolbar-title
        >
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark text @click="dialog = false">Save</v-btn>
        </v-toolbar-items>
      </v-toolbar>

      <v-subheader>General</v-subheader>

      <vue-form-generator
        :schema="component.schema"
        :model="component.model"
        :options="formOptions"
        tag="div"
      ></vue-form-generator>
    </v-card>
  </v-dialog>
</template>

<script>
import { componentConfig } from '~/config/component.config'
import { filtersMixin } from '~/mixins/filters.mixins'
export default {
  mixins: [filtersMixin],
  data: () => {
    return {
      dialog: false,
      component: null,
      formOptions: {
        validateAfterLoad: true,
        validateAfterChanged: true,
        validateAsync: true
      }
    }
  },
  methods: {
    open(component) {
      const { category, type, model } = component
      const schema = componentConfig[category][type].schema
      this.component = {
        ...component,
        model: { ...model },
        schema
      }
      this.dialog = true
    }
  }
}
</script>
