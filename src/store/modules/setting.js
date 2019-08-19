const state = {
  login: {
    isVisible: true,
    token: '',
    username: ''
  },
  settings: {
    appName: '后台管理',
    baseURL: 'http://localhost:8011/'
  }
}

const mutations = {
  SET_TOKEN(state, token) {
    state.login.token = token
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
  }
}

export default {
  state,
  mutations,
  actions
}
