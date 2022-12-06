<template>
  <div class="show_header">
    <div class="left">
      <input type="text" v-model="proNames" ref="ipt" :readonly="readonly" class="rename" title="点击enter键完成命名"
        placeholder="点击enter键完成命名" @keydown.enter="fixName()" />
      <button class="renameBtn" @click="btn()">重命名</button>
    </div>
    <div class="right">
      <button @click="nextVersion">前往新版</button>

      <button class="presee" @click="preview">预览</button>
      <button class="save" @click="save">保存</button>
      <button class="release" @click="publishing()">发布</button>
    </div>
  </div>
</template>

<script setup>
import service from '@/utils/ApplicationJson';
import { publish } from "@/api/publish";
import { ref, onMounted, reactive, watch, onUnmounted, defineProps } from "vue";
import axios from 'axios';
import { ElMessage } from 'element-plus';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { behavePro } from "@/api/behavePro";
import { fixProname } from "@/api/fixProname";


const store = useStore()
const route = useRoute()
const router = useRouter()
const ipt = ref(null);
const readonly = ref(true);
const proNames = ref("");
// const queryId = inject("queryId");
const originname = ref("");//存储原先的项目名字

// 定时保存
let timer = setInterval(save, 60000);
function save() {
  service({
    method: 'post',
    url: '/page/modifyPage',
    data: {
      id: parseInt(route.query.id),
      pageContent: JSON.parse(JSON.stringify(store.state.componentList)),
      htmlStr: '',
      base64Code: ''
    }
  }).then(res => {
    if (timer) {
      clearInterval(timer);
    }
    timer = setInterval(save, 60000)
    ElMessage({
      message: '保存成功',
      type: 'success',
      duration: 1000
    })
  }).catch(err => {
    console.log(err);
  })
}

onUnmounted(() => {
  clearInterval(timer)
});


function nextVersion() {
  router.push('/nextVersion')
}



function preview() {
  router.push(`/preview?id=${route.query.id}`)
};

//点击”重命名“触发的函数
function btn() {
  readonly.value = false;
  ipt.value.focus();
}
//修改完名字点enter键后触发的函数
function fixName() {
  if (originname.value == proNames.value) {
    ElMessage({
      message: "名字不能和原先的一样！",
      type: "error",
      duration: 2000,
    });
    return;
  }
  let data = {
    id: route.query.id,
    pageName: proNames.value,
  };
  fixProname("/page/modifyPageName", data).then((res) => {
    if (res.data.code == 200) {
      readonly.value = true;
    }
  });
}
//“发布”请求接口
function publishing() {
  const data = { id: route.query.id };
  publish("/page/turnToPublic", data).then((res) => {
    // console.log(res);
    if (res.data.code == 200) {
      ElMessage({
        message: "发布成功！",
        type: "success",
        duration: 1000,
      });
    }
  });
}
onMounted(() => {
  //在输入框里边显示项目名
  behavePro("/page/getAllPage").then((res) => {
    // console.log(res.msg);
    if (res.code == 200) {
      let arr = res.data;
      for (let i = 0; i < arr.length; i++) {
        if (route.query.id == arr[i].id) {
          originname.value = arr[i].pageName;
          proNames.value = originname.value;
        }
      }
    }
  });

});
</script>

<style lang="scss">
.show_header {
  display: flex;
  justify-content: space-between;
  width: 1536px;
  height: 103px;
  box-sizing: border-box;
  padding: 33px 66px;
  background-color: #f5f5f5;
}

.left {
  .rename {
    box-sizing: border-box;
    width: 160px;
    height: 42px;
    padding: 0 17px;
    margin-right: 19px;
    border: 1px solid #16191e;
    border-radius: 10px;
    background-color: #f5f5f5;
    outline: none;
  }

  .renameBtn {
    border: none;
    font-size: 16px;
    font-family: Microsoft YaHei;
    background-color: transparent;
    cursor: pointer;
  }
}

.right {
  width: 400px;
  height: 45px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.right {


  & .undo_box {
    display: inline-block;

    &:hover {
      background-color: beige;
      transition: all .5s;
    }

    .undo {
      padding: 5px;
      cursor: pointer;

    }


  }

  &>button {
    cursor: pointer;
    border: none;
    width: 93px;
    height: 45px;
    // margin-right: 23px;
    background: #ffffff;
    border-radius: 15px;
  }
}

.right .release {
  margin-right: 0;
  background: #f7d94c;
}
</style>