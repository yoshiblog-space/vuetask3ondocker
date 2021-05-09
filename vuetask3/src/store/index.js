import Vue from "vue";
import Vuex from "vuex";
import 'es6-promise/auto'
Vue.use(Vuex)
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

export default new Vuex.Store({
  state: {
    todoList: []
  },
  mutations,
  actions,
  getters
})
