<template>
  <v-text-field
    v-model="value"
    :label="schema.title"
    :placeholder="schema.placeholder ? schema.placeholder : null"
  >
  </v-text-field>
</template>

<script>
import { abstractField } from 'vue-form-generator'

export default {
  mixins: [abstractField]
}
</script>
