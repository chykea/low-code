<template>
  <div>
    <div class="select">
      <ul>
        <li><button @click="addBtn">按钮</button></li>
        <li><button @click="addTextarea">文本框</button></li>
        <li><button @click="addLink">超链接</button></li>
        <li><button @click="addImg">图片</button></li>
      </ul>
    </div>
    <div class="show">
      <!-- 渲染数组  -->
      <div v-for="item in childArr" :key="item">
        <!-- 判断 type,如果type为按钮,就渲染封装的按钮组件,并把默认的文本和样式等, 传给该组件 -->
        <Btn v-if="item.type==='button'" :text="item.text" :style="item.style" :func="item.func" :Listener="item.Listener" />

        <Link v-if="item.type==='a'" :text="item.text" :style="item.style"/>
        <Textarea v-if="item.type==='textarea'" :text="item.text" :style="item.style" />
        <Img v-if="item.type==='img'" :src="item.src" :style="item.style" :alt="item.alt" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref,reactive } from 'vue';
import Btn from './components/Btn/index.vue';
import Link from './components/Link/index.vue';
import Textarea from './components/Textarea/index.vue';
import Img from './components/Img/index.vue';


  let childArr = ref([]); // 渲染数组,存放节点的一些信息
  

  function addBtn(){  //  添加按钮
    let childObj = reactive({
      type:'button',  // 指明组件类型,之后可以通过该属性进行判断,然后渲染
      text:'默认文本',  // 默认文本,
      style:{"color":"red","width":'100px',"height":"35px"},  // 默认样式
      func:()=>{  // 按钮的默认函数
        console.log("hello");  
      },
      Listener:'click'
    })
    childArr.value.push(childObj);  // 存放到数组中
  }

  // 优化代码
  function addObj(obj={}){
    let childObj = reactive({
      ...obj
    })
    childArr.value.push(childObj)
  }




  function addLink(){
    let childObj = reactive({
      type:'a',
      text:'默认文本',
      style:{"color":"orange"},
    })
    childArr.value.push(childObj);
  }

  function addTextarea(){
    let childObj = reactive({
      type:'textarea',
      text:'默认文本',
      style:{"color":"orange"},
    })
    childArr.value.push(childObj);
  }

  function addImg(){
    addObj({
      type:'img',
      src:require("@/asset/girls.jpg"),
      alt:"图片加载失败时显示",
      style:{"width":"300px","height":"200px"},
    })
  }
</script>

<style lang="scss">
  .show{
    width: 1000px;
    height: 500px;
    border: 1px solid silver;
  }
  .select ul{
    display: flex;
    li{
      width: 100px;
      height: 35px;
      list-style: none;
    }
  }
</style>
