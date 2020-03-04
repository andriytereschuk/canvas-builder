export const state = () => ({
  project: {
    id: null,
    rows: []
  }
})

export const actions = {
  async get({ commit }, { id }) {
    const rows = [
      {
        id: 1,
        columns: 4,
        rows: 2,
        zones: [
          {
            id: 12,
            componentId: null,
            coords: {
              start: {
                x: 1,
                y: 1
              },
              end: {
                x: 2,
                y: 2
              }
            }
          },
          {
            id: 13,
            componentId: null,
            coords: {
              start: {
                x: 1,
                y: 2
              },
              end: {
                x: 2,
                y: 3
              }
            }
          },
          {
            id: 14,
            componentId: null,
            coords: {
              start: {
                x: 2,
                y: 1
              },
              end: {
                x: 3,
                y: 3
              }
            }
          },
          {
            id: 15,
            componentId: null,
            coords: {
              start: {
                x: 1,
                y: 3
              },
              end: {
                x: 3,
                y: 5
              }
            }
          }
        ]
      }
    ]
    let project

    try {
      project = await this.$axios.$get(`/api/projects/${id}`)
    } catch (e) {}

    if (project) {
      commit('add', {
        id: project.id,
        rows
      })
    }
  }
}

export const mutations = {
  add(state, project) {
    state.project = project
  },
  attachComponent(state, payload) {
    const rows = state.project.rows.map((section) => {
      return {
        ...section.zones.forEach((zone) => {
          zone.componentId =
            payload.id === zone.id ? payload.componentId : zone.componentId
        }),
        section
      }
    })

    state.project = {
      rows,
      ...state.project
    }
  }
}

export const getters = {
  data(state) {
    const { project } = state

    return project
  }
}
