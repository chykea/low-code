<template>
  <img src="@/assets/images/PersonEdit/sun.png" />
  <div class="LC-design">
    <span class="LC">LC</span>
    <span class="design">design</span>
  </div>
  <div class="header-list">
    <button @click="logout" style="cursor: pointer;">退出登录</button>
    <ul>
      <Item v-for="(item,index) in arr" :key="index" :title="item.title" :url="item.url"></Item>
    </ul>
    <el-avatar :size="45" style="vertical-align: middle" />
    
  </div>
</template>

<script setup>
import { ref } from "vue";
import {useRouter} from 'vue-router'
import axios from "axios";
import Item from "./Item";

const arr =ref([
      {
        url:'',
        title:'新手教程'
      },
      {
        url:'',
        title:'项目管理'
      },
      {
        url:'',
        title:'素材库'
      }
    ]);

  const router = useRouter()
  // 退出登录
  const token = sessionStorage.getItem('token'); //从sessionStorage取出token
  function logout(){
    axios({
      method:"post",
      url:'/api/user/logout',
      headers:{token:token,"Content-Type":"multipart/form-data"}
    }).then(res=>{
      const {data} = res
      if(data.code===200){
        sessionStorage.removeItem('token'); // 退出登录成功后,退会到登录页面
        router.push('/toForm/login');
      }
    },err=>{
      console.log(err.message);
    })
  }
</script>

<style scoped>
img {
    width: 22px;
    height: 22px;
  }
  .LC-design {
    display: inline-block;
    width: 155px;
    height: 28px;
    margin-left: 21px;
    font-size: 32px;
    font-weight: bold;
    line-height: 21px;
    text-align: center;
  }
  .LC {
    font-family: Berlin Sans FB Demi;
    color: #17191a;
  }
  .design {
    margin-left: 10px;
    color: #aaa;
  }
  .header-list {
    display: inline-block;
    width: 540px;
    height: inherit;
    margin-left: 554px;
    vertical-align: bottom;
  }
  .header-list ul {
    /* padding: 0; */
    list-style: none;
    margin: 0;
  }
 
</style>