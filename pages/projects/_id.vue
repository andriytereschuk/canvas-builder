<template>
  <div>
    <h1>Project # {{ id }}</h1>
    <ComponentsMenu v-if="isComponentsMenuOpen" @closeMenu="closeMenu" />
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
  data: () => {
    return {
      isComponentsMenuOpen: true
    }
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
    }),
    closeMenu() {
      this.isComponentsMenuOpen = false
    },
    showMenu() {
      this.isComponentsMenuOpen = true
    }
  }
}
</script>

<style></style>
