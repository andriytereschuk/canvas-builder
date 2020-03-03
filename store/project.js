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
  }
}

export const getters = {
  data(state) {
    const { project } = state

    return project
  }
}
