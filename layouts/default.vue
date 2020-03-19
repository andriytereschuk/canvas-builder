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
import { createNamespacedHelpers } from 'vuex'
const { mapMutations, mapActions } = createNamespacedHelpers('project')

export default {
  middleware: 'redirect',
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Projects',
          to: '/projects'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false
      // breadcrumbs: [
      //   {
      //     text: 'Canvas Builder',
      //     disabled: false,
      //     href: '/'
      //   },
      //   {
      //     text: 'Projects',
      //     disabled: false,
      //     href: '/projects'
      //   },
      //   {
      //     text: 'projectID',
      //     disabled: true,
      //     href: ''
      //   }
      // ]
    }
  },
  methods: {
    ...mapActions(['save']),
    getLink(item) {
      return item.text !== 'projectID' ? item.href : null
    },
    ...mapMutations({
      updateProjectName: 'updateProjectName'
    })
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
