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
    <div
      class="head-image"
      @mouseenter="showHead = true"
      @mouseleave="showHead = false"
    >
      <el-avatar :size="45" :src="store.state.imgadvatar" />
      <transition
        name="animate__animated animate__bounce"
        enter-active-class="animate__fadeIn"
        leave-active-class="animate__fadeOut"
      >
        <div class="disappear" v-if="showHead">
          <ul>
            <li
              v-for="(item, index) in liContent"
              :key="index"
              @click="item.clickContent"
            >
              {{ item.title }}
            </li>
          </ul>
        </div>
      </transition>
    </div>
  </div>
  <div style="opacity: 0">
    <input
      v-if="fileInput"
      ref="fileUpload"
      type="file"
      @change="addFile($event)"
    />
  </div>
</template>

<script setup>
import { nextTick, onMounted, reactive, ref } from "vue";
import Item from "./Item";
import axios from "axios";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { upload } from "@/api/upload";
import "animate.css";
import { Elmessage } from "element-plus";
import { getAdvator } from "@/api/getAdvator";
const store = useStore();
console.log(store.state.imgadvatar + "lalal");
store.dispatch("advatar");
const router = useRouter();
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
const showHead = ref(false);
const fileInput = ref(false);
const fileUpload = ref(null);
const liContent = ref([
  {
    title: "更换头像",
    clickContent: () => {
      fileInput.value = true;
      nextTick(() => {
        fileUpload.value.click();
      });
    },
  },
  {
    title: "退出登录",
    clickContent: () => {
      if (confirm("确定退出吗？")) {
        router.push("/toForm");
        sessionStorage.clear();
      }
    },
  },
]);
async function addFile(file) {
  const files = file.target.files[0];
  if (!files) {
    return;
  }
  const formData = new FormData();
  formData.append("file", files);
  await upload("/UserInfo/uploadTouXiang", formData).then((res) => {
    if (res.code !== 200) {
      Elmessage({
        message: res.msg,
        type: "error",
        duration: 1000,
      });
    }
    fileUpload.value = null;
  });
  store.dispatch("advatar");
}
</script>

<style scoped>
@import "@/assets/css/PersonEdit/header.css";
</style>
