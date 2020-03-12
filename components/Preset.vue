<template>
  <div
    class="grid-container"
    :style="getContainerStyle(preset)"
    @click="select"
  >
    <div
      v-for="(zone, index) in preset.zones"
      :key="index"
      :style="getCellStyle(zone)"
      class="position"
    ></div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { getFractions, isIE } from '~/utils/helpers'

export default {
  props: {
    preset: {
      type: Object,
      required: true
    },
    closeDialog: {
      type: Function,
      required: true
    }
  },
  methods: {
    ...mapMutations('project', ['addSection']),
    select() {
      this.addSection(this.preset)
      this.closeDialog()
    },
    getContainerStyle(preset) {
      const { rows, columns } = preset

      return isIE()
        ? {
            display: ['-ms-grid'],
            'grid-rows': getFractions(rows),
            'grid-columns': getFractions(columns)
          }
        : {
            display: ['grid'],
            'grid-template-rows': getFractions(rows),
            'grid-template-columns': getFractions(columns)
          }
    },
    getCellStyle(zone) {
      const {
        coords: { start, end }
      } = zone
      console.log(zone)

      return isIE()
        ? {
            'grid-row': start.x,
            'grid-row-span': end.x - start.x,
            'grid-column': start.y,
            'grid-column-span': end.y - start.y
          }
        : { 'grid-area': `${start.x} / ${start.y} / ${end.x} / ${end.y}` }
    }
  }
}
</script>

<style lang="scss" scoped>
.grid-container {
  max-width: 100px;
  grid-gap: 1px;

  &:hover {
    .position {
      background-color: #b388ff;
    }
  }
}
.position {
  box-sizing: border-box;
  padding: 2px;
  background-color: #bebebe;
  transition: 0.1s;
}
</style>
