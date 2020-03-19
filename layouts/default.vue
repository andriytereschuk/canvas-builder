<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <!-- <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="clipped = !clipped"
      >
        <v-icon>mdi-application</v-icon>
      </v-btn> -->
      <!-- <v-btn
        icon
        @click.stop="fixed = !fixed"
      >
        <v-icon>mdi-minus</v-icon>
      </v-btn> -->
      <v-breadcrumbs :items="breadcrumbs">
        <v-breadcrumbs-item
          slot="item"
          slot-scope="{ item }"
          :href="getLink(item)"
        >
          <input
            v-if="edit && item.text === 'projectID'"
            v-focus=""
            type="text"
            :value="name"
            @blur="
              updateProjectName($event.target.value)
              edit = false
            "
            @keyup.enter="
              updateProjectName($event.target.value)
              edit = false
            "
          />
          <p
            v-else=""
            class="breadcrumbs-item"
            data-hint="rename"
            :class="item.text === 'projectID' ? 'tooltip tooltip--top' : false"
            @click="name ? (edit = true) : false"
          >
            {{ item.text === 'projectID' ? name : item.text }}
          </p>
        </v-breadcrumbs-item>
      </v-breadcrumbs>
      <v-spacer />
      <v-btn text style="width: 100px; margin-right: 0;" @click="saveProject">
        <v-icon>mdi-save</v-icon>
        save
      </v-btn>
      <v-btn text style="width: 100px; margin-right: 0;">
        <v-icon>mdi-play</v-icon>
        preview
      </v-btn>

      <!-- <v-btn
        icon
        @click.stop="rightDrawer = !rightDrawer"
      >
        <v-icon>mdi-menu</v-icon>
      </v-btn> -->
    </v-app-bar>

    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>

    <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light>
              mdi-repeat
            </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-footer :fixed="fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  directives: {
    focus: {
      inserted(el) {
        el.focus()
      }
    }
  },
  middleware: 'redirect',
  data() {
    return {
      edit: false,
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
      rightDrawer: false,
      breadcrumbs: [
        {
          text: 'Canvas Builder',
          disabled: false,
          href: '/'
        },
        {
          text: 'Projects',
          disabled: false,
          href: '/projects'
        },
        {
          text: 'projectID',
          disabled: true,
          href: ''
        }
      ]
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
.breadcrumbs-item {
  margin-bottom: 0;
}
.tooltip {
  position: relative;
  display: inline-block;
}
.tooltip:before,
.tooltip:after {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}
.tooltip:hover:before,
.tooltip:hover:after {
  opacity: 1;
}
.tooltip:before {
  content: '';
  position: absolute;
  background: #bdbdbd;
  width: 6px;
  height: 6px;
  transform: translateX(-50%) translateY(-45%) rotate(225deg);
  z-index: 2;
}
.tooltip:after {
  content: attr(data-hint);
  z-index: 1;
  padding: 5px 6px;
  background: #bdbdbd;
  color: black;
  text-transform: capitalize;
  font-size: 12px;
  white-space: nowrap;
  transform: translateX(-50%);
  border-radius: 5px;
}
.tooltip--top:before,
.tooltip--top:after {
  top: 130%;
  left: 50%;
}
.tooltip--top:hover:before {
  width: 12px;
  height: 12px;
  border: 1px solid #f0f0f0;
  border-width: 0 1px 1px 0;
  border-top-left-radius: 100%;
}
.tooltip--top:hover:after {
  border-width: 5px;
  border-top-color: rgb(29, 104, 189);
  border: 1px solid #f0f0f0;
}
</style>
