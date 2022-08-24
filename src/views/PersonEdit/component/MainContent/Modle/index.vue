<template>
  <div class="project project1">
    <div class="project-title">
      <img :src="prop.imgSrc" />
      <span>{{ prop.imgContent }}</span>
    </div>
    <div class="project-main">
      <!-- <Item
        v-for="(item, index) in counter"
        :key="index"
        :id="item"
        :val="componentName[index]"
      ></Item> -->
      <div class="waiting">
        敬请期待!
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import Item from "./Item";
import { Modle } from "@/api/myModle";
const counter = ref([]);
const componentName = ref([]);
const prop = defineProps({
  imgSrc: String,
  imgContent: String,
});
onMounted(()=>{
  Modle(counter.value, componentName.value);
})
</script>

<style scoped>
@import "@/assets/css/PersonEdit/project_modle.css";
.project-main{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
}
.waiting{
  width: 400px;
  height: 100px;
  font-size: 80px;
  color: purple;
  font-family: 华文琥珀;
  letter-spacing: 7px;
  text-shadow: 6px 6px rgb(197 223 148 / 80%), 7px 7px rgb(197 223 148 / 80%), 8px 8px rgb(197 223 148 / 80%), 9px 9px rgb(197 223 148 / 80%), 10px 10px rgb(197 223 148 / 80%), 11px 11px rgb(197 223 148 / 80%);
}
</style>

