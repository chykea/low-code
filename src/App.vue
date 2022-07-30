<template>
  <h1>App组件---{{num}}</h1>
  <button @click="increment">点击+1</button>
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
