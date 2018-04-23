import Vue from 'vue/dist/vue'
import VueRouter from 'vue-router'

import Home from './containers/home.vue'

const routes = [
  { path: '/', component: Home }
]

export default () => {
  return new VueRouter({
    routes
  })
}
