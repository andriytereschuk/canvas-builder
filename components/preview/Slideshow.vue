<template>
  <v-carousel
    height="400"
    :cycle="model.cycle"
    :show-arrows="model.showArrows"
    :show-arrows-on-hover="model.showArrowsOnHover"
    :hide-delimiters="model.hideDelimiters"
    :reverse="model.reverse"
  >
    <v-carousel-item v-for="(slide, i) in model.items" :key="i">
      <v-sheet height="100%">
        <v-row class="fill-height" align="center" justify="center">
          <div>{{ slide.componentId }}</div>
        </v-row>
      </v-sheet>
    </v-carousel-item>
  </v-carousel>
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
