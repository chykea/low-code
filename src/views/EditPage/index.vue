<template>
  <div class="PageOut">
    <div class="head">
      <el-header class="header">
        <Header />
      </el-header>
    </div>
    <div class="EditPage_selectArea">
      <SelectArea></SelectArea>
    </div>
  </div>
</template>

<script setup>
import Header from "@/views/PersonEdit/component/Header/index.vue";
import SelectArea from "./components/SelectArea/index.vue";
import { useRoute } from "vue-router";
import { onMounted, provide } from "vue";
const route = useRoute();
const queryId = route.query.id;//用于接收路由传过来的参数
provide("queryId", queryId);

</script>

<style lang="scss">
.PageOut {
  width: 1920px;
  height: 100vh;
  margin: 0 auto;
}

.head {
  height: 73px;
  padding-top: 21px;
  background: #FFFFFF;
  box-shadow: 0px 2px 21px 0px rgba(158, 158, 158, 0.16);
}

.el-header {
  --el-header-padding: 0 20px;
  --el-header-height: 60px;
  padding: var(--el-header-padding);
  box-sizing: border-box;
  flex-shrink: 0;
  height: var(--el-header-height);
}

.header {
  width: 1636px;
  line-height: 60px;
  margin: 0 auto;
}
</style>
