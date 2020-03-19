import ProjectService from './../services/ProjectService'
import { steps } from '~/config/steps.config'
const defaultProjectState = {
  id: null,
  name: '',
  desktop: {
    rows: []
  },
  mobile: {
    rows: []
  }
}

export const state = () => ({
  project: defaultProjectState,
  step: steps.desktop
})

export const actions = {
  async fetchProject({ commit, state }, id) {
    let res

    // return if project is already in the store
    if (state.project.id && state.project.id === id) return Promise.resolve()

    // clean up the state
    commit('addFetchedProject', defaultProjectState)

    // fetch the project
    try {
      res = await ProjectService.getProject(id)
    } catch (e) {}

    if (res) {
      commit('addFetchedProject', res.data)
    }
  },
  async save() {
    try {
      await ProjectService.saveProject(this.state.project.project)
    } catch (e) {}
  }
}

export const mutations = {
  addFetchedProject(state, project) {
    state.project = project
  },
  addSection(state, section) {
    const zones = section.zones.map((zone, index) => ({
      id: `zone-${index}-${Date.now()}`,
      componentId: null,
      ...zone
    }))
    const row = {
      ...section,
      id: `row-${Date.now()}`,
      zones
    }

    state.project[state.step].rows = [...state.project[state.step].rows, row]
  },
  attachComponent(state, payload) {
    const rows = state.project[state.step].rows.map((section) => {
      return {
        zones: section.zones.forEach((zone) => {
          zone.componentId =
            payload.id === zone.id ? payload.componentId : zone.componentId
        }),
        ...section
      }
    })

    state.project[state.step].rows = rows
  },
  detachComponent(state, payload) {
    const rows = state.project[state.step].rows.map((section) => {
      return {
        zones: section.zones.forEach((zone) => {
          zone.componentId =
            payload.componentId === zone.componentId ? null : zone.componentId
        }),
        ...section
      }
    })

    state.project[state.step].rows = rows
  },
  changeSectionsOrder(state, sections) {
    state.project[state.step].rows = sections
  },
  changeZonesOrder(state, dragData) {
    const { selectedSection, fromZone, toZoneID, componentIdToMove } = dragData
    const newZonesSet = selectedSection.zones.map((zone) => {
      if (zone.id === toZoneID) {
        fromZone.componentId = zone.componentId
        zone.componentId = componentIdToMove
      }
      return zone
    })

    selectedSection.zones = newZonesSet
  },
  setStep(state, step) {
    state.step = step
  },
  updateProjectName(state, newName) {
    state.project.name = newName
  }
}

export const getters = {
  sections(state) {
    return state.project[state.step].rows
  },
  getProjectName(state) {
    return state.project.name
  }
}
