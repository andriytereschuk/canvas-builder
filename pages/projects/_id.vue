<template>
  <div>
    <Stepper />
    <ComponentsSettings ref="componentsSettings" />
  </div>
</template>

<script>
import ComponentsSettings from '../../components/ComponentsSettings'
import Stepper from '~/components/Stepper'

export default {
  components: {
    ComponentsSettings,
    Stepper
  },
  provide() {
    return {
      openComponentSettings: (component) =>
        this.$refs.componentsSettings.open(component)
    }
  }
}
</script>

<style></style>
