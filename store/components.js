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
  },
  attach({ commit }, { id, component }) {
    commit('set', component)
    commit(
      'project/attachComponent',
      { id, componentId: component.id },
      { root: true }
    )
  },
  detach({ commit }, { id, component }) {
    commit(
      'project/detachComponent',
      { id, componentId: component.id },
      { root: true }
    )
    commit('remove', component.id)
  }
}

export const mutations = {
  set(state, component) {
    const { id } = component

    state.components[id] = component
  },
  remove(state, id) {
    delete state.components[id]
  }
}
