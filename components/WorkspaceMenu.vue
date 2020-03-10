<template>
  <v-card outlined>
    <v-card-subtitle class="subtitle">
      Select mode:
    </v-card-subtitle>
    <v-radio-group
      v-model="selectedMode"
      dense
      :change="changeMode()"
      class="radiobtn-wrapper"
    >
      <v-radio
        v-for="mode in modes"
        :key="mode.name"
        :label="mode.label"
        :value="mode.name"
      ></v-radio>
    </v-radio-group>
  </v-card>
</template>

<script>
export default {
  data: () => {
    return {
      selectedMode: 'isEditingComponentMode',
      modes: [
        {
          name: 'isReorderingMode',
          label: 'Reorder sections'
        },
        {
          name: 'isEditingComponentMode',
          label: 'Edit components'
        }
      ]
    }
  },
  methods: {
    changeMode() {
      this.$emit('changeMode', this.selectedMode)
    }
  }
}
</script>

<style lang="scss" scoped>
.radiobtn-wrapper {
  margin: 0;
}

.subtitle {
  margin: 0;
  padding-bottom: 0;
}
</style>
