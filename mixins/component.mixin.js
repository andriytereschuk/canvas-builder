import { componentTypes } from '~/config/componentTypes.config'

export const componentMixin = {
  methods: {
    getComponentColor(category, type) {
      return (
        (category && type && componentTypes[category][type].color) || '#263238'
      )
    }
  }
}
