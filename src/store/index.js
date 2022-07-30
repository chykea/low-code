import { createStore } from 'vuex'

export default createStore({
  state(){
    return{
      num:0
    }
  },
  getters: {
  },
  mutations: {
    increment(state){
      state.num++;
    }
  },
  actions: {
    increment(){

    }
  },
  modules: {
  }
})
