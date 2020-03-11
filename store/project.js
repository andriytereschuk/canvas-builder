export const state = () => ({
  project: {
    id: null,
    desktop: [],
    tablet: [],
    mobile: [],
    currentStep: 'desktop',
    rows: []
  }
})

export const actions = {
  async get({ commit }, { id }) {
    // const rows = [
    //   {
    //     id: 1,
    //     columns: 4,
    //     rows: 2,
    //     zones: [
    //       {
    //         id: 12,
    //         componentId: null,
    //         coords: {
    //           start: {
    //             x: 1,
    //             y: 1
    //           },
    //           end: {
    //             x: 2,
    //             y: 2
    //           }
    //         }
    //       },
    //       {
    //         id: 13,
    //         componentId: null,
    //         coords: {
    //           start: {
    //             x: 1,
    //             y: 2
    //           },
    //           end: {
    //             x: 2,
    //             y: 3
    //           }
    //         }
    //       },
    //       {
    //         id: 14,
    //         componentId: null,
    //         coords: {
    //           start: {
    //             x: 2,
    //             y: 1
    //           },
    //           end: {
    //             x: 3,
    //             y: 3
    //           }
    //         }
    //       },
    //       {
    //         id: 15,
    //         componentId: null,
    //         coords: {
    //           start: {
    //             x: 1,
    //             y: 3
    //           },
    //           end: {
    //             x: 3,
    //             y: 5
    //           }
    //         }
    //       }
    //     ]
    //   }
    // ]
    let project

    try {
      project = await this.$axios.$get(`/api/projects/${id}`)
    } catch (e) {}

    if (project) {
      commit('add', {
        id: project.id,
        rows: []
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
    const rows = [...state.project.rows, row]
    state.project = { ...state.project, rows }
  },
  attachComponent(state, payload) {
    const rows = state.project.rows.map((section) => {
      return {
        zones: section.zones.forEach((zone) => {
          zone.componentId =
            payload.id === zone.id ? payload.componentId : zone.componentId
        }),
        ...section
      }
    })

    state.project = {
      rows,
      ...state.project
    }
  },
  detachComponent(state, payload) {
    const rows = state.project.rows.map((section) => {
      return {
        zones: section.zones.forEach((zone) => {
          zone.componentId =
            payload.componentId === zone.componentId ? null : zone.componentId
        }),
        ...section
      }
    })

    state.project = {
      rows,
      ...state.project
    }
  },
  changeSectionsOrder(state, sections) {
    state.project.rows = sections
  },
  setCurrentStep(state, newStep) {
    state.project.currentStep = newStep
    console.log('state/project', state.project.currentStep)
  }
}

export const getters = {
  sections(state) {
    console.log('state/project/get', state.project.currentStep)
    switch (state.project.currentStep) {
      case 'desktop':
        return state.project.desktop
      case 'tablet':
        return state.project.tablet
      case 'mobile':
        return state.project.mobile
      default:
        return state.project.desktop
    }
  }
}
