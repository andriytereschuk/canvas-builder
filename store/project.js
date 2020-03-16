import { steps } from '~/config/steps.config'

export const state = () => ({
  project: {
    id: null,
    desktop: {
      rows: []
    },
    mobile: {
      rows: []
    }
  },
  step: steps.desktop
})

export const actions = {
  async get({ commit }, { id }) {
    let project

    try {
      project = await this.$axios.$get(`/api/projects/${id}`)
    } catch (e) {}

    if (project) {
      commit('add', {
        id: `p-${Date.now()}`,
        desktop: {
          rows: []
        },
        mobile: {
          rows: []
        }
      })
    }
  }
}

export const mutations = {
  add(state, project) {
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
  changeZonesOrder(state, zonesToChange) {
    const { sectionID, newZonesSet } = zonesToChange
    console.log('store/sectionID', sectionID)
    console.log('store/newZonesSet', newZonesSet)

    state.project[state.step].rows.map((el) => {
      if (el.id === sectionID) {
        el.zones = newZonesSet
      }
    })
  },
  setStep(state, step) {
    state.step = step
  }
}

export const getters = {
  sections(state) {
    return state.project[state.step].rows
  }
}
