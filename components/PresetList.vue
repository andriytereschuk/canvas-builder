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
          :close-dialog="close"
        />
      </v-card-text>
      <v-card-actions>
        <v-btn
          rounded
          color="deep-purple accent-4"
          align="center"
          @click="$emit('openCustomPreset')"
        >
          Customize
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState } from 'vuex'
import { presets } from '~/config/preset.config'
import Preset from '~/components/Preset'

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
    ...mapState('project', ['project', 'step']),
    presets() {
      return presets[this.step]
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
