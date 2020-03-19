import ProjectService from './../services/ProjectService'
import { steps } from '~/config/steps.config'

const defaultProjectState = {
  id: null,
  name: '',
  desktop: {
    rows: []
  },
  mobile: {
    rows: []
  }
}

export const state = () => ({
  projects: [],
  project: defaultProjectState,
  step: steps.desktop,
  projectsPerPage: 100,
  projectsPage: 1,
  componentsPerPage: 100,
  componentsPage: 1
})

export const actions = {
  async getProject({ commit, state }, id) {
    let res

    // return if project is already in the store
    if (state.project.id && state.project.id === id) return Promise.resolve()

    // clean up the state
    commit('addFetchedProjectToStore', defaultProjectState)

    // fetch the project
    try {
      res = await ProjectService.getProject(id)
    } catch (e) {}

    if (res) {
      commit('addFetchedProjectToStore', res.data)
    }
  },
  async addProject(state, project) {
    try {
      await ProjectService.postProject(project)
    } catch (e) {}

    state.commit('addProjectToProjects', project)
  },
  async saveProject() {
    try {
      await ProjectService.saveProject(this.state.project.project)
    } catch (e) {}
  },
  async deleteProject(state, projectID) {
    try {
      await ProjectService.deleteProject(projectID)
    } catch (e) {}

    state.commit('deleteProjectFromStore', projectID)
  },
  async getProjects({ commit, projectsPerPage, page }) {
    let projects

    try {
      projects = await ProjectService.getProjects(projectsPerPage, page)
    } catch (e) {}

    if (projects) commit('addProjectsToStore', projects.data)
  }
}

export const mutations = {
  addProjectToProjects(state, project) {
    state.projects = [...state.projects, project]
  },
  addProjectsToStore(state, projects) {
    state.projects = projects
  },
  deleteProjectFromStore(state, projectID) {
    state.projects = [...state.projects].filter(
      (project) => project.id !== projectID
    )
  },
  addFetchedProjectToStore(state, project) {
    state.project = project
  },
  addSection(state, section) {
    const zones = section.zones.map((zone, index) => ({
      id: `zone-${index}-${Date.now()}`,
      componentId: null,
      ...zone
    }))
    const row = {
      ...section,
      id: `row-${Date.now()}`,
      zones
    }

    state.project[state.step].rows = [...state.project[state.step].rows, row]
  },
  attachComponent(state, payload) {
    const rows = state.project[state.step].rows.map((section) => {
      return {
        zones: section.zones.forEach((zone) => {
          zone.componentId =
            payload.id === zone.id ? payload.componentId : zone.componentId
        }),
        ...section
      }
    })

    state.project[state.step].rows = rows
  },
  detachComponent(state, payload) {
    const rows = state.project[state.step].rows.map((section) => {
      return {
        zones: section.zones.forEach((zone) => {
          zone.componentId =
            payload.componentId === zone.componentId ? null : zone.componentId
        }),
        ...section
      }
    })

    state.project[state.step].rows = rows
  },
  changeSectionsOrder(state, sections) {
    state.project[state.step].rows = sections
  },
  changeZonesOrder(state, dragData) {
    const { selectedSection, fromZone, toZoneID, componentIdToMove } = dragData
    if (componentIdToMove) {
      const newZonesSet = selectedSection.zones.map((zone) => {
        if (zone.id === toZoneID) {
          fromZone.componentId = zone.componentId
          zone.componentId = componentIdToMove
        }
        return zone
      })

      selectedSection.zones = newZonesSet
    }
  },
  setStep(state, step) {
    state.step = step
  },
  updateProjectName(state, newName) {
    state.project.name = newName
  }
}

export const getters = {
  sections(state) {
    return state.project[state.step].rows
  },
  projectName(state) {
    return state.project.name
  },
  filtered(state) {
    const { projects } = state
    return [...projects].sort((prev, next) => {
      return new Date(prev.date) - new Date(next.date)
    })
  }
}
