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
import { mapActions, mapGetters, mapMutations } from 'vuex'
import { componentMixin } from '~/mixins/component.mixin'

export default {
  mixins: [componentMixin],
  props: {
    zone: {
      type: Object,
      required: true
    }
  },
  inject: ['openComponentMenu'],
  computed: {
    ...mapGetters('components', ['getComponentById']),
    component() {
      return this.getComponentById(this.zone.componentId)
    }
  },
  methods: {
    ...mapActions('components', [
      'attach',
      'detach',
      'attachToParentComponent'
    ]),
    ...mapMutations('components', ['add']),
    async attachComponent() {
      if (!this.component) {
        // open dialog and wait for picking the item
        const componentInitialData = await this.openComponentMenu()
        const component = { id: Date.now(), ...componentInitialData }

        return this.zone.id
          ? this.attach({
              id: this.zone.id,
              component
            })
          : this.attachToParentComponent({ component })
      }
    },
    detachComponent() {
      this.detach({ id: this.zone.id, component: this.component })
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
