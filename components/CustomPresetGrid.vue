<template>
  <main>
    <div id="gridcontainer">
      <section
        class="grid"
        :style="{
          gridTemplateColumns: colTemplate,
          gridTemplateRows: rowTemplate
        }"
      >
        <div
          v-for="(item, i) in divNum"
          :key="i"
          :class="'box' + i"
          :data-id="item"
          @mousedown="placeZone(item, 'start')"
          @mouseup="placeZone(item, 'end')"
          @mouseover="placeZone(item, 'hover')"
          @touchstart="placeZone(item, 'start')"
          @touchend="placeZone(item, 'end')"
        ></div>
      </section>

      <section
        class="grid gridchild"
        :style="{
          gridTemplateColumns: colTemplate,
          gridTemplateRows: rowTemplate
        }"
      >
        <div
          v-for="(zone, i) in zones"
          :key="zone"
          :class="'zone' + i"
          :style="{ gridArea: zone }"
        >
          <button class="x-mark" @click="removeZone(i)">&#x2715;</button>
        </div>
        <div
          v-if="!!previewZone"
          :class="'zone' + zones.length + 'preview'"
          :style="{ gridArea: previewZone }"
        ></div>
      </section>
    </div>
    <!--gridcontainer-->
  </main>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import { createZone, parseToObject, isIntersect } from '~/utils/helpers'

const { mapGetters, mapState, mapMutations } = createNamespacedHelpers(
  'customPreset'
)

export default {
  data() {
    return {
      createdZone: {}
    }
  },
  computed: {
    ...mapState({
      colArr: 'colArr',
      rowArr: 'rowArr',
      columns: 'columns',
      rows: 'rows',
      zones: 'zones',
      previewZone: 'previewZone'
    }),
    ...mapGetters({
      rowTemplate: 'rowTemplate',
      colTemplate: 'colTemplate',
      divNum: 'divNum'
    })
  },
  methods: {
    ...mapMutations({
      addZoneItem: 'addZoneItem',
      removeZoneItem: 'removeZoneItem',
      updateZonePreview: 'updateZonePreview'
    }),
    placeZone(item, startendhover) {
      if (
        startendhover === 'hover' &&
        Object.keys(this.createdZone).length < 2
      ) {
        return
      }
      this.createdZone[`${startendhover}Row`] = Math.ceil(item / this.columns)
      this.createdZone[`${startendhover}Col`] =
        item - (this.createdZone[`${startendhover}Row`] - 1) * this.columns

      if (startendhover === 'end') {
        const zone = createZone(this.createdZone, 'end')
        this.createdZone = {}
        this.updateZonePreview(null)

        for (let i = 0; i < this.zones.length; i++) {
          const parsedZone = parseToObject(this.zones[i])
          const temporaryZone = parseToObject(zone)

          if (isIntersect(parsedZone, temporaryZone)) {
            return
          }
        }

        this.addZoneItem(zone)
      } else if (startendhover === 'hover') {
        const zone = createZone(this.createdZone, 'hover')
        this.updateZonePreview(zone)
      } else if (startendhover === 'start') {
        this.placeZone(item, 'hover')
      }
    },
    removeZone(index) {
      this.removeZoneItem(index)
    }
  }
}
</script>

<style lang="scss" scoped>
main {
  width: calc(80vw - 50px);
  height: calc(80vh - 50px);
  margin: 15px 0 0 75px;
}
@mixin colors($max, $color-frequency) {
  $color: 300 / $max;
  // different zone colors
  @for $i from 1 through $max {
    div[class*='zone']:nth-child(#{$i}) {
      background: hsla(($i - 15) * ($color * 1.5), 80%, 30%, 0.7);
      border: 1px solid #ddd;

      &.preview {
        background: hsla(($i - 15) * ($color * 1.5), 80%, 30%, 0.3);
      }
    }
  }
}
.gridchild {
  counter-reset: step;
  div {
    counter-increment: step;
    position: relative;
    &:before {
      position: absolute;
      content: 'zone ' counter(step);
      display: block;
      padding: 0 5px;
      text-align: center;
      color: white;
    }
    button {
      position: absolute;
      right: 5px;
      top: 5px;
      width: 20px;
      height: 20px;
      margin: 0;
      color: white;
      background-color: transparent;
      border: none;
      z-index: 2;
    }
  }
}
#gridcontainer {
  border: 1px solid #b388ff;
  width: 100%;
  height: 100%;
  z-index: 0;
  position: relative;
  background: linear-gradient(to bottom, #131321 0%, #1f1c2c 100%);
  box-shadow: 0 2px 20px 0 #000;
}
.grid {
  width: 100%;
  height: 100%;
  position: absolute;
  display: grid;
  grid-auto-flow: row dense;
  @include colors(20, 100);
  p {
    padding: 0 10px;
  }
  div[class*='box'] {
    border: 1px solid white;
    transition: 0.2s all ease;
    cursor: move;
    position: relative;
    z-index: 1;
    opacity: 0.5;
  }
}
input {
  font-size: 17px;
  background: #211f2f;
  color: white;
  width: 50px;
  padding: 0.3ch 5px;
  max-height: 40px;
  border: 1px solid #666;
}

@media screen and (max-width: 700px) {
  main {
    width: calc(80vw - 50px);
    height: calc(40vh - 50px);
  }
}
</style>
