<template>
  <v-app dark>
    <v-app-bar :clipped-left="clipped" fixed app>
      <nuxt-link to="/">
        <img class="logo" src="../assets/logo.png" alt="site-logo" />
      </nuxt-link>
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
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
