<template>
  <div v-if="component && model">
    <v-toolbar dark :style="componentBgColor">
      <v-btn icon dark @click="getBack">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-toolbar-title>{{ component.type | capitalize }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn dark text @click="getBack">Save</v-btn>
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
                <Add @add="addSubitemToEditable(model.items)" />
              </div>
            </article>
          </v-card>
        </v-col>
        <v-col class="preview">
          <v-card height="100%">
            <json-viewer
              :value="model"
              theme="json-theme"
              :expand-depth="6"
              copyable
            ></json-viewer>
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
import { mapActions, mapGetters, mapState, mapMutations } from 'vuex'
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
      component: null,
      formOptions: {
        validateAfterLoad: true,
        validateAfterChanged: true,
        validateAsync: true
      }
    }
  },
  computed: {
    ...mapGetters('components', ['getComponentById', 'getEditableModelById']),
    ...mapState('project', ['project']),
    schema() {
      const { category, type } = this.component

      return componentConfig[category][type].schema
    },
    model: {
      get() {
        return this.getEditableModelById(+this.$route.params.id)
      },
      set(model) {
        this.changeEditableModel({ id: +this.$route.params.id, model })
      }
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
      this.setEditableModel(this.component)
    }
  },
  methods: {
    ...mapActions('components', ['fetchComponent', 'setEditableModel']),
    ...mapMutations('components', [
      'changeEditableModel',
      'addSubitemToEditable'
    ]),
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
