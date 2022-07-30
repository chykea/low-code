<template>
  <h1>App组件---{{num}}</h1>
  <button @click="add">点击+1</button>
</template>
<script setup>
import {ref} from 'vue'

let num = ref(0);
function add(){
  num.value+=1;
}
</script>
<style lang="scss">

</style>
