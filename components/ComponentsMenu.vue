<template>
  <v-menu
    :close-on-click="closeOnClick"
    :close-on-content-click="closeOnContentClick"
    left
  >
    <template v-slot:activator="{ on }">
      <v-btn color="primary" v-on="on">
        Choose components
      </v-btn>
    </template>
    <v-card class="components-menu__wrapper">
      <v-card class="components-menu__categories-wrapper">
        <v-list-item
          v-for="category in categories"
          :key="category"
          class="components-menu__categories-list-item"
          @click="selectType(category)"
        >
          {{ category }}
        </v-list-item>
      </v-card>
      <v-card class="components-menu__components-wrapper">
        <v-card flat class="components-menu__heading">
          <v-card-text class="title" size="18px">
            Add {{ selectedCategory }}
          </v-card-text>
          <v-btn
            class="components-menu__btn"
            color="transparent"
            min-width="20px"
            height="40px"
          >
            <v-icon class="components-menu__icon" @click="$emit('closeMenu')">
              mdi-close-circle
            </v-icon>
          </v-btn>
        </v-card>
        <v-divider></v-divider>
        <v-card flat>
          <v-card-actions class="components-menu__btn-container">
            <v-btn
              v-for="type in selectedCategoryItems"
              :key="type"
              height="120px"
              width="120px"
              class="components-menu__category-btn"
              :color="componentTypes[selectedCategory][type].color"
              @click="selectComponent(type)"
            >
              {{ type }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-card>
    </v-card>
  </v-menu>
</template>

<script>
import { componentTypes } from '~/config/componentTypes.config'

export default {
  data: () => {
    return {
      tab: null,
      selectedType: '',
      selectedCategory: 'galleries',
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
    selectedCategoryItems() {
      return Object.keys(componentTypes[this.selectedCategory])
    }
  },
  methods: {
    selectType(category) {
      this.selectedCategoryItems = Object.keys(componentTypes[category])
      this.selectedCategory = category
    },
    selectComponent(type) {
      this.selectedComponent = type
    }
  }
}
</script>

<style lang="scss" scoped>
.components-menu {
  &__wrapper {
    display: flex;
  }

  &__heading {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__components-wrapper {
    display: flex;
    flex-direction: column;
    width: 300px;
  }

  &__categories-list-item {
    text-transform: uppercase;
  }

  &__icon {
    margin: 0 10px;
  }

  &__btn {
    border-radius: 30px;
    margin: 5px;
  }

  &__btn-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    max-height: 600px;
    padding: 10px;
    overflow: scroll;
  }

  &__category-btn {
    margin: 10px;
  }
}

.v-btn:not(.v-btn--round).v-size--default {
  padding: 0;
}
</style>
