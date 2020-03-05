<template>
  <div class="component" :style="bg" @click="attachComponent">
    <div v-if="component" class="content">
      {{ component.type }}
    </div>
    <div v-if="component" class="actions">
      <v-btn class="mx-2" fab small color="primary">
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
  computed: {
    ...mapState('components', {
      component(state) {
        return state.components[this.zone.componentId]
      }
    }),
    bg() {
      const type = (this.component && this.component.type) || null
      const backgroundColor = this.getComponentColor(type)

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
        // this.$refs.componentsMenu.open().then((component) => {
        //   this.attach({
        //     id: this.zone.id,
        //     component: { id: Date.now(), ...component }
        //   })
        // })
        const component = {
          type: 'promo'
        }

        this.attach({
          id: this.zone.id,
          component: { id: Date.now(), ...component }
        })
      }
    },
    detachComponent(e) {
      this.detach({ id: this.zone.id, component: this.component })
    },
    setBg(type) {
      const backgroundColor = this.getComponentColor(type)

      return { backgroundColor }
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

  &:hover .actions {
    display: flex;
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
