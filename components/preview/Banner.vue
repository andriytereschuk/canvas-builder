<template>
  <div class="banner" :style="{ height: model.height }">
    <div
      class="background-image"
      :style="{
        background: `url(${model.imageURL}) no-repeat center center`,
        filter: `blur(${model.blur})`
      }"
      :role="model.imageAlt"
    ></div>
    <div
      class="content"
      :style="{
        backgroundColor: `rgba(${model.overlayColor})`,
        height: model.height
      }"
    >
      <span
        :style="{
          position: 'absolute',
          top: model.textTop,
          left: model.textLeft,
          color: model.textColor,
          fontSize: model.textSize
        }"
      >
        {{ model.text }}
      </span>
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
          boxShadow: '10px 10px 15px -8px rgba(0,0,0,0.75)',
          top: model.buttonTop,
          left: model.buttonLeft,
          color: model.buttonTextColor,
          fontSize: model.fontSize,
          backgroundColor: model.buttonColor,
          fontSize: model.buttonSize,
          height: model.buttonHeight,
          border: model.buttonBorder
        }"
        @click="() => $router.push({ path: model.buttonLink })"
      >
        {{ model.buttonText }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    model: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.bannner {
  position: absolute;
  padding: 20px;
  background-size: cover;
}

.background-image {
  display: block;
  width: 100%;
  height: 100%;
  z-index: -1;
}

.content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
}
</style>
