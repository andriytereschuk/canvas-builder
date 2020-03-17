export const state = () => ({
  components: []
})

export const actions = {
  async fetchComponent({ commit }, id) {
    let component

    try {
      component = await this.$axios.$get(`/api/component/${id}`)
    } catch (e) {}

    if (component) commit('add', component)
  },
  attach({ commit }, { id, component }) {
    commit('add', component)
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
  add(state, component) {
    state.components.push(component)
  },
  remove(state, _id) {
    state.components = state.components.filter(({ id }) => id !== _id)
  }
}

export const getters = {
  getComponentById: (state) => (id) =>
    state.components.find((component) => component.id === id)
}
