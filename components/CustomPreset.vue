<template>
  <v-dialog
    v-model="dialog"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <v-card>
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Make your own preset!</v-toolbar-title>
      </v-toolbar>
      <v-list three-line subheader>
        <v-list-item>
          <section class="container">
            <CustomPresetGrid />
            <CustomPresetOptions
              @closeCustomPreset="$emit('closeCustomPreset')"
            />
          </section>
        </v-list-item>
      </v-list>
    </v-card>
  </v-dialog>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import CustomPresetGrid from './CustomPresetGrid'
import CustomPresetOptions from './CustomPresetOptions'
const { mapMutations } = createNamespacedHelpers('customPreset')
export default {
  components: {
    CustomPresetOptions,
    CustomPresetGrid
  },
  data() {
    return {
      dialog: false
    }
  },
  created() {
    this.initialArrIndex()
  },
  methods: {
    ...mapMutations({
      initialArrIndex: 'initialArrIndex'
    }),
    open() {
      this.dialog = true
    },
    close() {
      this.dialog = false
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
}

@media (min-width: 960px) {
  .container {
    max-width: 100%;
  }
}
</style>
