import { componentEnum } from '~/config/component.config'

export const componentMixin = {
  methods: {
    getComponentColor(type) {
      return componentEnum[type].color
    }
  }
}
