const state = {
  login: {
    isVisible: true,
    token: window.sessionStorage.getItem("iot_token"),
    username: window.sessionStorage.getItem("iot_username")
  },
  materialModal: {
    isVisible: false,
    formInline: null
  },
  machineModal: {
    isVisible: false,
    formInline: null
  },
  applyModal: {
    isVisible: false,
    formInline: null
  },
  settings: {
    appName: '后台管理',
    baseURL: 'http://localhost:8888/',
    activeName: window.sessionStorage.getItem("activeName"),
    openNames: window.sessionStorage.getItem("openNames")
  }
}

const mutations = {
  SET_ACTIVENAME(state, an) {
    state.settings.activeName = an
    window.sessionStorage.setItem("activeName", an)
  },
  SET_OPENNAMES(state, an) {
    state.settings.openNames = an
    window.sessionStorage.setItem("openNames", an)
  },
  SET_TOKEN(state, token) {
    state.login.token = token
    window.sessionStorage.setItem("iot_token", token)
  },
  SET_USERNAME(state, username) {
    state.login.username = username
    window.sessionStorage.setItem("iot_username", username)
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
  },
  SHOW_MATERIALINFO(state, val) {
    state.materialModal.isVisible = true
    if (typeof val.id !== 'undefined')
      state.materialModal.formInline = val
    else
      state.materialModal.formInline = null
  },
  HIDE_MATERIALINFO(state) {
    state.materialModal.isVisible = false
    state.materialModal.formInline = null
  },
  SHOW_APPLYINFO(state, val) {
    state.applyModal.isVisible = true
    if (typeof val.id !== 'undefined')
      state.applyModal.formInline = val
    else
      state.applyModal.formInline = null
  },
  HIDE_APPLYINFO(state) {
    state.applyModal.isVisible = false
    state.applyModal.formInline = null
  }
}

const actions = {
  setActiveName({
    commit
  }, val) {
    commit('SET_ACTIVENAME', val)
  },
  setOpenNames({
    commit
  }, val) {
    commit('SET_OPENNAMES', val)
  },
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
  },
  showMaterialModal({
    commit
  }, val) {
    commit('SHOW_MATERIALINFO', val)
  },
  hideMaterialModal({
    commit
  }) {
    commit('HIDE_MATERIALINFO')
  },
  showApplyModal({
    commit
  }, val) {
    commit('SHOW_APPLYINFO', val)
  },
  hideApplyModal({
    commit
  }) {
    commit('HIDE_APPLYINFO')
  }
}

export default {
  state,
  mutations,
  actions
}
