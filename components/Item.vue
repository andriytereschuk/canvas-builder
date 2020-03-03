<template>
  <div class="component" :style="bg" @click="attachComponent()">
    <div v-if="component">
      {{ component.type }}
    </div>
  </div>
</template>

<script>
import { componentMixin } from '~/mixins/component.mixin'

export default {
  mixins: [componentMixin],
  props: {
    zone: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    component: null
  }),
  computed: {
    bg() {
      const type = (this.component && this.component.type) || null
      const backgroundColor = this.getComponentColor(type)

      return { backgroundColor }
    },
    isEmpty() {
      return this.zone.status === 'empty'
    }
  },
  methods: {
    attachComponent() {
      // const { id } = this.zone
      const temp = {
        type: 'promo'
      }

      this.component = temp
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
