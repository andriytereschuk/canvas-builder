<template>
  <v-dialog v-model="dialog" max-width="500">
    <v-card>
      <v-card-title class="headline">
        Select preset
      </v-card-title>
      <v-card-text class="preset-wrapper">
        <Preset
          v-for="(preset, index) in presets"
          :key="index"
          class="preset-item"
          :preset="preset"
          :closeDialog="close"
        />
      </v-card-text>
      <!-- <v-card-actions>
        <v-btn
          color="green darken-1"
          align="center"
          text
          @click="dialog = false"
        >
          Customize
        </v-btn>
      </v-card-actions> -->
    </v-card>
  </v-dialog>
</template>

<script>
import Preset from '~/components/Preset'
import { presets } from '~/config/preset.config'
export default {
  components: {
    Preset
  },
  data() {
    return {
      dialog: false
    }
  },
  computed: {
    presets() {
      return presets
    }
  },
  methods: {
    open() {
      this.dialog = true
    },
    close() {
      this.dialog = false
    }
  }
}
</script>

<style lang="scss" scoped>
.preset-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.preset-item {
  margin-bottom: 20px;
  height: 80px;
  width: 140px;
  background-color: black;
  outline: none;
  border: 10px solid #36454f;
  border-radius: 10%;
  cursor: pointer;
}

.headline {
  justify-content: center;
  padding: 16px;
}

.v-card__actions {
  justify-content: center;
}
</style>
