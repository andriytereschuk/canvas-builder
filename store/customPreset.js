import {
  groupRepeatedUnits,
  createRepetition,
  createInitialArr
} from '../utils/helpers'

export const state = () => ({
  columns: 4,
  rows: 2,
  colArr: [],
  rowArr: [],
  zones: [],
  previewZone: null
})

export const mutations = {
  initialArrIndex(state) {
    createInitialArr(state.columns, state.colArr)
    createInitialArr(state.rows, state.rowArr)
  },
  adjustArr(state, payload) {
    const newVal = Number(payload.newVal)
    const oldVal = Number(payload.oldVal)

    if (newVal < oldVal) {
      // you'd think that .length would be quicker here, but it doesn't trigger the getter/computed in colTemplate etc.
      const difference = oldVal - newVal
      for (let i = 1; i <= difference; i++) {
        state[payload.direction].pop()
      }
    } else {
      const difference = newVal - oldVal
      for (let i = 1; i <= difference; i++) {
        state[payload.direction].push({ unit: '1fr' })
      }
    }
  },
  addZoneItem(state, payload) {
    state.zones.push(payload)
  },
  removeZoneItem(state, payload) {
    state.zones.splice(payload, 1)
  },
  updateColumns(state, payload) {
    state.columns = payload
  },
  updateRows(state, payload) {
    state.rows = payload
  },
  updateZonePreview(state, payload) {
    state.previewZone = payload
  },
  resetGrid(state, payload) {
    state.zones = []
    state.rows = 2
    state.columns = 4
  },
  resetState(state) {
    state.rows = 2
    state.columns = 4
    state.colArr = []
    state.rowArr = []
    state.zones = []
  }
}

export const getters = {
  colTemplate(state) {
    const unitGroups = groupRepeatedUnits(state.colArr)
    return createRepetition(unitGroups)
  },
  rowTemplate(state) {
    const unitGroups = groupRepeatedUnits(state.rowArr)
    return createRepetition(unitGroups)
  },
  divNum(state) {
    return state.columns * state.rows
  }
}
