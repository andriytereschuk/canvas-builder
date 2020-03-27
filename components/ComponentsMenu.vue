<template>
  <v-dialog v-model="dialog" max-width="470px">
    <v-card class="components-menu__wrapper">
      <v-card class="components-menu__categories-list">
        <v-list-item class="list-item--accented" @click="getStorageComponents">
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
          <v-card-text class="title" size="18px"
            >Add {{ selected.category === 'storage' && 'from' }}
            {{ selected.category }}
          </v-card-text>
          <v-btn
            class="components-menu__btn"
            color="transparent"
            min-width="20px"
            height="40px"
            @click="close"
          >
            <v-icon class="components-menu__icon">mdi-close-circle</v-icon>
          </v-btn>
        </v-card>
        <v-divider></v-divider>
        <v-card flat>
          <v-card-actions class="components-menu__btn-container">
            <!-- TODO: for storage components need to make a separate v-for -->
            <v-btn
              v-for="type in types"
              :key="type"
              height="120px"
              min-width="120px"
              class="components-menu__category-btn"
              :color="
                getComponentColor({
                  category: selected.category,
                  type
                })
              "
              @click="selectType(type)"
            >
              {{ formatName(item) }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-card>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { componentConfig } from '~/config/component.config'
import { componentMixin } from '~/mixins/component.mixin'
import { splitUppercase } from '~/utils/helpers'

export default {
  mixins: [componentMixin],
  props: {
    insideComponent: {
      type: Boolean,
      required: false
    }
  },
  data: () => {
    return {
      dialog: false,
      selected: {
        category: '',
        component: ''
      }
    }
  },
  computed: {
    ...mapGetters('component', ['components']),
    categories() {
      return Object.keys(componentConfig)
    },
    types() {
      return Object.keys(componentConfig[this.selected.category])
    },
    isStorage() {
      return this.selected.category === 'storage'
    }
  },
  created() {
    this.selected.category = this.categories[0]
  },
  methods: {
    ...mapActions('component', ['fetchComponents']),
    getStorageComponents() {
      this.selectCategory('storage')
      this.fetchComponents()
    },
    selectCategory(category) {
      this.selected.category = category
    },
    selectType(type) {
      const category = this.selected.category
      const meta = componentConfig[category][type]
      const { model } = meta
      const data = {
        type,
        category,
        model
      }
      this.agree(data)
    },
    selectComponent(component) {
      this.agree(component)
    },
    close() {
      this.dialog = false
    },
    open() {
      this.dialog = true
      return new Promise((resolve, reject) => {
        this.resolve = resolve
        this.reject = reject
      })
    },
    agree(data) {
      this.resolve(data)
      this.close()
    },
    cancel() {
      this.reject(false)
      this.close()
    },
    formatName(name) {
      return splitUppercase(name)
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
    padding: 5px !important;
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
