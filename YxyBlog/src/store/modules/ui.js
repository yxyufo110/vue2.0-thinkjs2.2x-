const state = {
  menuIndex: 0
}

const getters = {
  menuIndex: state => state.menuIndex
}

const actions = {
  setMenuIndex ({commit, state}, index) {
    commit('SET_MENU_INDEX', index)
  }
}

const mutations = {
  SET_MENU_INDEX (state, index) {
    state.menuIndex = index
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
