<template>
  <li>
    <!-- <a :href="url">{{prop.title}}</a> -->
    <router-link :to="url" class="fonts">{{ prop.title }}</router-link>
  </li>
</template>

<script setup>
import { defineProps } from "vue";
const prop = defineProps({
  title: String,
  url: String,
});
</script>

<style scoped>
li {
  float: left;
  width: 72px;
  /* height: 70x; */
  margin-right: 78px;
  /* line-height: 70px; */
}
.fonts {
  font-size: 18px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #17191a;
  text-decoration: none;
}
</style>