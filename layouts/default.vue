<template>
  <v-app dark>
    <v-app-bar :clipped-left="clipped" fixed app>
      <nuxt-link class="logo d-flex align-center" to="/">
        <img src="../assets/logo.png" alt="logo" />
        <span>Canvas Builder</span>
      </nuxt-link>
    </v-app-bar>
    <v-content>
      <nuxt />
    </v-content>
    <v-footer :fixed="fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  middleware: 'redirect',
  data() {
    return {
      fixed: false,
      clipped: false
    }
  },
  computed: {
    ...mapGetters('project', {
      name: 'projectName'
    })
  },
  methods: {
    ...mapActions('project', ['saveProject']),
    getLink(item) {
      return item.text !== 'projectID' ? item.href : null
    },
    ...mapMutations('project', ['updateProjectName'])
  }
}
</script>

<style lang="scss" scoped>
.logo {
  display: block;
  width: 50px;
  height: 44px;
}
</style>
