<template>
  <div>
    <v-toolbar dense color="grey darken-1">
      <input
        v-if="edit"
        v-focus=""
        type="text"
        :value="name"
        class="project-name"
        style="font-size: 1.25rem"
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
          <v-btn fab small text @click="saveProject" v-on="on">
            <v-icon>mdi-content-save</v-icon>
          </v-btn>
        </template>
        <span>Save</span>
      </v-tooltip>

      <v-tooltip top>
        <template v-slot:activator="{ on }">
          <v-btn fab small text v-on="on">
            <v-icon>mdi-eye</v-icon>
          </v-btn>
        </template>
        <span>Preview</span>
      </v-tooltip>
    </v-toolbar>

    <v-container>
      <Stepper>
        <ComponentsMenu ref="componentsMenu" />
        <Workspace @addPreset="addPreset" />
        <PresetList ref="presets" @openCustomPreset="openCustomPreset" />
      </Stepper>
    </v-container>

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
      name: 'projectName'
    })
  },
  created() {
    this.getProject(+this.$route.params.id)
  },
  provide() {
    return {
      openComponentMenu: () => this.$refs.componentsMenu.open()
    }
  },
  methods: {
    ...mapActions('project', ['getProject', 'saveProject']),
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
