<template>
  <div class="banner" :style="bannerStyle">
    <div
      class="background-image"
      :style="bgImageStyle"
      :role="model.imageAlt"
    />
    <div class="content" :style="contentStyle">
      <span class="text" :style="textStyle">
        {{ model.text.content }}
      </span>

      <a class="link" :style="linkStyle" :href="model.link.url">
        {{ model.link.text }}
      </a>

      <button
        class="button"
        :style="buttonStyle"
        @click="() => $router.push({ path: model.button.link })"
      >
        {{ model.button.text }}
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
        top: this.model.text.top,
        left: this.model.text.left,
        color: this.model.text.color,
        fontSize: this.model.text.size
      }
    },
    linkStyle() {
      return {
        top: this.model.link.top,
        left: this.model.link.left,
        color: this.model.link.color,
        fontSize: this.model.link.size
      }
    },
    buttonStyle() {
      return {
        top: this.model.button.top,
        left: this.model.button.left,
        color: this.model.button.textColor,
        backgroundColor: this.model.button.color,
        fontSize: this.model.button.size,
        height: this.model.button.height,
        border: this.model.button.border
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
