<template>
  <div>
    <h1>Project # {{ id }}</h1>
    <Workspace :sections="data.rows" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Workspace from '~/components/Workspace'

export default {
  components: {
    Workspace
  },
  computed: {
    id() {
      return this.$route.params.id
    },
    ...mapGetters({
      data: 'project/data'
    })
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
