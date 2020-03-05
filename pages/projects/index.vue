<template>
  <div>
    <ProjectCard v-for="item in projects" :key="item.id" :item="item" />
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import ProjectCard from '~/components/ProjectCard.vue'

const { mapGetters, mapActions } = createNamespacedHelpers('projects')

export default {
  components: {
    ProjectCard
  },
  computed: {
    ...mapGetters({
      projects: 'filtered'
    })
  },
  mounted() {
    this.fetch()
  },
  methods: {
    ...mapActions({
      fetch: 'get'
    })
  }
}
</script>

<style></style>
