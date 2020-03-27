<template>
  <v-card
    class="banner__wrapper"
    :style="{ backgroundImage: 'url(' + model.imageURL + ')' }"
  >
    {{ model }}
    <div v-for="contentItem in model.textBlock" :key="contentItem.id">
      {{ contentItem.text }}
    </div>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data: () => {
    return {
      model: {}
    }
  },
  computed: {
    ...mapGetters('component', ['getComponentById']),
    component() {
      return this.getComponentById(+this.$route.params.id)
    }
  },
  created() {
    if (!this.component) {
      this.fetchComponent(+this.$route.params.id)
    }
    this.model = JSON.parse(JSON.stringify(this.component.model))
  },
  methods: {
    ...mapActions('component', ['fetchComponent'])
  }
}
</script>

<style scoped></style>
