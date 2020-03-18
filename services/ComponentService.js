import axios from 'axios'

const apiClient = axios.create({
  baseURL: `http://localhost:3001`,
  withCredentials: false, // This is the default
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  timeout: 10000
})

export default {
  getComponents(perPage, page) {
    return apiClient.get('/projects?_limit=' + perPage + '&_page=' + page)
  },
  getComponent(id) {
    return apiClient.get('/components/' + id)
  },
  saveComponent(component) {
    return apiClient.put('/components/' + component.id, component)
  },
  postComponent(component) {
    return apiClient.post('/components/', component)
  },
  deleteComponent(componentId) {
    return apiClient.delete('/components/' + componentId)
  }
}
