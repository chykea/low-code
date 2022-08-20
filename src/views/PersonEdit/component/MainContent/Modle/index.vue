、<template>
  <div class="project">
    <div class="project-title">
      <img :src="prop.imgSrc" />
      <span>{{ prop.imgContent }}</span>
    </div>
    <div class="project-main">
      <Item
        v-for="(item, index) in counter"
        :key="index"
        :id="item"
        :val="componentName[index]"
      ></Item>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Item from "./Item";
import { Modle } from "@/api/myModle";
const counter = ref([]);
const componentName = ref([]);
const prop = defineProps({
  imgSrc: String,
  imgContent: String,
});
Modle(counter.value, componentName.value);
</script>

<style scoped>
@import "@/assets/css/PersonEdit/project_modle.css";
</style>

