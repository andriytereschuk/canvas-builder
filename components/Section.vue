<template>
  <div class="grid-container" :style="getContainerStyle(section)">
    <div
      v-for="zone in section.zones"
      :key="zone.id"
      :style="getCellStyle(zone)"
      class="position"
      @dragstart="getZone($event, zone)"
      @drop.stop="moveItem(zone)"
    >
      <Item :zone="zone" draggable />
    </div>

    <v-btn
      fab
      small
      text
      class="delete-section"
      @click="deleteSection(section.id)"
    >
      <v-icon>mdi-close</v-icon>
    </v-btn>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
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
  data: () => {
    return {
      fromZone: null,
      componentIdToMove: null
    }
  },
  methods: {
    ...mapMutations('project', ['changeZonesOrder', 'deleteSection']),
    getZone(e, fromZone) {
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.dropEffect = 'move'
      this.fromZone = fromZone
      this.componentIdToMove = fromZone.componentId
    },
    moveItem(toZone) {
      const dragData = {
        selectedSection: this.section,
        fromZone: this.fromZone,
        toZoneID: toZone.id,
        componentIdToMove: this.componentIdToMove
      }

      this.changeZonesOrder(dragData)
    },
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
  position: relative;
  max-width: 1200px;
  margin: 0 auto;

  &:last-child {
    margin-bottom: 30px;
  }

  & + & {
    margin-top: 30px;
  }

  &::before {
    content: '...';
    position: absolute;
    top: 50%;
    margin-top: -10px;
    margin-left: -20px;
    font-weight: bold;
    text-shadow: 0px 5px 0px #ffffff, 0px 10px 0px #ffffff;
    transform: translateY(-50%);
    color: #ffffff;
    cursor: grab;
  }
}

.position {
  box-sizing: border-box;
  padding: 2px;
}

.delete-section {
  position: absolute;
  right: -40px;
  top: 50%;
  transform: translateY(-50%);
}
</style>
