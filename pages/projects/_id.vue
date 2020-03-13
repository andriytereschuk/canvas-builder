<template>
  <div>
    <Stepper>
      <ComponentsMenu ref="componentsMenu" />
      <Workspace :current-step="currentStep" @add="add" />
      <PresetList ref="presets" />
    </Stepper>
    <ComponentsSettings ref="componentsSettings" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ComponentsSettings from '../../components/ComponentsSettings'
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
    PresetList
  },
  computed: {
    ...mapGetters('project', ['currentStep']),
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
    add() {
      return this.$refs.presets.open()
    }
  }
}
</script>

<style></style>
