<template>
  <div class="layout">
    <div
      class="showStag"
      @mouseenter="isHover = !isHover"
      @mouseleave="isHover = !isHover"
    >
      <Suspense>
        <template v-slot:default>
          <p>发送请求后接收到的内容展示</p>
        </template>
        <template v-slot:fallback>
          <p class="loading">正在加载中</p>
        </template>
      </Suspense>
      <span v-show="isHover" @click="addToSelf">加入个人库</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { getDetail } from "@/api/getDetail";

const isHover = ref(false);
const router = useRouter();
// 接收公共页传来的cur参数，发送请求
const props = defineProps({
  cur: Number,
});
onMounted(() => {
  getDetail("public/getPage", props.cur).then((res) => {
    // console.log(res);
    if (res.code !== 200) {
      // 替换内容
      console.log(res.data);
    }
  });
});

function addToSelf() {
  if (confirm("确认加入个人库吗？")) {
    // 加入后退回
    router.go(-1);
  }
}
</script>

<style scoped>
.layout {
  width: 1366px;
  height: calc(100vh - 65px);
  margin: 0 auto;
}
.showStag {
  position: relative;
  margin: 25px auto;
  width: 1209px;
  height: 610px;
  background: #f1f1f1;
  border-radius: 15px;
}

.showStag span {
  position: absolute;
  bottom: 65px;
  left: 50%;
  transform: translateX(-50%);
  width: 200px;
  height: 59px;
  text-align: center;
  line-height: 59px;
  font-size: 22px;
  font-weight: bold;
  color: #16191e;
  background: #f7d94c;
  border-radius: 30px;
  cursor: pointer;
  user-select: none;
}

.showStag span:hover {
  box-shadow: 1px 6px 51px 0px rgba(247, 215, 64, 0.88);
}

.loading,
p {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: inline-block;
  text-align: center;
  line-height: 100%;
}
</style>