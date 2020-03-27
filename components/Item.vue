<template>
  <div
    class="component"
    :class="{ 'not-assigned': !component }"
    :style="componentBgColor"
    @click="attachComponent"
  >
    <div v-if="component" class="content">
      {{ component.type }}
    </div>
    <div v-if="component" class="actions">
      <nuxt-link
        class="mx-2"
        :to="{ name: 'components-id', params: { id: component.id } }"
      >
        <v-btn fab small color="primary">
          <v-icon>mdi-cog-outline</v-icon>
        </v-btn>
      </nuxt-link>
      <v-btn fab small color="error" @click.stop="detachComponent">
        <v-icon>mdi-trash-can-outline</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from 'vuex'
import { componentMixin } from '~/mixins/component.mixin'
import ComponentModel from '~/models/component.model'

export default {
  mixins: [componentMixin],
  props: {
    zone: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      default: 0
    },
    parentId: {
      type: String,
      required: false,
      default: null
    }
  },
  inject: ['openComponentMenu'],
  computed: {
    ...mapGetters('component', ['getComponentById']),
    component() {
      return this.getComponentById(this.zone.componentId)
    }
  },
  mounted() {
    if (!this.component && this.zone.componentId) {
      this.fetchComponent(this.zone.componentId)
    }
  },
  methods: {
    ...mapActions('component', ['attach', 'detach', 'fetchComponent']),
    ...mapMutations('component', ['addComponent']),
    async attachComponent() {
      if (!this.component) {
        // open dialog and wait for picking the item
        const { type, category, model } = await this.openComponentMenu()
        const component = new ComponentModel(
          type,
          category,
          model,
          this.parentId
        )
        this.attach({
          id: this.zone.id,
          index: this.index,
          component
        })
      }
    },
    detachComponent() {
      this.detach({
        id: this.zone.id,
        index: this.index,
        component: this.component
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.component {
  height: 100%;
  min-height: 60px;
  border: 1px dashed #fff;
  position: relative;
  cursor: pointer;

  &:hover .actions {
    display: flex;
  }

  &.not-assigned {
    transition: 0.1s;
    &:hover {
      background-color: #645e71 !important;
    }
  }
}

.content {
  padding: 5px 10px;
  text-transform: capitalize;
}

.actions {
  position: absolute;
  display: none;
  right: 10px;
  top: 10px;
}
</style>
