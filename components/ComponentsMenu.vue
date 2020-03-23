<template>
  <v-dialog v-model="isComponentsMenuOpen" max-width="470px">
    <v-card class="components-menu__wrapper">
      <v-card class="components-menu__categories-list">
        <v-list-item
          class="list-item--accented"
          @click="selectCategory('storage')"
        >
          <v-icon class="list-item__icon">mdi-folder</v-icon>
          STORAGE
        </v-list-item>
        <v-list-item
          v-for="category in categories"
          :key="category"
          class="components-menu__categories-list__item"
          @click="selectCategory(category)"
        >
          {{ category }}
        </v-list-item>
      </v-card>
      <v-card class="components-menu__components-wrapper">
        <v-card flat class="components-menu__heading">
          <v-card-text
            v-if="selectedCategory === 'storage'"
            class="title"
            size="18px"
          >
            Add from {{ selectedCategory }}
          </v-card-text>
          <v-card-text v-else class="title" size="18px">
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
        <v-card v-if="selectedCategory === 'storage'" flat>
          <v-card-actions class="components-menu__btn-container">
            <v-btn
              v-for="component in selectedCategoryItems"
              :key="component.id"
              height="120px"
              width="120px"
              class="components-menu__category-btn"
              :color="
                getComponentColor({
                  category: component.category,
                  type: component.type
                })
              "
              @click="selectComponentFromStorage(component)"
            >
              {{ component.type }}
            </v-btn>
          </v-card-actions>
        </v-card>
        <v-card v-else flat>
          <v-card-actions class="components-menu__btn-container">
            <v-btn
              v-for="type in selectedCategoryItems"
              :key="type"
              height="120px"
              width="120px"
              class="components-menu__category-btn"
              :color="getComponentColor({ category: selectedCategory, type })"
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
import { mapActions } from 'vuex'
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
  asyncComputed: {
    storageComponents: {
      get() {
        return this.fetchComponents().then((res) => {
          if (res) {
            return res
          }
        })
      },
      default: []
    }
  },
  computed: {
    categories() {
      return Object.keys(componentConfig)
    },
    selectedCategoryItems() {
      if (this.selectedCategory !== 'storage') {
        return Object.keys(componentConfig[this.selectedCategory])
      } else {
        return this.storageComponents || 'The storage is empty'
      }
    }
  },
  methods: {
    ...mapActions('component', ['fetchComponents']),
    selectCategory(category) {
      this.selectedCategory = category
    },
    selectComponentFromStorage(component) {
      this.selectedComponent = component
      this.agree()
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
      if (this.selectedCategory === 'storage') {
        this.resolve({
          category: this.selectedComponent.category,
          type: this.selectedComponent.type,
          model:
            componentConfig[this.selectedComponent.category][
              this.selectedComponent.type
            ].model
        })
      } else {
        this.resolve({
          category: this.selectedCategory,
          type: this.selectedComponent,
          model:
            componentConfig[this.selectedCategory][this.selectedComponent].model
        })
      }
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

  &__categories-list {
    padding-top: 10px;

    &__item {
      text-transform: uppercase;
    }
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

.list-item--accented {
  display: flex;
  align-items: center;

  &:hover {
    cursor: pointer;
  }
}

.list-item__icon {
  margin-right: 5px;
  margin-bottom: 4px;
}
</style>
