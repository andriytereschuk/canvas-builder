<template>
  <div class="iframe__container">
    <iframe
      class="iframe__video"
      :src="model.url"
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
