<template>
  <div class="project">
    <div class="project-title">
      <img :src="prop.imgSrc" />
      <span>{{ prop.imgContent }}</span>
    </div>
    <div class="project-main">
      <div class="project-main-wrap" @click="showInput = true">
        <div class="creation">
          <div>
            <img :src="plus.imgSrc" />
            <p>{{ plus.text }}</p>
          </div>
        </div>
        <transition
          name="animate__animated animate__bounce"
          enter-active-class="animate__backInLeft"
          leave-active-class="animate__backOutRight"
        >
          <div class="creation_name" v-if="showInput">
            <h3>{{ plus.name }}</h3>
            <input
              type="text"
              class="pro_name"
              v-model="val"
              :placeholder="plus.placeholder"
              @keydown.enter="addDiv()"
            />
            <button class="button" @click.stop="changShow()">
              {{ plus.buttonContent }}
            </button>
          </div>
        </transition>
      </div>
      <Item
        v-for="(item, index) in plus.counter"
        :key="item"
        :id="item"
        :index="index"
        :val="plus.totalNames[index]"
        @remove="remove"
      ></Item>
    </div>
    <!-- <button @click="save()">点击下载</button> -->
  </div>
</template>

<script setup>
import { reactive, defineProps, ref, computed, watch } from "vue";
// import "animate.css";
import { useStore } from "vuex";
import Item from "./Item";
import axios from "axios";
import { createPro, deletePro, behavePro} from "@/services/request";
const store = useStore();

// 接受父组件传来的参数
const prop = defineProps({
  imgSrc: String,
  imgContent: String,
});
const plus = reactive({
  imgSrc: require("@/assets/images/PersonEdit/plus.png"),
  text: "新建项目",
  name: "项目名称",
  placeholder: "点击 Enter键 完成命名",
  buttonContent: "取消",
  totalNames: [],
  counter: [],
});
//必须是响应式数据
var showInput = ref(false);
// 获取input框里的value值
let val = ref("");
behavePro(plus.counter,plus.totalNames);
//点击创建enter键后会增加一个项目内容
function addDiv() {
  showInput.value = false;
  createPro("post", "/api/page/createPage", "application/json",val.value);
  behavePro(plus.counter,plus.totalNames);
   val.value = "";
}
// 点击“取消“时执行的函数
function changShow() {
  showInput.value = false;
  val.value = "";
}
//点击”删除“时执行
function remove(n, id) {
  plus.totalNames.splice(n, 1);
  plus.counter.splice(n, 1);
  deletePro(id);
}
</script>

<style scoped>
@import "@/assets/css/PersonEdit/project_modle.css";
@import "@/assets/css/PersonEdit/project.css";
</style>