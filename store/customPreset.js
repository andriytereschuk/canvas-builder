import {
  groupRepeatedUnits,
  createRepetition,
  createInitialArr
} from '../utils/helpers'

const initialState = {
  columns: 4,
  rows: 2,
  colArr: [],
  rowArr: [],
  zones: [],
  previewZone: null
}

export const state = () => initialState

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
  reset(state) {
    state = initialState
  },
  resetGrid(state) {
    state.zones = []
    state.rows = 2
    state.columns = 4
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
