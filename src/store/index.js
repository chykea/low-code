import { createStore } from 'vuex'
import {getAdvator} from '@/api/getAdvator';
export default createStore({
  state(){
    return{
      token:'',// 用于保存后端返回的token
      imgadvatar:'',//获取头像地址
    }
  },
  getters: {
  },
  mutations: {
    setToken(state,context){
      state.token = context.token;
    },
    setAdvatar(state,result){
      state.imgadvatar=result;
      console.log(state.imgadvatar);
    }
  },
  actions: {
    // 获取头像
    advatar(context){
      getAdvator("/UserInfo/getAdvator").then((res) => {
        console.log(res);
        if(res.code==200){
          const result="http://" +res.advator;
          console.log(result);
         context.commit('setAdvatar',result);
        }
      });
    }
  },
  modules: {
  }
})
