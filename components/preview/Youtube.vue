<template>
  <div class="iframe__container">
    <iframe
      class="iframe__video"
      :src="transformLink(model.url)"
      frameborder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      :allowfullscreen="model.fullscreen"
    ></iframe>
  </div>
</template>

<script>
export default {
  props: {
    model: {
      type: () => Object,
      default: {}
    }
  },
  methods: {
    getVideoId(url) {
      const videoRegExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
      const match = url.match(videoRegExp)

      return match && match[2].length === 11 ? match[2] : null
    },

    transformLink(url) {
      const videoId = this.getVideoId(url)

      return `//www.youtube.com/embed/${videoId}`
    }
  }
}
</script>

<style scoped>
.iframe__container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  height: 100%;
}

.iframe__video {
  width: inherit;
  height: inherit;
}
</style>
