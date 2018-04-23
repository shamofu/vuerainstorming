import Vue from 'vue/dist/vue.min'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

Vue.use(Vuex)
Vue.use(VueRouter)

import store from './store/store'
import createRouter from './router'
import titleMixin from './utils/title'

Vue.mixin(titleMixin)

new Vue({
  store,
  router: createRouter(),
  template: '<router-view />'
}).$mount('#parcel-root')
