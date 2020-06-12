import Vue from 'vue'
import Router from 'vue-router'
import Encounters from './views/Encounters.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'encounters',
      component: Encounters
    }
  ]
})
