<template>
  <v-dialog v-model="isComponentsMenuOpen" max-width="470px">
    <v-card class="components-menu__wrapper">
      <v-card>
        <v-list-item
          v-for="category in categories"
          :key="category"
          class="components-menu__categories-list-item"
          @click="selectCategory(category)"
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
            @click="closeMenu"
          >
            <v-icon class="components-menu__icon">mdi-close-circle</v-icon>
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
              :color="getComponentColor(selectedCategory, type)"
              @click="selectComponent(type)"
            >
              {{ type }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-card>
    </v-card>
  </v-dialog>
</template>

<script>
import { componentConfig } from '~/config/component.config'
import { componentMixin } from '~/mixins/component.mixin'

export default {
  mixins: [componentMixin],
  data: () => {
    return {
      isComponentsMenuOpen: false,
      selectedCategory: 'galleries',
      selectedComponent: '',
      componentConfig
    }
  },
  computed: {
    categories() {
      return Object.keys(componentConfig)
    },
    selectedCategoryItems() {
      return Object.keys(componentConfig[this.selectedCategory])
    }
  },
  methods: {
    selectCategory(category) {
      this.selectedCategory = category
    },
    selectComponent(type) {
      this.selectedComponent = type
      this.agree()
    },
    closeMenu() {
      this.isComponentsMenuOpen = false
    },
    open() {
      this.isComponentsMenuOpen = true
      return new Promise((resolve, reject) => {
        this.resolve = resolve
        this.reject = reject
      })
    },
    agree() {
      this.resolve({
        category: this.selectedCategory,
        type: this.selectedComponent,
        model:
          componentConfig[this.selectedCategory][this.selectedComponent].model
      })
      this.closeMenu()
    },
    cancel() {
      this.reject(false)
      this.closeMenu()
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
