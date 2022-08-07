<template>
  <div class="project">
     <div class="project-title">
        <img :src="prop.imgSrc" />
      <span>{{prop.imgContent}}</span>
     </div>
    <div class="project-main">

    </div>
  </div>
</template>

<script setup>
  import {defineProps} from 'vue';
  const prop =defineProps({
            imgSrc:String,
            imgContent:String
        });

</script>

<style scoped>
@import '@/assets/css/PersonEdit/project_modle.css'
</style>

