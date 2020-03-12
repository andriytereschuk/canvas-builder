export const state = () => ({
  project: {
    id: null,
    desktop: {
      rows: []
    },
    mobile: {
      rows: []
    },
    currentStep: 'desktop'
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
        desktop: {
          rows: []
        },
        mobile: {
          rows: []
        },
        currentStep: 'desktop'
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
    const desktop = {
      ...state.project.desktop,
      rows: [...state.project.desktop.rows, row]
    }
    const mobile = {
      ...state.project.mobile,
      rows: [...state.project.mobile.rows, row]
    }

    state.project.currentStep === 'desktop'
      ? (state.project = { ...state.project, desktop })
      : (state.project = { ...state.project, mobile })
  },
  attachComponent(state, payload) {
    const rows = state.project[state.project.currentStep].rows.map(
      (section) => {
        return {
          zones: section.zones.forEach((zone) => {
            zone.componentId =
              payload.id === zone.id ? payload.componentId : zone.componentId
          }),
          ...section
        }
      }
    )

    state.project = {
      rows,
      ...state.project
    }
  },
  detachComponent(state, payload) {
    const rows = state.project[state.project.currentStep].rows.map(
      (section) => {
        return {
          zones: section.zones.forEach((zone) => {
            zone.componentId =
              payload.componentId === zone.componentId ? null : zone.componentId
          }),
          ...section
        }
      }
    )

    state.project = {
      rows,
      ...state.project
    }
  },
  changeSectionsOrder(state, sections) {
    state.project[state.project.currentStep].rows = sections
  },
  changeZonesOrder(state, zonesToChange) {
    const { sectionID, newZonesSet } = zonesToChange

    state.project[state.project.currentStep].rows.map((el) => {
      if (el.id === sectionID) {
        el.zones = newZonesSet
      }
    })
  },
  setCurrentStep(state, newStep) {
    state.project.currentStep = newStep
  }
}

export const getters = {
  sections(state) {
    return state.project.currentStep === 'desktop'
      ? state.project.desktop.rows
      : state.project.mobile.rows
  }
}
