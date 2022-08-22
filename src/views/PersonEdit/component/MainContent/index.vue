<template>
  <Project :imgSrc="pro.imgSrc" :imgContent="pro.imgContent"/>
  <Modle :imgSrc="mod.imgSrc" :imgContent="mod.imgContent"/>
  

</template>

<script setup>
import {reactive,ref} from 'vue'; 
import Modle from '@/views/PersonEdit/component/MainContent/Modle';
import Project from '@/views/PersonEdit/component/MainContent/Project';
const block0=ref(null);
const block1=ref(null);
const pro=reactive({
    imgSrc:require('@/assets/images/PersonEdit/project.png'),
    imgContent:'我的项目'});
const mod=reactive({
    imgSrc:require('@/assets/images/PersonEdit/modle.png'),
    imgContent:'我的素材'
});
// const prop=defineProps({
//   key:Number,
// })
// defineExpose({
//   pro,
//   mod
// })
// provide("pro",pro);
// provide("mod",mod);
</script>

<style>

</style>
