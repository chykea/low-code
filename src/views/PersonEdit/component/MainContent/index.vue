<template>
 <div class="mainContains">
  <Project :imgSrc="pro.imgSrc" :imgContent="pro.imgContent"/>
  <Modle :imgSrc="mod.imgSrc" :imgContent="mod.imgContent"/>
   </div>

</template>

<script setup>
import {reactive} from 'vue'; 
import Modle from '@/views/PersonEdit/component/MainContent/Modle';
import Project from '@/views/PersonEdit/component/MainContent/Project';

const pro=reactive({
    imgSrc:require('@/assets/images/PersonEdit/project.png'),
    imgContent:'我的项目'});
const mod=reactive({
    imgSrc:require('@/assets/images/PersonEdit/modle.png'),
    imgContent:'我的素材'
});
// defineExpose({
//   pro,
//   mod
// })
// provide("pro",pro);
// provide("mod",mod);
</script>

<style>
.mainContains{
  position: relative;
}
</style>
