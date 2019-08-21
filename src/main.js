// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import axios from 'axios'

Vue.config.productionTip = false

Vue.use(iView)

Vue.http = Vue.prototype.$http = axios

router.beforeEach((to, from, next) => {
  if (store.state.setting.login.token === '' || typeof (store.state.setting.login.token) === 'undefined') {
    console.log('to = ', to)
    console.log('from = ', from)
    console.log(store.state.setting.login.token)
    if (to.name !== 'Login')
      next({
        name: 'Login'
      })
    else
      next()
  } else
    next()

})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
