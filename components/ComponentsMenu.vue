<template>
  <v-menu
    class="components-menu__wrapper"
    :close-on-click="closeOnClick"
    :close-on-content-click="closeOnContentClick"
    max-width="40%"
    min-width="30%"
    left
  >
    <template v-slot:activator="{ on }">
      <v-btn color="primary" v-on="on">
        Choose components
      </v-btn>
    </template>
    <v-card>
      <v-tabs
        v-model="tab"
        background-color="green darken-4"
        color="light-green"
        dark
        vertical
        class="tabs-wrapper"
      >
        <v-tab
          v-for="category in categories"
          :key="category"
          @click="selectType(category)"
        >
          {{ category }}
        </v-tab>
        <v-tabs-items v-model="tab" vertical class="tab-items-wrapper">
          <v-tab-item v-for="item in selectedCategoryItems" :key="item">
            <v-card flat class="components-menu__heading">
              <v-card-text class="title" size="18px">
                Add {{ selectedCategory }}
              </v-card-text>
              <v-icon @click="$emit('closeMenu')">mdi-close-circle</v-icon>
            </v-card>
            <v-divider></v-divider>
            <v-card flat>
              <v-card-actions class="components-menu__btn-container">
                <v-btn
                  v-for="type in selectedCategoryItems"
                  :key="type"
                  height="120px"
                  width="120px"
                  :color="componentTypes[selectedCategory][type].color"
                  @click="selectComponent(type)"
                >
                  {{ type }}
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-tabs>
    </v-card>
  </v-menu>
</template>

<script>
import { componentTypes } from '~/config/componentTypes.config'

export default {
  data: () => {
    return {
      tab: null,
      selectedCategoryItems: [],
      selectedType: '',
      selectedCategory: '',
      selectedComponent: '',
      closeOnClick: false,
      closeOnContentClick: false,
      componentTypes
    }
  },
  computed: {
    categories() {
      return Object.keys(componentTypes)
    },
    getComponents(category) {
      return Object.keys(componentTypes[category])
    }
  },
  methods: {
    selectType(category) {
      this.selectedCategoryItems = Object.keys(componentTypes[category])
      this.selectedCategory = category
      console.log(this.selectedCategoryItems)
    },
    selectComponent(type) {
      this.selectedComponent = type
      console.log(this.selectedComponent)
    }
  }
}
</script>

<style lang="scss" scoped>
.components-menu__wrapper {
  display: flex;
  max-width: 300px;
}

.components-menu__heading {
  display: flex;
  justify-content: space-between;
}
</style>
