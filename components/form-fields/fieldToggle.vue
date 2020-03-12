<template>
  <v-switch v-model="value" :label="schema.title"></v-switch>
</template>

<script>
import { abstractField } from 'vue-form-generator'

export default {
  mixins: [abstractField]
}
</script>
