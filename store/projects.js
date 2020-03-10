export const state = () => ({
  projects: []
})

export const actions = {
  async get({ commit }) {
    let projects

    try {
      projects = await this.$axios.$get('/api/projects')
    } catch (e) {}

    if (projects) commit('add', projects)
  }
}

export const mutations = {
  add(state, projects) {
    state.projects = projects
  },
  remove(state, projectID) {
    state.projects = [...state.projects].filter(
      (project) => project.id !== projectID
    )
  }
}

export const getters = {
  filtered(state) {
    const { projects } = state
    return [...projects].sort((prev, next) => {
      return new Date(prev.date) - new Date(next.date)
    })
  }
}
