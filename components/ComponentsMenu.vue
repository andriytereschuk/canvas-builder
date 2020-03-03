<template>
  <div class="components-menu__wrapper">
    <v-card class="components-menu__wrapper">
      <v-tabs
        v-model="tab"
        background-color="green darken-4"
        color="light-green"
        dark
        vertical
        class="tabs-wrapper"
      >
        <v-tab v-for="item in items" :key="item.tab">
          {{ item.tab }}
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab" vertical class="tab-items-wrapper">
        <v-tab-item v-for="item in items" :key="item.tab">
          <v-card flat class="components-menu__heading">
            <v-card-text class="title" size="18px"
              >Add {{ item.tab }}</v-card-text
            >
            <v-icon @click="$emit('closeMenu')">mdi-close-circle</v-icon>
          </v-card>
          <v-divider></v-divider>
          <v-card flat>
            <v-card-actions class="components-menu__btn-container">
              <v-btn
                v-for="type in item.types"
                :key="type[0]"
                height="120px"
                width="120px"
                :color="componentEnum.banner.color"
                >{{ type }}</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </div>
</template>

<script>
import { componentEnum } from '~/config/component.config'

export default {
  data: () => {
    return {
      componentEnum,
      tab: null,
      items: [
        {
          tab: 'Galleries',
          content: 'Galleries Content',
          types: ['slideshow', 'carousel']
        },
        {
          tab: 'Banner',
          content: 'Banner Content',
          types: ['banner']
        },
        {
          tab: 'Video',
          content: 'Video Content',
          types: ['youtube', 'embedded']
        },
        {
          tab: 'Advertisements',
          content: 'Advertisements Content',
          types: ['promo', 'offer']
        },
        { tab: 'Store', content: 'Store Content', types: ['product card'] }
      ]
    }
  },
  computed: {
    componentContent() {
      return componentEnum.banner.color
    }
  }
}
</script>

<style lang="scss" scoped>
.components-menu__wrapper {
  display: flex;
}

.tabs-wrapper,
.tab-items-wrapper {
  flex: 1;
}

.tab-items-wrapper {
  min-width: 280px;
}

.components-menu__heading {
  display: flex;
  padding: 5px 10px;
}

.components-menu__btn-container {
  display: flex;
  justify-content: space-evenly;
  padding: 20px;
}
</style>
