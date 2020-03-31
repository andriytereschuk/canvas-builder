<template>
  <div
    :ref="banner"
    class="banner"
    tile
    :style="{
      background: `url(${model.imageURL}) no-repeat center center fixed`,
      height: model.height
    }"
    :role="model.imageAlt"
  >
    <TextEditor />
    <div
      v-for="item in model.textblock"
      :key="item.id"
      v-draggable="draggableValue"
      :style="{ position: 'absolute', top: item.top, left: item.left }"
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
import { mapActions } from 'vuex'
import { Draggable } from 'draggable-vue-directive'
import TextEditor from '~/components/TextEditor'

export default {
  directives: {
    Draggable
  },
  components: {
    TextEditor
  },
  // props: {
  //   model: {
  //     type: Object,
  //     required: true
  //   }
  // },
  data: () => {
    return {
      editor: null,
      handleId: 'handle-id',
      banner: 'banner',
      draggableValue: {},
      draggedItem: '',
      newModel: {},
      model: {
        imageURL:
          'https://world.fantasticimago.com/wp-content/uploads/2013/12/Cool-Light-Grey-background-fantastic-imago-creative-studio-video-production.jpg',
        imageAlt: 'Orange background',
        height: '500px',
        textblock: [
          {
            id: '1',
            type: 'text',
            content: 'Sample text',
            link: '',
            fontSize: '14px',
            fontFamily: 'sans-serif',
            fontColor: 'black',
            fontWeight: 'bold',
            top: '10%',
            left: '30%'
          }
        ]
      }
    }
  },
  mounted() {
    this.draggableValue.handle = this.$refs[this.handleId]
    this.draggableValue.onDragEnd = this.getPosition
    this.draggableValue.onDragStart = this.getItem
    this.draggableValue.boundingElement = this.$refs[this.banner]
    this.newModel = JSON.parse(JSON.stringify(this.model))
  },
  methods: {
    ...mapActions('component', ['fetchComponent']),
    getItem(positionDiff, absolutePosition, event) {
      this.draggedItem =
        event.target.getAttribute('class') === 'drag-handle'
          ? event.target.parentNode.children[1].textContent.trim()
          : event.target.textContent.trim()
    },
    getPosition(positionDiff, absolutePosition, event) {
      const banner = this.$refs[this.banner]
      const bannerTop = banner.getBoundingClientRect().top
      const bannerLeft = banner.getBoundingClientRect().left
      const itemLeft = absolutePosition.left - bannerLeft
      const itemTop = absolutePosition.top - bannerTop
      const modelLeft = `${(
        (itemLeft * 100) /
        banner.getBoundingClientRect().width
      ).toFixed()}%`
      const modelTop = `${(
        (itemTop * 100) /
        banner.getBoundingClientRect().height
      ).toFixed()}%`
      this.newModel.textblock.map((el) => {
        if (this.draggedItem === el.content) {
          el.left = modelLeft
          el.top = modelTop
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.banner {
  position: relative;
  background-size: cover;
  padding: 20px;
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
