export const state = () => ({
  components: {}
})

export const actions = {
  async get({ commit }) {
    let component

    try {
      component = await this.$axios.$get('/api/component')
    } catch (e) {}

    if (component) commit('set', component)
  }
}

export const mutations = {
  set(state, component) {
    const { id } = component

    state.components[id] = component
  }
}

export const getters = {
  components(state) {
    const { components } = state

    return components
  }
}
