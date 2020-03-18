import ComponentService from './../services/ComponentService'

export const state = () => ({
  components: []
})

export const actions = {
  async fetchComponent({ commit }, id) {
    let component

    try {
      component = await ComponentService.getComponent(id)
    } catch (e) {}

    if (component) commit('addComponent', component.data)
  },
  async attach({ commit }, { id, component }) {
    commit('addComponent', component)
    commit(
      'project/attachComponent',
      { id, componentId: component.id },
      { root: true }
    )
    try {
      component = await ComponentService.postComponent(component)
    } catch (e) {}
  },
  async detach({ commit }, { id, component }) {
    commit(
      'project/detachComponent',
      { id, componentId: component.id },
      { root: true }
    )
    commit('remove', component.id)
    try {
      component = await ComponentService.deleteComponent(component.id)
    } catch (e) {}
  }
}

export const mutations = {
  addComponent(state, component) {
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
