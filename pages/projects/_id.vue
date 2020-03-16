<template>
  <div>
    <Stepper>
      <ComponentsMenu ref="componentsMenu" />
      <Workspace @addPreset="addPreset" />
      <PresetList ref="presets" @openCustomPreset="openCustomPreset" />
    </Stepper>
    <CustomPreset ref="customPreset" @closeCustomPreset="closeCustomPreset" />
    <ComponentsSettings ref="componentsSettings" />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import ComponentsSettings from '../../components/ComponentsSettings'
import CustomPreset from '~/components/CustomPreset'
import Stepper from '~/components/Stepper'
import ComponentsMenu from '~/components/ComponentsMenu'
import Workspace from '~/components/Workspace'
import PresetList from '~/components/PresetList'

export default {
  components: {
    ComponentsSettings,
    Stepper,
    ComponentsMenu,
    Workspace,
    PresetList,
    CustomPreset
  },
  computed: {
    id() {
      return this.$route.params.id
    }
  },
  mounted() {
    this.fetch({ id: this.id })
    this.$root.$componentsMenu = this.$refs.componentsMenu.open
  },
  provide() {
    return {
      openComponentSettings: (component) =>
        this.$refs.componentsSettings.open(component)
    }
  },
  methods: {
    ...mapActions('project', {
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
