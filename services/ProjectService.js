import axios from 'axios'

const apiClient = axios.create({
  baseURL: `http://localhost:3000`,
  withCredentials: false, // This is the default
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  timeout: 10000
})

export default {
  getProjects(perPage, page) {
    return apiClient.get('/projects?_limit=' + perPage + '&_page=' + page)
  },
  getProject(id) {
    return apiClient.get('/projects/' + id)
  },
  postProject(project) {
    return apiClient.post('/projects', project)
  },
  deleteProject(projectID) {
    return apiClient.delete('/projects/' + projectID)
  }
}
