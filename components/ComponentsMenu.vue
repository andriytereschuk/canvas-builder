<template>
  <v-menu class="components-menu__wrapper">
    <template v-slot:activator="{ on }">
      <v-btn color="primary" dark v-on="on">
        Open menu
      </v-btn>
    </template>
    <v-list>
      <v-list-item
        v-for="category in categories"
        :key="category[0]"
        @click="selectType"
      >
        <v-list-item-title>
          {{ category }}
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import { componentTypes } from '~/config/componentTypes.config'

export default {
  data: () => {
    return {
      selectedType: ''
    }
  },
  computed: {
    categories() {
      return Object.keys(componentTypes)
    }
  },
  methods: {
    selectType() {
      console.log(this.selectedType)
    },
    getComponents(category) {
      return Object.keys(componentTypes[category])
    }
  }
}
</script>

<style lang="scss" scoped>
.components-menu__wrapper {
  display: flex;
  max-width: 300px;
}
</style>
