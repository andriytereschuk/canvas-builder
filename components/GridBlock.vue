<template>
  <div class="grid-container" :style="getContainerStyle(section)">
    <div
      v-for="(zone, index) in section.zones"
      :key="index"
      :style="getCellStyle(zone)"
      class="component"
    >
      <div class="content" :style="setBg(zone.type)">{{ zone.content }}</div>
    </div>
  </div>
</template>

<script>
import { componentMixin } from '~/mixins/component.mixin'

export default {
  mixins: [componentMixin],
  props: {
    section: {
      type: Object,
      required: true
    }
  },
  computed: {
    isIE() {
      const agent = navigator.userAgent

      return agent.includes('Trident') && agent.includes('rv:11')
    }
  },
  methods: {
    setBg(type) {
      const backgroundColor = this.getComponentColor(type)

      return { backgroundColor }
    },
    getContainerStyle(section) {
      const { rows, columns } = section

      return {
        display: ['-ms-grid', 'grid'],
        'grid-rows': Array.from(new Array(rows))
          .map(() => '1fr')
          .join(' '),
        'grid-columns': Array.from(new Array(columns))
          .map(() => '1fr')
          .join(' ')
      }
    },
    getCellStyle(zone) {
      const {
        coords: { start, end }
      } = zone

      return this.isIE
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

.component {
  box-sizing: border-box;
  padding: 2px;
}

.content {
  height: 100%;
  min-height: 50px;
  border: 1px dashed #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
