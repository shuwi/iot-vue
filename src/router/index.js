import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Index from '@/components/index/index.vue'
import Apply from '@/components/apply/index.vue'
import Material from '@/components/material/index.vue'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/index',
      name: 'Index',
      component: Index
    },
    {
      path: '/apply',
      name: 'Apply',
      component: Apply
    },
    {
      path: '/material',
      name: 'Material',
      component: Material
    }
  ]
})
