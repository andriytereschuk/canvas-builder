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

      <v-container>
        <v-row>
          <v-col>
            <v-subheader>General</v-subheader>

            <vue-form-generator
              :schema="component.schema"
              :model="component.model"
              :options="formOptions"
              tag="div"
            ></vue-form-generator>

            <template v-if="component.schema.hasChildren">
              <v-subheader>Items</v-subheader>

              <Subitems :items="component.model.items" @add="addSubitem" />
            </template>
          </v-col>
          <v-col>
            <pre>{{ component.model }}</pre>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import { componentConfig } from '~/config/component.config'
import { filtersMixin } from '~/mixins/filters.mixins'
import Subitems from '~/components/Subitems'
export default {
  components: { Subitems },
  mixins: [filtersMixin],
  // computed: {
  //   model: {
  //     get() {
  //       return this.component.model
  //     },
  //     set(model) {
  //       this.updateComponentModel()
  //     }
  //   }
  // },
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
        model: JSON.parse(JSON.stringify(model)),
        schema
      }
      this.dialog = true
    },
    addSubitem() {
      this.component.model.items.push({
        componentId: null
      })
    }
  }
}
</script>

<style scoped></style>
