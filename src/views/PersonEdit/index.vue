<template>
  <div class="common-layout">
    <el-container>
      <el-header class="header">
        <Header />
      </el-header>
      <el-container>
        <el-aside class="content content-left">
          <LeftSide @clickNav="clickNav" ref="guide" />
        </el-aside>
        <el-main class="content content-right" id="contain" @scroll="handleScroll()">
          <MainContent />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { ElMain, ElContainer, ElHeader, ElAside } from "element-plus";
import "element-plus/es/components/message/style/css";
import { nextTick, onMounted, ref } from "vue";
import LeftSide from "@/views/PersonEdit/component/LeftSide";
import Header from "@/views/PersonEdit/component/Header/index.vue";
import MainContent from "@/views/PersonEdit/component/MainContent/index.vue";
const guide = ref(null);
//点击事件 传给 leftside组件，使页面左边模块点击时右边模块能滑到对应内容

function clickNav(index) {
  const navPage = document.querySelector(".project" + index);

  const topspot = navPage.offsetTop;
  console.log(topspot);
  contain.scrollTo({
    top: topspot,
    behavior: "smooth",
  });
}
//滚动事件
function handleScroll() {
  // const mainContain = document.querySelector(".mainContains");
  const contain = document.querySelector("#contain");
  const top = contain.scrollTop;
  let index = 0;
  const projectTop=document.querySelector('.project1');
  if(top>=projectTop.offsetTop-20){
    index=1;
  }
  guide.value.current = index;
}
</script>

<style scoped>
.common-layout {
  width: 1366px;
  height: 100vh;
  margin: 0 auto;
}
.header {
  width: 1366px;
  height: 100px;
  /* margin: 0 auto; */
  line-height: 60px;
}

.content {
  height: calc(100vh - 90px);
}
.content-left {
  margin-top: 30px;
}
.content-right {
  position: relative;
  margin-top: 10px;
  scrollbar-color: rgba(144, 147, 153, 0.3) transparent; /*火狐中使用*/
  scrollbar-width: thin;/*火狐中使用*/
}
.content-right::-webkit-scrollbar {
  width: 6px;
  /* height: 6px; */
}
.content-right::-webkit-scrollbar-button {
  display: none;
}
.content-right::-webkit-scrollbar-track {
  background: transparent;
}
.content-right::-webkit-scrollbar-track-piece {
  background-color: transparent;
}
.content-right::-webkit-scrollbar-thumb {
  background: rgba(144, 147, 153, 0.3);

  border-radius: 4px;
}
</style>

