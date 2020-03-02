export const state = () => ({
  project: {}
})

export const actions = {
  async get({ commit }, { id }) {
    let project

    try {
      project = await this.$axios.$get('/api/project', { id })
    } catch (e) {}

    if (project) {
      commit('add', project)
    }
  }
}

export const mutations = {
  add(state, project) {
    state.project = project
  }
}
