<template>
  <div
    class="banner"
    tile
    :style="{
      background: `url(${model.imageURL ||
        defaultBanner.imageURL}) no-repeat center center`,
      height: model.height || defaultBanner.bannerHeight
    }"
    :role="model.imageAlt"
  >
    <span
      :style="{
        position: 'absolute',
        top: model.textTop,
        left: model.textLeft,
        color: model.textColor,
        fontSize: model.textSize
      }"
      >{{ model.text }}</span
    >
    <a
      :href="model.linkURL"
      :style="{
        position: 'absolute',
        top: model.linkTop,
        left: model.linkLeft,
        color: model.linkColor,
        fontSize: model.linkSize
      }"
    >
      {{ model.linkText }}
    </a>

    <button
      :style="{
        position: 'absolute',
        padding: '5px',
        borderRadius: '5px',
        top: model.buttonTop,
        left: model.buttonLeft,
        color: model.buttonTextColor,
        fontSize: model.fontSize,
        backgroundColor: model.buttonColor,
        fontSize: model.buttonSize,
        height: model.buttonHeight,
        border: model.buttonBorder
      }"
      @click="
        () => {
          $router.push({ path: model.buttonLink })
        }
      "
    >
      {{ model.buttonText }}
    </button>
  </div>
</template>

<script>
export default {
  props: {
    model: {
      type: Object,
      required: true
    }
  },
  data: () => {
    return {
      defaultBanner: {
        bannerHeight: '500px',
        imageURL:
          'https://clinicpsychology.com/wp-content/uploads/2015/08/23394-grey-blur-1680x1050-abstract-wallpaper.jpg'
      }
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
</style>
