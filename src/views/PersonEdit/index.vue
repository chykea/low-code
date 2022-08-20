<template>
  <div class="common-layout">
    <el-container>
      <el-header class="header">
        <Header />
      </el-header>
      <el-container>
        <el-aside class="content content-left">
            <LeftSide />
        </el-aside>
        <el-main class="content content-right">
          <MainContent/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import {ElMain,ElContainer,ElHeader,ElAside} from 'element-plus'
import 'element-plus/es/components/message/style/css'

import LeftSide from "@/views/PersonEdit/component/LeftSide";
import Header from "@/views/PersonEdit/component/Header/index.vue";
import MainContent from'@/views/PersonEdit/component/MainContent/index.vue';


</script>

<style scoped>
.common-layout {
  width: 1366px;
  height: 100vh;
  margin: 0 auto;
}
.header {
  width: 1366px;
  /* height: 70px; */
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
  margin-top: 10px;
   scrollbar-color: rgba(144, 147, 153, 0.3) transparent;
  scrollbar-width: thin;
}
.content-right::-webkit-scrollbar{
  width: 6px;
  /* height: 6px; */
}
.content-right::-webkit-scrollbar-button{
  display: none;
}
.content-right::-webkit-scrollbar-track{
  background: transparent;
}
.content-right::-webkit-scrollbar-track-piece{
  background-color: transparent;
}
.content-right::-webkit-scrollbar-thumb{
  background: rgba(144, 147, 153, 0.3);
  
  border-radius: 4px;
}
</style>
