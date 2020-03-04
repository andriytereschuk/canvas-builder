<template>
  <div class="component" :style="bg" @click="attachComponent()">
    <div v-if="component">
      {{ component.type }}
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
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
    ...mapGetters({
      components: 'components/components'
    }),
    component() {
      return this.components[this.zone.componentId]
    },
    bg() {
      const type = (this.component && this.component.type) || null
      const backgroundColor = this.getComponentColor(type)

      return { backgroundColor }
    }
  },
  methods: {
    ...mapMutations({
      set: 'components/set',
      attachComponentToProject: 'project/attachComponent'
    }),
    attachComponent() {
      const temp = {
        id: Date.now(),
        type: 'promo'
      }

      this.set(temp)
      this.attachComponentToProject({ id: this.zone.id, componentId: temp.id })
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
  min-height: 50px;
  border: 1px dashed #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
