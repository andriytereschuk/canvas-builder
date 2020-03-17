<template>
  <div>
    <Stepper>
      <ComponentsMenu ref="componentsMenu" />
      <Workspace @addPreset="addPreset" />
      <PresetList ref="presets" @openCustomPreset="openCustomPreset" />
    </Stepper>
    <CustomPreset ref="customPreset" @closeCustomPreset="closeCustomPreset" />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import CustomPreset from '~/components/CustomPreset'
import Stepper from '~/components/Stepper'
import ComponentsMenu from '~/components/ComponentsMenu'
import Workspace from '~/components/Workspace'
import PresetList from '~/components/PresetList'

export default {
  components: {
    Stepper,
    ComponentsMenu,
    Workspace,
    PresetList,
    CustomPreset
  },
  created() {
    this.fetchProject(+this.$route.params.id)
  },
  provide() {
    return {
      openComponentMenu: () => this.$refs.componentsMenu.open()
    }
  },
  methods: {
    ...mapActions('project', ['fetchProject']),
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
