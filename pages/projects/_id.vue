<template>
  <div>
    <WorkspaceMenu @changeMode="changeMode" />
    <h1>Project # {{ id }}</h1>
    <ComponentsMenu ref="componentsMenu" />
    <Workspace :is-reordering-mode="isReorderingMode" @add="add" />
    <PresetList ref="presets" />
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import ComponentsMenu from '../../components/ComponentsMenu'
import Workspace from '~/components/Workspace'
import WorkspaceMenu from '~/components/WorkspaceMenu'
import PresetList from '~/components/PresetList'

const { mapState, mapActions } = createNamespacedHelpers('project')

export default {
  components: {
    ComponentsMenu,
    Workspace,
    WorkspaceMenu,
    PresetList
  },
  data() {
    return {
      isDialog: false,
      isReorderingMode: false,
      isEditingComponentMode: true
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
    },
    changeMode(selectedMode) {
      if (selectedMode === 'isReorderingMode') {
        this.isReorderingMode = true
        this.isEditingComponentMode = false
      } else {
        this.isReorderingMode = false
        this.isEditingComponentMode = true
      }
    }
  }
}
</script>

<style></style>
