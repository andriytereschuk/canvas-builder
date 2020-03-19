export const state = () => ({
  components: [],
  editable: []
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
  },
  setEditableModel({ state, commit }, _component) {
    const isPresent = state.editable.find(
      (component) => component.id === _component.id
    )

    if (!isPresent) {
      commit('addToEditable', _component)
    }
  }
}

export const mutations = {
  add(state, component) {
    state.components.push(component)
  },
  remove(state, _id) {
    state.components = state.components.filter(({ id }) => id !== _id)
  },
  addToEditable(state, component) {
    state.editable.push(JSON.parse(JSON.stringify(component)))
  },
  addSubitemToEditable(state, subitems) {
    subitems.push({ componentId: null })
  },
  changeEditableModel(state, { id, model }) {
    state.editable = state.editable.map((component) =>
      component.id === id
        ? { model: JSON.parse(JSON.stringify(model)), ...component }
        : component
    )
  },
  attachToParentComponent(state) {}
}

export const getters = {
  getComponentById: (state) => (id) =>
    state.components.find((component) => component.id === id),
  getEditableModelById: (state) => (id) => {
    const comp = state.editable.find((component) => component.id === id)

    return comp && comp.model
  }
}
