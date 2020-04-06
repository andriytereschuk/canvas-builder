<template>
  <div class="banner" :style="bannerStyle">
    <div
      class="background-image"
      :style="bgImageStyle"
      :role="model.imageDescription"
    />
    <div class="content" :style="contentStyle">
      <span class="text" :style="textStyle">
        {{ model.text }}
      </span>

      <a class="link" :style="linkStyle" :href="model.linkURL">
        {{ model.linkText }}
      </a>

      <button
        class="button"
        :style="buttonStyle"
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
  },
  computed: {
    bannerStyle() {
      return {
        height: this.model.height
      }
    },
    bgImageStyle() {
      return {
        background: `url(${this.model.imageURL}) no-repeat center center`,
        filter: `blur(${this.model.blur})`
      }
    },
    contentStyle() {
      return {
        backgroundColor: `rgba(${this.model.overlayColor})`,
        height: this.model.height
      }
    },
    textStyle() {
      return {
        top: this.model.textTop,
        left: this.model.textLeft,
        color: this.model.textColor,
        fontSize: this.model.textSize
      }
    },
    linkStyle() {
      return {
        top: this.model.linkTop,
        left: this.model.linkLeft,
        color: this.model.linkColor,
        fontSize: this.model.linkSize
      }
    },
    buttonStyle() {
      return {
        top: this.model.buttonTop,
        left: this.model.buttonLeft,
        color: this.model.buttonTextColor,
        backgroundColor: this.model.buttonColor,
        fontSize: this.model.buttonSize,
        height: this.model.buttonHeight,
        border: this.model.buttonBorder
      }
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

.text,
.link,
.button {
  position: absolute;
}

.button {
  padding: 5px;
  border-radius: 5px;
  box-shadow: 10px 10px 15px -8px rgba(0, 0, 0, 0.75);
}
</style>
