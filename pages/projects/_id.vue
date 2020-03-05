<template>
  <div>
    <h1>Project # {{ id }}</h1>
    <ComponentsMenu @closeMenu="closeMenu" />
    <Workspace :sections="data.rows" @openMenu="showMenu" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ComponentsMenu from '../../components/ComponentsMenu'
import Workspace from '~/components/Workspace'

export default {
  components: {
    ComponentsMenu,
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
