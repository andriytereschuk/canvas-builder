import ProjectService from './../services/ProjectService'

export const state = () => ({
  projects: [],
  perPage: 100,
  page: 1
})

export const actions = {
  async getAllProjects({ commit, perPage, page }) {
    let projects

    try {
      projects = await ProjectService.getProjects(perPage, page)
    } catch (e) {}

    if (projects) commit('addAllProjects', projects.data)
  },
  async addProject(state, project) {
    try {
      await ProjectService.postProject(project)
    } catch (e) {}

    state.commit('addProject', project)
  },
  async deleteProject(state, projectID) {
    try {
      await ProjectService.deleteProject(projectID)
    } catch (e) {}

    state.commit('removeProject', projectID)
  }
}

export const mutations = {
  addAllProjects(state, projects) {
    state.projects = projects
  },
  addProject(state, project) {
    state.projects = [...state.projects, project]
  },
  removeProject(state, projectID) {
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
