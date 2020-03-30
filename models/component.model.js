import { uuid } from '~/utils/helpers'

export default class ComponentModel {
  constructor(type, category, model, parentId) {
    this.id = uuid()
    this.type = type
    this.category = category
    this.model = model
    this.parentId = parentId
  }
}
