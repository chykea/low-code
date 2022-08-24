<template>
  <div class="introduce-use">
    <div class="introduce-use-header-box">
      <Header>
        <template v-slot:user_login>
          <LoginBtn v-if="!token" />
          <el-avatar v-else :size="45" :src="imgUser" />
        </template>
      </Header>
    </div>
    <div class="introduce-use-container">
      <slot name="container"></slot>
      <div class="introduce-use-imgbg">
        <ImgItem
          v-for="item in imglist"
          :key="item"
          :imgSrc="item.imgSrc"
          :left="item.left"
          :top="item.top"
          :zIndex="item.zIndex"
        />
        <div class="circle_first"></div>
        <div class="circle_second_1"></div>
        <div class="circle_second_2"></div>
        <div class="circle_second_3"></div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import Header from "./component/Header/index.vue";
import ImgItem from "./component/ImgItem/index.vue";
import LoginBtn from "./component/LoginBtn/index.vue";
import { getAdvator } from "@/api/getAdvator";

let imglist = ref([
  {
    imgSrc: require("@/assets/images/introduce/0.png"), // 通过数组遍历来引入图片,但不能直接是地址,需要用require来引入图片地址
    left: "567px", // 这些都是静态资源,为了不一个个手动引入,就直接弄成数组来 遍历渲染出来
    top: "190px",
    zIndex: "0",
  },
  {
    imgSrc: require("@/assets/images/introduce/1.png"),
    left: "0",
    top: "0",
    zIndex: "0",
  },
  {
    imgSrc: require("@/assets/images/introduce/2.png"),
    left: "512px",
    top: "501px",
    zIndex: "0",
  },
  {
    imgSrc: require("@/assets/images/introduce/3.png"),
    left: "128px",
    top: "227px",
    zIndex: "0",
  },
  {
    imgSrc: require("@/assets/images/introduce/4.png"),
    left: "45px",
    top: "50px",
    zIndex: "-1",
  },
  {
    imgSrc: require("@/assets/images/introduce/5.png"),
    left: "212px",
    top: "285px",
    zIndex: "-1",
  },
]);
let token = ref("");
let imgUser = ref("");
onMounted(() => {
  token.value = sessionStorage.getItem("token");
  console.log(token.value);
  // 用户登录过了
  if (token.value) {
    getAdvator("/UserInfo/getAdvator").then((res) => {
      if (res.code == 200) {
        imgUser.value = "http://" + res.advator;
      }
    });
  }
});
</script>
<style lang='scss' scoped>
.introduce-use {
  min-height: 936px;
  & > div {
    display: flex;
  }

  .introduce-use-header-box {
    width: 100%;
    justify-content: space-between;
    align-items: center;
  }
  // 内容
  .introduce-use-container {
    min-height: 836px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    .introduce-use-imgbg {
      position: relative;
      width: 735px;
      height: 560px;
    }
    @media (max-width: 960px) {
      .introduce-use-imgbg {
        display: none;
      }
    }
  }
}

div[class^="circle_"] {
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #f7d94c;
  box-shadow: 0px 0px 7px 7px rgb(247, 215, 64, 0.88);
  z-index: -1;
}
div[class^="circle_second"] {
  visibility: hidden;
}
.circle_first {
  left: 83px;
  top: 95px;
  transform-origin: 115px 107px;
  animation: turnRound 6s infinite ease-in-out;
}
.circle_second_1 {
  left: 603px;
  top: 293px;
  transform-origin: -150px -25px;
  animation: climb1 9s infinite 0s ease-in-out;
}
.circle_second_2 {
  left: 414px;
  top: 414px;
  transform-origin: 0px 150px;
  transform-origin: -36px 169px;
  animation: climb2 9s infinite 2.25s ease-in-out;
}
.circle_second_3 {
  left: 210px;
  top: 540px;
  animation: climb3 9s infinite 4.5s ease-in-out;
}
@keyframes turnRound {
  100% {
    transform: rotate(360deg);
  }
}
@keyframes climb1 {
  0% {
    visibility: visible;
  }
  25% {
    transform: rotate(90deg) translateX(-10px);
    visibility: hidden;
  }
  100% {
    visibility: hidden;
  }
}
@keyframes climb2 {
  0% {
    visibility: visible;
  }
  25% {
    transform: rotate(-88deg) translateX(-7px);
    visibility: hidden;
  }
  100% {
    visibility: hidden;
  }
}
@keyframes climb3 {
  0% {
    visibility: visible;
  }
  25% {
    top: 540px;
    left: 603px;
  }
  50% {
    left: 603px;
    top: 293px;
    visibility: hidden;
  }
  100% {
    visibility: hidden;
  }
}
</style>