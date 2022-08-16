<template>
  <div class="content-inner">
    <div class="head">
      <el-avatar :src="imgavatar"  :size="45"></el-avatar>
    </div>
    <p></p>
    <div class="left-side" v-for="(item, index) in arr" :key="index">
      <img :src="item.imgSrc" :alt="item.imgAlt" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import {getAdvator} from '@/api/getAdvator'
const arr = ref([
  {
    imgSrc: require("@/assets/images/PersonEdit/project.png"),
    imgAlt: "我的项目",
  },
  {
    imgSrc: require("@/assets/images/PersonEdit/modle.png"),
    imgAlt: "我的素材",
  },
]);
//获取头像
onMounted(() => {
  getAdvator("/UserInfo/getAdvator").then((res) => {
    console.log(res);
    // const{data}=res;
    // if(data.code==200){
    //   imgavatar.value = "http://" + res.data.advator;
    // }
    
  });
});
</script>

<style scoped>
.left-side {
  position: relative;
  width: 45px;
  height: 45px;
  // background: #16191e;
  margin-bottom: 20px;
  border-radius: 15px;
  cursor: pointer;
}
.left-side img {
  position: absolute;
  width: 20px;
  height: 20px;
  top: 25%;
  left: 28%;
}
.content-inner {
  width: 80px;
  margin-left: 22px;
}
.content-inner p {
  width: 69px;
  height: 14px;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #16191e;
  line-height: 21px;
  text-align: center;
}
.head {
  width: 45px;
  height: 45px;
  /* margin-top: 30px; */
}
</style>

