import { componentConfig } from '~/config/component.config'

export const componentMixin = {
  methods: {
    getComponentColor(category, type) {
      return (
        (category && type && componentConfig[category][type].color) || '#263238'
      )
    }
  }
}
