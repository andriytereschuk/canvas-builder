<template>
  <v-stepper v-model="e1">
    <v-stepper-header>
      <v-stepper-step :complete="e1 > 1" step="1">
        Desktop
      </v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step :complete="e1 > 2" step="2">
        Tablet
      </v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step step="3">
        Mobile
      </v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <div class="stepper-content__wrapper">
          <ComponentsMenu ref="componentsMenu" />
          <Workspace @add="add" />
          <PresetList ref="presets" />
        </div>

        <v-btn color="green darken-3" @click="e1 = 2">
          Next
        </v-btn>
      </v-stepper-content>

      <v-stepper-content step="2" class="stepper-content__wrapper">
        <div class="stepper-content__wrapper">
          <ComponentsMenu ref="componentsMenu" />
          <Workspace @add="add" />
          <PresetList ref="presets" />
        </div>

        <v-btn color="orange darken-3" class="steppen-btn" @click="e1 = 1">
          Back
        </v-btn>
        <v-btn color="green darken-3" @click="e1 = 3">
          Next
        </v-btn>
      </v-stepper-content>

      <v-stepper-content step="3">
        <div class="stepper-content__wrapper">
          <ComponentsMenu ref="componentsMenu" />
          <Workspace @add="add" />
          <PresetList ref="presets" />
        </div>

        <v-btn color="orange darken-3" class="steppen-btn" @click="e1 = 2">
          Back
        </v-btn>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import { stepsEnum } from '~/config/stepsEnum.config'
import ComponentsMenu from '~/components/ComponentsMenu'
import Workspace from '~/components/Workspace'
import PresetList from '~/components/PresetList'

const { mapState, mapActions } = createNamespacedHelpers('project')

export default {
  components: {
    ComponentsMenu,
    Workspace,
    PresetList
  },
  data: () => {
    return {
      e1: 1,
      stepsEnum,
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

<style lang="scss" scoped>
.stepper-content__wrapper {
  padding: 20px;
}

.stepper-content {
  padding: 10px;
}

button {
  margin: 20px 10px 10px 10px;
}
</style>
