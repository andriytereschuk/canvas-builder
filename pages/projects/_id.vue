<template>
  <div>
    <h1>Project # {{ id }}</h1>
    <ComponentsMenu ref="componentsMenu" />
    <Workspace :sections="project.rows" />
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import ComponentsMenu from '../../components/ComponentsMenu'
import Workspace from '~/components/Workspace'

const { mapState, mapActions } = createNamespacedHelpers('project')

export default {
  components: {
    ComponentsMenu,
    Workspace
  },
  computed: {
    id() {
      return this.$route.params.id
    },
    ...mapState({
      project: 'project'
    })
  },
  mounted() {
    this.fetch({ id: this.id })
    this.$root.$componentsMenu = this.$refs.componentsMenu.open
  },
  methods: {
    ...mapActions({
      fetch: 'get'
    })
  }
}
</script>

<style></style>
