<template>
  <div>
    <div v-if="!isReorderingMode">
      <Section
        v-for="section in sections"
        :key="section.id"
        :section="section"
      />
    </div>
    <draggable
      v-if="isReorderingMode"
      v-model="sections"
      @start="drag = true"
      @end="save()"
    >
      <Section
        v-for="section in sections"
        :key="section.id"
        :section="section"
      />
    </draggable>
    <AddSection @add="$emit('add')" />
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import Section from '~/components/Section.vue'
import AddSection from '~/components/AddSection.vue'

export default {
  components: {
    Section,
    AddSection,
    draggable
  },
  props: {
    sections: {
      type: Array,
      required: true
    },
    isReorderingMode: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  methods: {
    save() {
      this.drag = false
      this.$emit('add')
    }
  }
}
</script>
