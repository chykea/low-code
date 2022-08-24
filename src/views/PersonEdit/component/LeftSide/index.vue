<template>
  <div class="content-inner">
    <div class="left-head">
      <el-avatar :src="store.state.imgadvatar" :size="45"></el-avatar>
    </div>
    <p>{{ username }}</p>
    <div
      class="left-side"
      v-for="(item, index) in arr"
      :key="index"
      @click="clickchange(index)"
      :class="{ cur: index == current }"
    >
      <img v-if="index == current" :src="item.imgSrc1" :title="item.imgAlt" />
      <img v-else :src="item.imgSrc2" :title="item.imgAlt" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import { getAdvator } from "@/api/getAdvator";
import service from "@/utils/request";
const current = ref(0);
const store = useStore();
const username = ref("");
service({
  method: "get",
  url: "/UserInfo/getUserName",
}).then((res) => {
  if (res.code == 200) {
    username.value = res.username;
  }
});
const arr = ref([
  {
    imgSrc1: require("@/assets/images/PersonEdit/project1.png"),
    imgSrc2: require("@/assets/images/PersonEdit/project2.png"),
    imgAlt: "我的项目",
  },
  {
    imgSrc1: require("@/assets/images/PersonEdit/modle1.png"),
    imgSrc2: require("@/assets/images/PersonEdit/modle2.png"),
    imgAlt: "我的素材",
  },
]);
const emit = defineEmits(["clickNav"]);
function clickchange(i) {
  emit("clickNav", i);
  setTimeout(() => {
    current.value = i;
  }, 500);
}
defineExpose({
  current,
});
</script>

<style scoped>
.left-side {
  position: relative;
  width: 45px;
  height: 45px;
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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 120px;
  height: 200px;
  margin-left: 22px;
}
.content-inner p {
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #16191e;
}
.left-head {
  width: 45px;
  height: 45px;
  /* margin-top: 30px; */
}
.cur {
  background: #333;
}
</style>

