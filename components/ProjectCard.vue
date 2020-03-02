<template>
  <div>
    <nuxt-link :to="{ name: 'projects-id', params: { id: item.id } }"
      >card #{{ item.id }}</nuxt-link
    >
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped></style>
