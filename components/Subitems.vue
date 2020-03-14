<template>
  <div class="subitems">
    <div v-for="(item, index) in items" :key="index">
      <Item :zone="item" />
    </div>

    <v-btn @click="$emit('add')">Add item</v-btn>
  </div>
</template>

<script>
import Item from '~/components/Item'

export default {
  components: {
    Item
  },
  props: {
    items: {
      type: Array,
      required: true
    },
    add: {
      type: Function,
      default: () => {}
    }
  },
  computed: {},
  methods: {}
}
</script>

<style lang="scss" scoped></style>
