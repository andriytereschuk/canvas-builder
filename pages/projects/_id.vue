<template>
  <h1>Project # {{ id }}</h1>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  computed: {
    id() {
      return this.$route.params.id
    }
  },
  mounted() {
    this.fetch({ id: this.id })
  },
  methods: {
    ...mapActions({
      fetch: 'project/get'
    })
  }
}
</script>

<style></style>
