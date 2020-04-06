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
  async attach({ commit }, { id, index, component }) {
    await ComponentService.postComponent(component)
    commit('addComponent', component)

    return id
      ? commit(
          'project/attachComponent',
          { id, componentId: component.id },
          { root: true }
        )
      : commit('attachComponentToComponent', {
          index,
          componentId: component.id,
          parentId: component.parentId
        })
  },
  async detach({ commit }, { id, index, component }) {
    if (id) {
      commit(
        'project/detachComponent',
        { id, componentId: component.id },
        { root: true }
      )
    } else {
      commit('detachComponentFromComponent', {
        index,
        componentId: component.id,
        parentId: component.parentId
      })
    }

    commit('remove', component.id)
    component = await ComponentService.deleteComponent(component.id)
  },
  async saveComponent({ commit }, component) {
    component = await ComponentService.saveComponent(component)
    commit('saveComponentToStore', component)
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
  },
  saveModel(state, { component, model }) {
    Object.assign(component.model, model)
  },
  addSubComponent(state, component) {
    component.model.items.push({ componentId: null })
  },
  attachComponentToComponent(state, { index, componentId, parentId }) {
    const parentComponent = state.components.find(
      (component) => component.id === parentId
    )

    parentComponent.model.items[index].componentId = componentId
  },
  detachComponentFromComponent(state, { index, componentId, parentId }) {
    const parentComponent = state.components.find(
      (component) => component.id === parentId
    )

    parentComponent.model.items[index].componentId = null
  }
}

export const getters = {
  getComponentById: (state) => (id) => {
    return state.components.find((component) => component.id === id)
  },
  components: (state) => {
    return state.components
  }
}
