<template>
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
          <v-toolbar-title size="18px"> Add {{ item.tab }} </v-toolbar-title>
          <v-btn icon>
            <v-icon @click="$emit('closeMenu')">mdi-close-circle</v-icon>
          </v-btn>
        </v-card>
        <v-divider></v-divider>
        <v-card flat>
          <v-card-actions class="components-menu__btn-container">
            <v-btn
              v-for="componentType in item.types"
              :key="componentType[0]"
              height="100px"
              :color="componentType.color"
              style="white-space: normal"
              >{{ componentType.type }}</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
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
          types: [
            {
              type: 'slideshow',
              color: '#FFAB00'
            },
            {
              type: 'carousel',
              color: 'red'
            }
          ]
        },
        {
          tab: 'Banner',
          content: 'Banner Content',
          types: [
            {
              type: 'banner',
              color: 'blue'
            }
          ]
        },
        {
          tab: 'Video',
          content: 'Video Content',
          types: [
            {
              type: 'youtube',
              color: 'pink'
            },
            {
              type: 'embedded',
              color: '#D81B60'
            }
          ]
        },
        {
          tab: 'Advertisements',
          content: 'Advertisements Content',
          types: [
            {
              type: 'promo',
              color: '#00B0FF'
            },
            {
              type: 'offer',
              color: '#FF5722'
            }
          ]
        },
        {
          tab: 'Store',
          content: 'Store Content',
          types: [
            {
              type: 'product card',
              color: '#689F38'
            }
          ]
        }
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
  max-width: 300px;
}

.tabs-wrapper,
.tab-items-wrapper {
  flex: 1;
}

.tab-items-wrapper {
  min-width: 300px;
}

.components-menu__heading {
  display: flex;
  justify-content: space-between;
  padding: 5px 10px;
}

.components-menu__btn-container {
  display: flex;
  justify-content: space-evenly;
  padding: 20px;
}
</style>
