import { componentConfig } from '~/config/component.config'

export const componentMixin = {
  computed: {
    componentBgColor() {
      const backgroundColor = this.getComponentColor(this.component)

      return { backgroundColor }
    }
  },
  methods: {
    getComponentColor(component) {
      const defaultColor = '#263238'

      if (!component) return defaultColor

      const { category, type } = component

      return (
        (category && type && componentConfig[category][type].color) ||
        defaultColor
      )
    }
  }
}
