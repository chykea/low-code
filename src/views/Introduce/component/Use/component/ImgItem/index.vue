<template>
<div class="introduce-use-imgbg-box" >
    <img :src="props.imgSrc">
</div>
</template>
<script setup>
import {defineProps, ref} from 'vue'
const props = defineProps({
    left:String,
    top:String,
    imgSrc:String,
    zIndex:String
})
let left = ref(props.left)
let top = ref(props.top)
let zIndex = ref(props.zIndex)
</script>
<style lang='scss' scoped>
    
    .introduce-use-imgbg-box{
        position: absolute;
        left: v-bind(left); // vue3.2的特性,可以通过v-bind使用js变量
        top:v-bind(top);
        z-index: v-bind(zIndex);
    }
</style>