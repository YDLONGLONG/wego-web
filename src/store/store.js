import Vue from 'vue'
import Vuex from 'vuex'
import createVuexAlong from 'vuex-along'
Vue.use(Vuex)
export default new Vuex.Store({
  //用户信息
  state: {
    //用户id
    userId: '',
    userName:''
  },
  mutations: {
    setUserId(state, userId) {
      state.userId = userId
    },
    setUserName(state, userName) {
      state.userName = userName
    }
  },
  actions: {
    setUserId(context, userId) {
      context.commit('setUserId', userId)
    },
    setUserName(context, userName) {
      context.commit('setUserName', userName)
    }
  },
  //解决刷新后vuex数据重置问题
  plugins: [createVuexAlong()]
})
