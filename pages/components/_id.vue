<template>
  <div v-if="component">
    <v-toolbar dark :style="componentBgColor">
      <v-btn icon dark @click="getBack">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-toolbar-title>{{ component.type }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn dark text @click="save">Save</v-btn>
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
                :model="component.model"
                :options="formOptions"
                tag="div"
              ></vue-form-generator>
            </article>

            <article v-if="schema.hasChildren">
              <v-subheader>Items</v-subheader>

              <div class="items">
                <Item
                  v-for="(item, index) in component.model.items"
                  :key="index"
                  :zone="item"
                  :index="index"
                  :parent-id="$route.params.id"
                />
                <Add @add="addSubComponent(component)" />
              </div>
            </article>
          </v-card>
        </v-col>
        <v-col class="preview">
          <v-card height="100%">
            <component :is="previewLoader" :model="component.model"></component>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <ComponentsMenu ref="componentsMenu" :inside-component="true" />
  </div>
  <v-overlay v-else>
    <v-progress-circular indeterminate size="64"></v-progress-circular>
  </v-overlay>
</template>

<script>
import { mapActions, mapMutations, mapState, mapGetters } from 'vuex'
import { componentConfig } from '~/config/component.config'
import { filtersMixin } from '~/mixins/filters.mixins'
import { componentMixin } from '~/mixins/component.mixin'
import Item from '~/components/Item'
import Add from '~/components/Add'
import ComponentsMenu from '~/components/ComponentsMenu'

export default {
  layout: 'simple',
  components: { Item, Add, ComponentsMenu },
  mixins: [filtersMixin, componentMixin],
  data: () => {
    return {
      formOptions: {
        validateAfterLoad: true,
        validateAfterChanged: true,
        validateAsync: true
      }
    }
  },
  computed: {
    ...mapState('project', ['project']),
    ...mapGetters('component', ['getComponentById']),
    id() {
      return this.$route.params.id
    },
    previewLoader() {
      const componentToImport = () =>
        import(`~/components/preview/${this.previewComponent}`)
      return this.previewComponent && componentToImport
    },
    component: {
      get() {
        return this.getComponentById(this.id)
      },
      set(component) {
        console.log('newComponent', component)
        this.mapMutations({ id: this.id, component })
      }
    },
    schema() {
      return (
        this.component &&
        componentConfig[this.component.category][this.component.type].schema
      )
    },
    previewComponent() {
      return (
        this.component &&
        this.component.type.slice(0, 1).toUpperCase() +
          this.component.type.slice(1)
      )
    }
  },
  mounted() {
    if (!this.component) {
      this.fetchComponent(this.id)
    }
  },
  provide() {
    return {
      openComponentMenu: () => this.$refs.componentsMenu.open()
    }
  },
  methods: {
    ...mapActions('component', ['fetchComponent', 'saveComponent']),
    ...mapMutations('component', ['addSubComponent', 'saveComponentToStore']),
    save() {
      this.saveComponent(this.component)
      this.getBack()
    },
    getBack() {
      this.$router.go(-1)
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
