import Vue from 'vue'
import Vuex from 'vuex'
import posts from './modules/post'
import albums from './modules/albums'
import users from './modules/users'
import * as actions from './actions'
import * as getters from './getters'
import { state } from './state'
import { mutations } from './mutations'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  actions,
  getters,
  mutations,
  modules: {
    posts,
    albums,
    users
  }
})
