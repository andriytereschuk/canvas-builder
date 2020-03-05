<template>
  <div class="grid-container" :style="getContainerStyle(section)">
    <div
      v-for="(zone, index) in section.zones"
      :key="index"
      :style="getCellStyle(zone)"
      class="position"
    >
      <Item :zone="zone" />
    </div>
  </div>
</template>

<script>
import { getFractions, isIE } from '~/utils/helpers'
import Item from '~/components/Item'

export default {
  components: {
    Item
  },
  props: {
    section: {
      type: Object,
      required: true
    }
  },
  computed: {},
  methods: {
    getContainerStyle(section) {
      const { rows, columns } = section

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
  max-width: 1200px;
  margin: 0 auto;

  & + & {
    margin-top: 30px;
  }
}

.position {
  box-sizing: border-box;
  padding: 2px;
}
</style>