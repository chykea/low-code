<template>
  <img src="@/assets/images/PersonEdit/sun.png" />
  <div class="LC-design">
    <span class="LC">LC</span>
    <span class="design">design</span>
  </div>
  <div class="header-list">
    <ul>
      <Item
        v-for="(item, index) in arr"
        :key="index"
        :title="item.title"
        :url="item.url"
      ></Item>
    </ul>
    <el-avatar :size="45" :src="imgavatar" class="user" />
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import Item from "./Item";
import axios from "axios";
import {getAdvator} from '@/api/getAdvator'
const arr = ref([
  {
    url: "/introduce",
    title: "新手教程",
  },
  {
    url: "/personedit",
    title: "项目管理",
  },
  {
    url: "",
    title: "素材库",
  },
]);

const imgavatar = ref("");
// 封装了请求,不需要再自己手动添加token 和 /api 前缀了
onMounted(() => {
  getAdvator("/UserInfo/getAdvator").then((res) => {
    console.log(res);
    if(res.code==200){
      imgavatar.value = "http://" + res.advator;
    }
    
  });


</script>

<style scoped>
img {
  width: 22px;
  height: 22px;
}
.LC-design {
  font-family: 'BerlinSansFBDemi-Bold';
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
  color: #17191a;
}
.design {
  margin-left: 10px;
  color: #aaa;
}
.header-list {
  display: inline-block;
  width: 500px;
  height: inherit;
  margin-left: 627px;
  vertical-align: bottom;
}
.header-list ul {
  /* padding: 0; */
  list-style: none;
  margin: 0;
}
.user {
  vertical-align: middle;
}
</style>
