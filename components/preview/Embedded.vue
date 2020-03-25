<template>
  <div class="iframe__container">
    <iframe
      class="embed-responsive-item"
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
  padding-top: 50px;
  widows: 100%;
  height: 100%;
}

.embed-responsive-item {
  width: 806px;
  height: 453px;
}
</style>
