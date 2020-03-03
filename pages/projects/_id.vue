<template>
  <div>
    <h1>Project # {{ id }}</h1>
    <ComponentsMenu v-if="isComponentsMenuOpen" />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import ComponentsMenu from '../../components/ComponentsMenu'

export default {
  components: {
    ComponentsMenu
  },
  data: () => {
    return {
      isComponentsMenuOpen: true
    }
  },
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
    }),
    closeMenu() {
      this.isComponentsMenuOpen = false
      console.log('this.isComponentsMenuOpen>> ', this.isComponentsMenuOpen)
    }
  }
}
</script>

<style></style>
