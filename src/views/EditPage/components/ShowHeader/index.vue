<template>
    <div class="show_header">
      <div class="left">
        <input type="text" class="rename">
        <button type="reset" class="renameBtn">重命名</button>
      </div>
      <div class="right">
        <button class="presee">预览</button>
        <button class="save">保存</button>
        <button class="release" @click="publishing()">发布</button>
      </div>
    </div>
</template>

<script setup>
import {publish} from "@/api/publish";
import { inject } from "vue";
import { ElMessage } from 'element-plus'
const queryId=inject("queryId");
//“发布”请求接口
function publishing(){
  const data={id:queryId};
  publish("/page/turnToPublic",data).then(res=>{
    // console.log(res);
    if(res.data.code==200){
      ElMessage({
        message:"发布成功！",
        type:"success",
        duration:1000
      })
    }
  })
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