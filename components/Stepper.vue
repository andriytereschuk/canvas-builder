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
          <slot />
        </div>

        <v-btn color="green darken-3" @click="changeStep(2, steps.mobile)">
          Next
        </v-btn>
      </v-stepper-content>

      <v-stepper-content step="2">
        <div class="stepper-content__wrapper mobile">
          <slot />
        </div>

        <v-btn
          color="orange darken-3"
          class="steppen-btn"
          @click="changeStep(1, steps.desktop)"
        >
          Back
        </v-btn>
        <v-btn
          color="green darken-3"
          class="steppen-btn"
          @click="changeStep(3, steps.finish)"
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
          @click="changeStep(2, steps.mobile)"
        >
          Back
        </v-btn>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import { steps } from '~/config/steps.config'

export default {
  data: () => {
    return {
      stepNumber: 1,
      steps
    }
  },
  computed: {
    ...mapState('project', ['project', 'step'])
  },
  methods: {
    ...mapMutations('project', ['setStep']),
    ...mapActions('project', ['save']),
    add() {
      return this.$refs.presets.open()
    },
    changeStep(stepNumber, step) {
      this.stepNumber = stepNumber

      if (step === steps.finish) {
        this.save()
        return
      }

      this.setStep(step)
    }
  }
}
</script>

<style lang="scss" scoped>
.mobile {
  width: 420px;
  margin: auto;
}
.stepper-content__wrapper {
  padding: 20px;
}

button {
  margin: 20px 10px 10px 10px;
}
</style>
