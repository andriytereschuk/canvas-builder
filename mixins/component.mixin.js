import { componentEnum } from '~/config/component.config'

export const componentMixin = {
  methods: {
    getComponentColor(type) {
      return (type && componentEnum[type].color) || '#263238'
    }
  }
}
