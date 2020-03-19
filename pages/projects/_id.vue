<template>
  <div>
    <template>
      <v-card color="grey lighten-4">
        <v-toolbar dense>
          <input
            v-if="edit"
            v-focus=""
            type="text"
            :value="name"
            class="project-name"
            @blur="
              setProjectName($event.target.value)
              edit = false
            "
            @keyup.enter="
              setProjectName($event.target.value)
              edit = false
            "
          />
          <v-tooltip v-else top>
            <template v-slot:activator="{ on }">
              <v-toolbar-title @click="edit = true" v-on="on">
                {{ name }}
              </v-toolbar-title>
            </template>
            <span>Rename</span>
          </v-tooltip>

          <v-spacer></v-spacer>

          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn icon @click="save" v-on="on">
                <v-icon>fas fa-save</v-icon>
              </v-btn>
            </template>
            <span>Save</span>
          </v-tooltip>

          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn icon v-on="on">
                <v-icon>far fa-eye</v-icon>
              </v-btn>
            </template>
            <span>Preview</span>
          </v-tooltip>
        </v-toolbar>
      </v-card>
    </template>
    <Stepper style="marginBottom: 20 + 'px'">
      <ComponentsMenu ref="componentsMenu" />
      <Workspace @addPreset="addPreset" />
      <PresetList ref="presets" @openCustomPreset="openCustomPreset" />
    </Stepper>
    <CustomPreset ref="customPreset" @closeCustomPreset="closeCustomPreset" />
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import CustomPreset from '~/components/CustomPreset'
import Stepper from '~/components/Stepper'
import ComponentsMenu from '~/components/ComponentsMenu'
import Workspace from '~/components/Workspace'
import PresetList from '~/components/PresetList'

export default {
  components: {
    Stepper,
    ComponentsMenu,
    Workspace,
    PresetList,
    CustomPreset
  },
  directives: {
    focus: {
      inserted(el) {
        el.focus()
      }
    }
  },
  data() {
    return {
      edit: false
    }
  },
  computed: {
    ...mapGetters('project', {
      name: 'getProjectName'
    })
  },
  created() {
    this.fetchProject(+this.$route.params.id)
  },
  provide() {
    return {
      openComponentMenu: () => this.$refs.componentsMenu.open()
    }
  },
  methods: {
    ...mapActions('project', ['fetchProject', 'save']),
    ...mapMutations('project', ['updateProjectName']),
    addPreset() {
      return this.$refs.presets.open()
    },
    openCustomPreset() {
      this.$refs.customPreset.open()
      this.$refs.presets.close()
    },
    closeCustomPreset() {
      this.$refs.customPreset.close()
    },
    setProjectName(name) {
      if (name) {
        this.updateProjectName(name)
      }
    }
  }
}
</script>
