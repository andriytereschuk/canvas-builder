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
          @mousedown="placeChild(item, 's')"
          @mouseup="placeChild(item, 'e')"
          @mouseover="placeChild(item, 'h')"
          @touchstart="placeChild(item, 's')"
          @touchend="placeChild(item, 'e')"
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
          v-for="(children, i) in childarea"
          :key="children"
          :class="'children' + i"
          :style="{ gridArea: children }"
        >
          <button class="x-mark" @click="removeChild(i)">&#x2715;</button>
        </div>
        <div
          v-if="!!previewarea"
          :class="'children' + childarea.length + ' preview'"
          :style="{ gridArea: previewarea }"
        ></div>
      </section>
    </div>
    <!--gridcontainer-->
  </main>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import { makeChildString, parseToObject, isIntersect } from '~/utils/helpers'

const { mapGetters, mapState, mapMutations } = createNamespacedHelpers(
  'customPreset'
)

export default {
  data() {
    return {
      child: {},
      widthfull: 'widthfull',
      errors: {
        col: [],
        row: []
      }
    }
  },
  computed: {
    ...mapState({
      colArr: 'colArr',
      rowArr: 'rowArr',
      columns: 'columns',
      rows: 'rows',
      childarea: 'childarea',
      previewarea: 'previewarea'
    }),
    ...mapGetters({
      rowTemplate: 'rowTemplate',
      colTemplate: 'colTemplate',
      divNum: 'divNum',
      customPreset: 'customPreset'
    })
  },
  methods: {
    ...mapMutations({
      addChildren: 'addChildren',
      removeChildren: 'removeChildren',
      updateChildPreview: 'updateChildPreview'
    }),
    placeChild(item, startendhover) {
      if (startendhover === 'h' && Object.keys(this.child).length < 2) {
        return
      }
      // built an object first because I might use this for something else
      this.child[`${startendhover}row`] = Math.ceil(item / this.columns)
      this.child[`${startendhover}col`] =
        item - (this.child[`${startendhover}row`] - 1) * this.columns
      // create the children css units as a string

      if (startendhover === 'e') {
        // flip starts and ends if dragged in the opposite direction
        const childstring = makeChildString(this.child, 'e')
        this.child = {}
        this.updateChildPreview(null)

        for (let i = 0; i < this.childarea.length; i++) {
          const parsedZone = parseToObject(this.childarea[i])
          const temporaryZone = parseToObject(childstring)

          if (isIntersect(parsedZone, temporaryZone)) {
            return
          }
        }

        this.addChildren(childstring)
      } else if (startendhover === 'h') {
        const childstring = makeChildString(this.child, 'h')
        this.updateChildPreview(childstring)
      }
      // we're starting a child, so let's update the hover preview
      else if (startendhover === 's') {
        this.placeChild(item, 'h')
      }
    },
    removeChild(index) {
      this.removeChildren(index)
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
  // fruit loops!
  @for $i from 1 through $max {
    div[class*='child']:nth-child(#{$i}) {
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
  background: #131321; /* Old browsers */
  background: -moz-linear-gradient(
    top,
    #131321 0%,
    #1f1c2c 100%
  ); /* FF3.6-15 */
  background: -webkit-linear-gradient(
    top,
    #131321 0%,
    #1f1c2c 100%
  ); /* Chrome10-25,Safari5.1-6 */
  background: linear-gradient(
    to bottom,
    #131321 0%,
    #1f1c2c 100%
  ); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#131321', endColorstr='#1f1c2c',GradientType=0 ); /* IE6-9 */
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
.rowunits,
.colunits {
  display: grid;
  div {
    text-align: center;
    position: relative;
  }
}
.rowunits {
  margin-left: -70px;
  float: left;
  height: 100%;
  div {
    align-self: center;
  }
}
.widthfull {
  width: 100%;
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
.errors {
  position: absolute;
  bottom: -5px;
  border-radius: 4px;
  padding: 8px 12px;
  z-index: 1;
  font-weight: bold;
  width: 150px;
  min-height: 50px;
  background: #6d1a39;
}
</style>
