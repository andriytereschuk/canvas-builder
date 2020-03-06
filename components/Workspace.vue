<template>
  <div>
    <Section v-for="section in sections" :key="section.id" :section="section" />
    <AddSection @add="$emit('add')" />
  </div>
</template>

<script>
import Section from '~/components/Section.vue'
import AddSection from '~/components/AddSection.vue'

export default {
  components: {
    Section,
    AddSection
  },
  props: {
    sections: {
      type: Array,
      required: true
    }
  }
}
</script>
