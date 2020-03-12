<template>
  <v-text-field v-model="value" :label="schema.title"></v-text-field>
</template>

<script>
import { abstractField } from 'vue-form-generator'

export default {
  mixins: [abstractField]
}
</script>
