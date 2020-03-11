<template>
  <div>
    <h1>Project # {{ id }}</h1>
    <ComponentsMenu ref="componentsMenu" />
    <Workspace @add="add" />
    <PresetList ref="presets" />
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import ComponentsMenu from '../../components/ComponentsMenu'
import Workspace from '~/components/Workspace'
import PresetList from '~/components/PresetList'

const { mapState, mapActions } = createNamespacedHelpers('project')

export default {
  components: {
    ComponentsMenu,
    Workspace,
    PresetList
  },
  data() {
    return {
      isDialog: false
    }
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
    }),
    add() {
      return this.$refs.presets.open()
    }
  }
}
</script>

<style></style>
