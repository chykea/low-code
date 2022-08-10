import { createStore } from 'vuex'

export default createStore({
  state(){
    return{
      token:'',// 用于保存后端返回的token
    }
  },
  getters: {
  },
  mutations: {
    setToken(state,context){
      state.token = context.token;
    }
  },
  actions: {
    
  },
  modules: {
  }
})
