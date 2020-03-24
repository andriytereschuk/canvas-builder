<template>
  <div v-if="component">
    <v-toolbar dark :style="componentBgColor">
      <v-btn icon dark @click="getBack">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-toolbar-title>{{ component.type | capitalize }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn dark text @click="saveComponentContent">Save</v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-container fluid>
      <v-row class="align-stretch stretch-box">
        <v-col class="settings">
          <v-card height="100%">
            <article>
              <v-subheader>General</v-subheader>
              <vue-form-generator
                :schema="schema"
                :model="model"
                :options="formOptions"
                tag="div"
              ></vue-form-generator>
            </article>

            <article v-if="schema.hasChildren">
              <v-subheader>Items</v-subheader>

              <div class="items">
                <Item
                  v-for="(item, index) in model.items"
                  :key="index"
                  :zone="item"
                />
                <Add @add="addItem" />
              </div>
            </article>
          </v-card>
        </v-col>
        <v-col class="preview">
          <v-card height="100%">
            <component :is="previewLoader" :model="model"></component>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <ComponentsMenu ref="componentsMenu" />
  </div>
  <v-overlay v-else>
    <v-progress-circular indeterminate size="64"></v-progress-circular>
  </v-overlay>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import { componentConfig } from '~/config/component.config'
import { filtersMixin } from '~/mixins/filters.mixins'
import { componentMixin } from '~/mixins/component.mixin'
import Item from '~/components/Item'
import Add from '~/components/Add'
import ComponentsMenu from '~/components/ComponentsMenu'

export default {
  layout: 'simple',
  components: {
    Item,
    Add,
    ComponentsMenu
  },
  mixins: [filtersMixin, componentMixin],
  data: () => {
    return {
      component: null,
      model: null,
      formOptions: {
        validateAfterLoad: true,
        validateAfterChanged: true,
        validateAsync: true
      },
      previewComponent: null
    }
  },
  computed: {
    ...mapGetters('component', ['getComponentById']),
    ...mapState('project', ['project']),
    schema() {
      const { category, type } = this.component

      return componentConfig[category][type].schema
    },

    previewLoader() {
      return () => import(`~/components/preview/${this.previewComponent}`)
    }
  },
  provide() {
    return {
      openComponentMenu: () => this.$refs.componentsMenu.open()
    }
  },
  created() {
    this.component = this.getComponentById(+this.$route.params.id)

    if (this.component) {
      this.model = JSON.parse(JSON.stringify(this.component.model))

      this.previewComponent =
        this.component.type.slice(0, 1).toUpperCase() +
        this.component.type.slice(1)
    }
  },
  methods: {
    ...mapActions('component', ['fetchComponent', 'saveComponent']),
    saveComponentContent() {
      const editedComponent = { ...this.component, model: this.model }
      this.saveComponent(editedComponent)
      this.getBack()
    },
    getBack() {
      this.$router.go(-1)
    },
    addItem() {
      this.model.items.push({ componentId: null })
    }
  }
}
</script>

<style lang="scss" scoped>
.settings {
  flex: 0 0 400px;
}

.preview {
  flex: 1;
}

.stretch-box {
  min-height: calc(100vh - 90px);
}

.items {
  margin: 0 15px;

  .component {
    margin-bottom: 15px;
  }
}
</style>
