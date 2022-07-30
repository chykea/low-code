<template>
  <h1>App组件---{{num}}</h1>
  <button @click="increment">点击+1</button>
  <router-link to="/Introduce">介绍</router-link>
  <router-view></router-view>
</template>
<script setup>
import {ref,computed} from 'vue'
import {useStore} from 'vuex'
const store = useStore();
let num = computed(()=>store.state.num);

function increment(){
  store.commit('increment',num)
}
</script>
<style lang="scss">

</style>
