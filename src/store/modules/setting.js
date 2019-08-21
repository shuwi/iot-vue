const state = {
  login: {
    isVisible: true,
    token: '',
    username: ''
  },
  machineModal: {
    isVisible: false,
    formInline: null
  },
  settings: {
    appName: '后台管理',
    baseURL: 'http://localhost:8888/'
  }
}

const mutations = {
  SET_TOKEN(state, token) {
    state.login.token = token
  },
  SET_USERNAME(state, username) {
    state.login.username = username
  },
  SHOW_MACHINEINFO(state, val) {
    state.machineModal.isVisible = true
    if (typeof val.number !== 'undefined')
      state.machineModal.formInline = val
    else
      state.machineModal.formInline = null
  },
  HIDE_MACHINEINFO(state) {
    state.machineModal.isVisible = false
    state.machineModal.formInline = null
  }
}

const actions = {
  resetToken({
    commit
  }) {
    commit('SET_TOKEN', '')
  },
  setToken({
    commit
  }, val) {
    commit('SET_TOKEN', val)
  },
  resetUserName({
    commit
  }) {
    commit('SET_USERNAME', '')
  },
  setUserName({
    commit
  }, val) {
    commit('SET_USERNAME', val)
  },
  showMachineModal({
    commit
  }, val) {
    commit('SHOW_MACHINEINFO', val)
  },
  hideMachineModal({
    commit
  }) {
    commit('HIDE_MACHINEINFO')
  }
}

export default {
  state,
  mutations,
  actions
}
