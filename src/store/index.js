import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: null,
    isLogin: false
  },
  mutations: {
    login( state, data ) {
      state.isLogin = true;
      state.userInfo = data
    },
    logout( state ) {
      state.isLogin = false;
      state.userInfo = null;
    }
  },
  actions: {

  }
})
