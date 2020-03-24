import ComponentService from '~/services/ComponentService'

export const state = () => ({
  components: [],
  componentsPerPage: 100,
  componentsPage: 1
})

export const actions = {
  async fetchComponent({ commit }, id) {
    const component = await ComponentService.getComponent(id)
    if (component) {
      commit('addComponent', component.data)
      return component.data
    }
  },
  async fetchComponents({ state, commit }) {
    const components = await ComponentService.getComponents(
      state.componentsPerPage,
      state.componentsPage
    )
    if (components) {
      commit('addComponents', components.data)
      return components.data
    }
  },
  async attach({ commit }, { id, component }) {
    commit('addComponent', component)
    commit(
      'project/attachComponent',
      { id, componentId: component.id },
      { root: true }
    )
    component = await ComponentService.postComponent(component)
  },
  async detach({ commit }, { id, component }) {
    commit(
      'project/detachComponent',
      { id, componentId: component.id },
      { root: true }
    )
    commit('remove', component.id)
    component = await ComponentService.deleteComponent(component.id)
  },
  async saveComponent({ commit }, component) {
    commit('saveComponentToStore', component)
    component = await ComponentService.saveComponent(component)
  },
  getComponentById({ state, dispatch }, id) {
    if (!state.components.length) {
      return dispatch('fetchComponent', id).then((res) => {
        return res
      })
    } else {
      return state.components.find((component) => component.id === id)
    }
  }
}

export const mutations = {
  addComponent(state, component) {
    state.components.push(component)
  },
  addComponents(state, components) {
    state.components = components
  },
  remove(state, _id) {
    state.components = state.components.filter(({ id }) => id !== _id)
  },
  saveComponentToStore(state, componentToSave) {
    state.components = state.components.map((component) => {
      return component.id === componentToSave.id ? componentToSave : component
    })
  }
}

export const getters = {
  storeComponent: (state) => (id) => {
    return state.components.find((component) => component.id === id)
  },
  components: (state) => {
    return state.components
  }
}
