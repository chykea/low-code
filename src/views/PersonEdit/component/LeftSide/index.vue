<template>
  <div class="content-inner">
    <div class="head">
      <el-avatar :src="store.state.imgadvatar" :size="45"></el-avatar>
    </div>
    <p></p>
    <div
      class="left-side"
      v-for="(item, index) in arr"
      :key="index"
      @click="clickchange(index)"
      :class="{cur:index==current}"
    >
      <img v-if="index==current" :src="item.imgSrc1" :title="item.imgAlt" />
      <img v-else :src="item.imgSrc2" :title="item.imgAlt"/>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import { getAdvator } from "@/api/getAdvator";
const current=ref(0);
const store = useStore();
const arr = ref([
  {
    imgSrc1: require("@/assets/images/PersonEdit/project1.png"),
    imgSrc2:require("@/assets/images/PersonEdit/project2.png"),
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
    current.value=i;
  }, 500);
}
defineExpose({
  current
})
</script>

<style scoped>
.left-side {
  position: relative;
  width: 45px;
  height: 45px;
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
.cur{
  background: #333;
}
</style>

