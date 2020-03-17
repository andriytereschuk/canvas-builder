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
    <Add @add="$emit('addPreset')" />
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import { mapGetters, mapMutations } from 'vuex'
import Section from '~/components/Section.vue'
import Add from '~/components/Add.vue'

export default {
  components: {
    Section,
    Add,
    draggable
  },
  computed: {
    ...mapGetters('project', ['sections']),
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
    ...mapMutations('project', ['changeSectionsOrder'])
  }
}
</script>
