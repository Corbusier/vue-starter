// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'
import MuseUI from 'muse-ui'
import store from './store'
import router from './router'
import VueLazyload from 'vue-lazyload'

//全局组件加载动画
import ClipLoader from 'vue-spinner/src/ClipLoader'
import 'muse-ui/dist/muse-ui.css'
import 'muse-ui/dist/theme-light.css'
import './assets/css/reset.css'
import './assets/css/common.css'

Vue.component('clip-loader', ClipLoader)
Vue.config.productionTip = false
Vue.use(MuseUI)
Vue.use(VueLazyload, {
	loading: 'static/load.gif'
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
