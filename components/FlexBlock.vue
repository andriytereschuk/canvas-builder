<template>
  <div class="flex-container">
    <div
      v-for="(zone, index) in zones"
      :key="index"
      :style="{ width: zone.width }"
      class="zone"
    >
      <div
        v-for="(component, i) in zone.components"
        :key="i"
        :style="{ width: component.width }"
        class="component"
      >
        <div class="content" :style="getStyle(component.type)">
          {{ component.content }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { componentMixin } from '~/mixins/component.mixin'

export default {
  mixins: [componentMixin],
  props: {
    zones: {
      type: Array,
      required: true
    }
  },
  methods: {
    getStyle(type) {
      const backgroundColor = this.getComponentColor(type)

      return { backgroundColor }
    }
  }
}
</script>

<style lang="scss" scoped>
.flex-container {
  display: flex;
  max-width: 1200px;
  margin: 0 auto;

  & + & {
    margin-top: 30px;
  }
}

.component {
  box-sizing: border-box;
  padding: 2px;
}

.content {
  border: 1px dashed #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  min-height: 50px;
}

.zone {
  display: flex;
  flex-wrap: wrap;
}
</style>
