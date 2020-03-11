<template>
  <div>
    <draggable
      v-model="changedSections"
      @start="drag = true"
      @end="drag = false"
    >
      <Section
        v-for="section in changedSections"
        :key="section.id"
        :section="section"
      />
    </draggable>
    <AddSection @add="$emit('add')" />
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import { createNamespacedHelpers } from 'vuex'
import Section from '~/components/Section.vue'
import AddSection from '~/components/AddSection.vue'

const { mapGetters, mapMutations } = createNamespacedHelpers('project')

export default {
  components: {
    Section,
    AddSection,
    draggable
  },
  computed: {
    ...mapGetters({
      sections: 'sections'
    }),
    changedSections: {
      get() {
        return this.sections
      },
      set(newSectionsSet) {
        this.changeSectionsOrder(newSectionsSet)
      }
    }
  },
  methods: {
    ...mapMutations({
      changeSectionsOrder: 'changeSectionsOrder'
    })
  }
}
</script>
