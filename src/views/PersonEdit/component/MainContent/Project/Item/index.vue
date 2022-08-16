<template>
  <div class="newproject">
    <div
      class="newproject-wrap"
      @mouseenter="showHover = true"
      @mouseleave="showHover = false"
    >
      <!-- src\assets\images\PersonEdit\test.png -->
      <div class="new-content cur">
        <div class="new-content-wrap">
          <img src="@/assets/images/PersonEdit/test.png" />
        </div>
      </div>
      <transition
        name="animate__animated animate__bounce"
        enter-active-class="animate__flipInX"
        leave-active-class="animate__flipOutX"
      >
        <div class="new-content content-dis" v-show="showHover">
          <a
            class="content-img"
            v-for="(item, index) in arr"
            :key="index"
            :title="item.imgTitle"
            @click="item.imgEmotion"
          >
            <img :src="item.imgSrc" />
          </a>
        </div>
      </transition>
    </div>
    <p class="new-text">
      <a href="">{{ val }}</a>
    </p>

    <!-- <span>{{prop.order}}</span> -->
  </div>
</template>

<script setup>
import { ref } from "vue";
import "animate.css";
import axios from "axios";
import { saveAs } from "@/services/request";

const prop = defineProps({
  order: Number,
  index: Number,
  val: String,
  id: Number,
});
const emit = defineEmits(["remove"]);
let showHover = ref(false); //盒子是否出现的指标

const arr = ref([
  {
    imgSrc: require("@/assets/images/PersonEdit/edit.png"),
    imgTitle: "编辑",
    imgEmotion: "",
  },
  {
    imgSrc: require("@/assets/images/PersonEdit/preserve.png"),
    imgTitle: "另存为",
    // imgHref:,
    // imgName:,
    imgEmotion: () => {
       saveAs(prop.id);
    },
  },
  {
    imgSrc: require("@/assets/images/PersonEdit/delete.png"),
    imgTitle: "删除",
    imgEmotion: () => {
      if (confirm("确认删除吗？")) {
        del(prop.index, prop.id);
      }
    },
  },
]);
//删除功能,传给父组件
function del(n, id) {
  emit("remove", n, id);
}
</script>

<style>
@import "@/assets/css/PersonEdit/project_item.css";
</style>