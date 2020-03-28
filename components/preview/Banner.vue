<template>
  <div
    class="banner"
    tile
    :style="{
      background: `url(${model.imageURL}) no-repeat center center fixed`,
      height: model.height
    }"
    :role="model.imageAlt"
  >
    <div
      v-for="item in model.textblock"
      :key="item.id"
      v-draggable="draggableValue"
      class="item-wrapper"
    >
      <div :ref="handleId" class="drag-handle" />
      <span
        v-if="item.type === 'text' && !item.link"
        :style="{ color: item.fontColor, fontSize: item.fontSize }"
      >
        {{ item.content }}
      </span>

      <a
        v-if="item.type === 'text' && item.link"
        :href="item.link"
        :style="{
          color: item.fontColor,
          fontSize: item.fontSize,
          fontFamily: item.fontFamily,
          fontWeight: item.fontWeight
        }"
      >
        {{ item.content }}
      </a>

      <button
        v-if="item.type === 'button'"
        :style="{
          color: item.fontColor,
          fontSize: item.fontSize,
          fontFamily: item.fontFamily,
          fontWeight: item.fontWeight,
          border: item.border,
          height: item.height
        }"
      >
        {{ item.content }}
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { Draggable } from 'draggable-vue-directive'

export default {
  directives: {
    Draggable
  },
  data: () => {
    return {
      model: {},
      handleId: 'handle-id',
      draggableValue: {}
    }
  },
  computed: {
    ...mapGetters('component', ['getComponentById']),
    component() {
      return this.getComponentById(+this.$route.params.id)
    }
  },
  created() {
    console.log('this.component', this.component)
    if (!this.component) {
      this.fetchComponent(+this.$route.params.id)
    }
    this.model = JSON.parse(JSON.stringify(this.component.model))
    console.log('this.model', this.model)
  },
  mounted() {
    console.log(this.draggableValue)
    this.draggableValue.handle = this.$refs[this.handleId]
    this.draggableValue.onDragEnd = this.getPosition
  },
  methods: {
    ...mapActions('component', ['fetchComponent']),
    getPosition(positionDiff, absolutePosition, event) {
      console.log('left corner', absolutePosition.left)
      console.log('top corner', absolutePosition.top)
    }
  }
}
</script>

<style lang="scss" scoped>
.banner {
  background-size: cover;
  padding: 20px;
}

.item-wrapper {
  position: relative;
}

.drag-handle::after {
  content: '...';
  position: absolute;
  top: 50%;
  margin-top: -10px;
  margin-left: -20px;
  font-weight: bold;
  text-shadow: 0px 5px 0px red, 0px 10px 0px red;
  transform: translateY(-50%);
  color: red;
  cursor: grab;
}
</style>
