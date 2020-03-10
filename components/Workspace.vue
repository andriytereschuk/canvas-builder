<template>
  <div>
    <div v-if="!isReorderingMode">
      <Section
        v-for="section in sectionsFromStore"
        :key="section.id"
        :section="section"
      />
    </div>
    <draggable
      v-if="isReorderingMode"
      v-model="changedSections"
      @start="drag = true"
      @end="drag = false"
    >
      <Section
        v-for="section in changedSections"
        :key="section.id"
        :section="section"
        :is-reordering-mode="isReorderingMode"
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
  props: {
    isReorderingMode: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  computed: {
    ...mapGetters({
      sectionsFromStore: 'sections'
    }),
    changedSections: {
      get() {
        return this.sectionsFromStore
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
