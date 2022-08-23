<template>
    <div class="show_header">
      <div class="left">
        <input type="text" class="rename">
        <button type="reset" class="renameBtn">重命名</button>
      </div>
      <div class="right">
        <button class="presee" @click="preview">预览</button>
        <button class="save" @click="save">保存</button>
        <button class="release">发布</button>
      </div>
    </div>
</template>

<script setup>
import service from '@/utils/ApplicationJson';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
const store = useStore()
const route = useRoute()
const router = useRouter()

function save(){
  // service({
  //   method:'post',
  //   url:'/page/modifyPage',
  //   data:{
  //     pageContent:JSON.parse(JSON.stringify(store.state.componentList)),
  //     htmlStr:'',
  //     base64Code:''
  //   }
  // }).then(res=>{
  //   console.log(res);
  // })
  console.log();
  axios({
    url:"/api/page/modifyPage",
    method:"post",
    data:{id:parseInt(route.query.id),pageContent:JSON.parse(JSON.stringify(store.state.componentList)),htmlStr:'',base64Code:''},headers:{token:'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJsaWQiOjIwMjIwODAzMSwiaXNzIjoiUml2ZW5ubiIsInVzZXJuYW1lIjoiUml2ZW42NiJ9.aadsQxU6mxk2gE3ivfDLW7EXuDJVODUgd0b-4gd3AMk'}})
    .then(res=>{
      console.log(res);
    })
}

function preview(){
  router.push(`/preview?id=${route.query.id}`);
}
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
      border: 1px solid #16191E;
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
    width: 325px;
    height: 45px;
  }
  .right  {
    button{
      cursor: pointer;
      border: none;
      width: 93px;
      height: 45px;
      margin-right: 23px;
      background: #FFFFFF;
      border-radius: 15px;
    }
  }
  .right .release {
    margin-right: 0;
    background: #F7D94C;
  }
</style>