<template>
  <div>
    <h1>Project # {{ id }}</h1>
    <ComponentsMenu ref="componentsMenu" />
    <Workspace :sections="project.rows" @addPreset="addPreset" />
    <PresetList ref="presets" @openCustomPreset="openCustomPreset" />
    <CustomPreset ref="customPreset" @closeCustomPreset="closeCustomPreset" />
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import ComponentsMenu from '../../components/ComponentsMenu'
import CustomPreset from '~/components/CustomPreset'
import Workspace from '~/components/Workspace'
import PresetList from '~/components/PresetList'

const { mapState, mapActions } = createNamespacedHelpers('project')

export default {
  components: {
    ComponentsMenu,
    Workspace,
    PresetList,
    CustomPreset
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
    addPreset() {
      return this.$refs.presets.open()
    },
    openCustomPreset() {
      this.$refs.customPreset.open()
      this.$refs.presets.close()
    },
    closeCustomPreset() {
      this.$refs.customPreset.close()
    }
  }
}
</script>

<style></style>
