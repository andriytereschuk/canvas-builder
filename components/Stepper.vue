<template>
  <v-stepper v-model="stepNumber">
    <v-stepper-header>
      <v-stepper-step :complete="stepNumber > 1" step="1">
        Desktop
      </v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step :complete="stepNumber > 2" step="2">
        Mobile
      </v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step step="3">
        Finish
      </v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <div class="stepper-content__wrapper">
          <ComponentsMenu ref="componentsMenu" />
          <Workspace :current-step="currentStep" @add="add" />
          <PresetList ref="presets" />
        </div>

        <v-btn color="green darken-3" @click="changeStep(2)">
          Next
        </v-btn>
      </v-stepper-content>

      <v-stepper-content step="2">
        <div class="stepper-content__wrapper mobile">
          <ComponentsMenu ref="componentsMenu" />
          <Workspace :current-step="currentStep" @add="add" />
          <PresetList ref="presets" />
        </div>

        <v-btn
          color="orange darken-3"
          class="steppen-btn"
          @click="changeStep(1)"
        >
          Back
        </v-btn>
        <v-btn
          color="green darken-3"
          class="steppen-btn"
          @click="changeStep(3)"
        >
          Next
        </v-btn>
      </v-stepper-content>
      <v-stepper-content step="3">
        <json-viewer
          :value="project"
          theme="json-theme"
          :expand-depth="6"
          copyable
          class="stepper-content__wrapper"
        ></json-viewer>
        <v-btn
          color="orange darken-3"
          class="steppen-btn"
          @click="changeStep(2)"
        >
          Back
        </v-btn>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import { stepsEnum } from '~/config/stepsEnum.config'
import ComponentsMenu from '~/components/ComponentsMenu'
import Workspace from '~/components/Workspace'
import PresetList from '~/components/PresetList'

export default {
  components: {
    ComponentsMenu,
    Workspace,
    PresetList
  },
  data: () => {
    return {
      stepsEnum,
      stepNumber: 1,
      currentStep: 'desktop'
    }
  },
  computed: {
    id() {
      return this.$route.params.id
    },
    ...mapState('project', ['project'])
  },
  mounted() {
    this.fetch({ id: this.id })
    this.$root.$componentsMenu = this.$refs.componentsMenu.open
  },
  methods: {
    ...mapActions('project', {
      fetch: 'get'
    }),
    ...mapMutations('project', ['setCurrentStep']),
    add() {
      return this.$refs.presets.open()
    },
    changeStep(stepNum) {
      this.stepNumber = stepNum
      this.changeCurrentStep(stepNum)
      this.setCurrentStep(this.currentStep)
    },
    changeCurrentStep(stepNum) {
      switch (stepNum) {
        case 1:
          this.currentStep = this.stepsEnum.desktop
          return this.stepsEnum.desktop
        case 2:
          this.currentStep = this.stepsEnum.mobile
          return this.stepsEnum.mobile
        case 3:
          this.currentStep = 'finish'
          return 'finish'
        default:
          return this.stepsEnum.desktop
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.mobile {
  width: 320px;
  margin: auto;
}
.stepper-content__wrapper {
  padding: 20px;
}

button {
  margin: 20px 10px 10px 10px;
}
</style>
