import { groupRepeatedUnits, createRepetition } from '../utils/helpers'

export const state = () => ({
  columns: 4,
  rows: 2,
  colArr: [],
  rowArr: [],
  childarea: [],
  previewarea: null
})

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
  },
  rowNumber(state) {
    return state.rows
  },
  columnNumber(state) {
    return state.columns
  },
  customPreset(state) {
    return state.childarea
  }
}

export const mutations = {
  initialArrIndex(state) {
    createArr(state.columns, state.colArr)
    createArr(state.rows, state.rowArr)
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
  addChildren(state, payload) {
    state.childarea.push(payload)
  },
  removeChildren(state, payload) {
    state.childarea.splice(payload, 1)
  },
  updateColumns(state, payload) {
    state.columns = payload
  },
  updateRows(state, payload) {
    state.rows = payload
  },
  updateChildPreview(state, payload) {
    state.previewarea = payload
  },
  resetGrid(state, payload) {
    state.childarea = []
    state.rows = 2
    state.columns = 4
  }
}

// we start off with just a few rows and columns filled with 1fr units

const createArr = (direction, arr) => {
  for (let i = 1; i <= direction; i++) {
    arr.push({ unit: '1fr' })
  }
}
