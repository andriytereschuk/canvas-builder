<template>
  <div
    class="component"
    :class="{ 'not-assigned': !component }"
    :style="bg"
    @click="attachComponent"
  >
    <div v-if="component" class="content">
      {{ component.type }}
    </div>
    <div v-if="component" class="actions">
      <v-btn
        class="mx-2"
        fab
        small
        color="primary"
        @click.stop="openComponentSettings(component)"
      >
        <v-icon>mdi-settings</v-icon>
      </v-btn>
      <v-btn fab small color="error" @click.stop="detachComponent">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { componentMixin } from '~/mixins/component.mixin'

export default {
  mixins: [componentMixin],
  props: {
    zone: {
      type: Object,
      required: true
    }
  },
  inject: ['openComponentSettings'],
  computed: {
    ...mapState('components', {
      component(state) {
        return state.components[this.zone.componentId]
      }
    }),
    bg() {
      const type = (this.component && this.component.type) || null
      const category = (this.component && this.component.category) || null
      const backgroundColor = this.getComponentColor(category, type)

      return { backgroundColor }
    }
  },
  methods: {
    ...mapActions({
      attach: 'components/attach',
      detach: 'components/detach'
    }),
    attachComponent() {
      if (!this.component) {
        // open dialog and wait for picking the item
        this.$root.$componentsMenu().then((component) => {
          this.attach({
            id: this.zone.id,
            component: { id: Date.now(), ...component }
          })
        })
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
