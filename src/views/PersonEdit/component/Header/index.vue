<template>
  <img src="@/assets/images/PersonEdit/sun.png" />
  <div class="LC-design">
    <span class="LC">LC</span>
    <span class="design">design</span>
  </div>
  <div class="header-list">
    <ul>
      <Item v-for="(item,index) in arr" :key="index" :title="item.title" :url="item.url"></Item>
    </ul>
    <el-avatar :size="45" style="vertical-align: middle" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import Item from "./Item";
const arr =ref([
      {
        url:'',
        title:'新手教程'
      },
      {
        url:'',
        title:'项目管理'
      },
      {
        url:'',
        title:'素材库'
      }
    ]);
</script>

<style scoped>
img {
    width: 22px;
    height: 22px;
  }
  .LC-design {
    display: inline-block;
    width: 155px;
    height: 28px;
    margin-left: 21px;
    font-size: 32px;
    font-weight: bold;
    line-height: 21px;
    text-align: center;
  }
  .LC {
    font-family: Berlin Sans FB Demi;
    color: #17191a;
  }
  .design {
    margin-left: 10px;
    color: #aaa;
  }
  .header-list {
    display: inline-block;
    width: 540px;
    height: inherit;
    margin-left: 554px;
    vertical-align: bottom;
  }
  .header-list ul {
    /* padding: 0; */
    list-style: none;
    margin: 0;
  }
 
</style>