import EventService from './../services/ProjectService'

export const state = () => ({
  projects: [],
  perPage: 100,
  page: 1
})

export const actions = {
  async get({ commit, perPage, page }) {
    let projects

    try {
      projects = await EventService.getProjects(perPage, page)
    } catch (e) {}

    if (projects) commit('add', projects.data)
  },
  async addProject(state, project) {
    try {
      await EventService.postProject(project)
    } catch (e) {}

    state.commit('addProject', project)
  },
  async deleteProject(state, projectID) {
    try {
      await EventService.deleteProject(projectID)
    } catch (e) {}

    state.commit('remove', projectID)
  }
}

export const mutations = {
  add(state, projects) {
    state.projects = projects
  },
  addProject(state, project) {
    console.log('state.projects', state.projects)
    state.projects = [...state.projects, project]
    console.log('state.projects', state.projects)
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
