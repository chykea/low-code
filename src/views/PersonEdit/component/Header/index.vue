<template>
  <div class="whole-header">
    <div class="header-left">
      <img src="@/assets/images/PersonEdit/sun.png" />
      <div class="LC-design">
        <span class="LC">LC</span>
        <span class="design">design</span>
      </div>
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
          <!-- <div class="disappear" v-if="showHead" > -->
          <div class="disappear" v-if="showHead && select" >
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
  </div>
  <div style="opacity: 0">
    <input
      v-if="fileInput"
      ref="fileUpload"
      type="file"
      @change="addFile($event)"
      accept="image/jpeg,image/jpg,image/png"
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
import { ElMessage } from "element-plus";
import { getAdvator } from "@/api/getAdvator";
const store = useStore();


const select = ref(true);
const test = () => {
  select.value=false;
}
defineExpose({
  test,
  select,
})

store.dispatch("advatar");
const router = useRouter();
const arr = ref([
  {
    url: "/introduce",
    title: "????????????",
  },
  {
    url: "/personedit",
    title: "????????????",
  },
  {
    url: "/library",
    title: "?????????",
  },
]);
const showHead = ref(false);
const fileInput = ref(false);
const fileUpload = ref(null);
const liContent = ref([
  {
    title: "????????????",
    clickContent: () => {
      fileInput.value = true;
      nextTick(() => {
        fileUpload.value.click();
      });
    },
  },
  {
    title: "????????????",
    clickContent: () => {
      if (confirm("??????????????????")) {
        router.push("/toForm");
        sessionStorage.clear();
      }
    },
  },
]);
async function addFile(file) {
  const files = file.target.files[0];
  const size=5*1024*1024;
  // const type=files.type.split('/')[1];
  if (!files) {
    return;
  }
  if(files.size>size){
    ElMessage({
        message: "??????????????????5M???",
        type: "error",
        duration: 1000,
      });
      return;
  }
  // if(type!='png'&&type!='jpeg'&&type!='jpg'){
  //   ElMessage({
  //       message: "????????????????????????",
  //       type: "error",
  //       duration: 1000,
  //     });
  //     return;
  // }
  const formData = new FormData();
  formData.append("file", files);
  await upload("/UserInfo/uploadTouXiang", formData).then((res) => {
    if (res.code !== 200) {
      ElMessage({
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
