<template>
  <div>
    <ProjectCard v-for="item in projects" :key="item.id" :item="item" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ProjectCard from '~/components/ProjectCard.vue'

export default {
  components: {
    ProjectCard
  },
  computed: {
    ...mapGetters({
      projects: 'projects/filtered'
    })
  },
  mounted() {
    this.fetch()
  },
  methods: {
    ...mapActions({
      fetch: 'projects/get'
    })
  }
}
</script>

<style></style>
