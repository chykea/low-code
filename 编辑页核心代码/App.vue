<template>

  <!-- 
    引入了 vuedraggable@next 插件
    用于实现拖拽组件功能
   -->
  <div>
    <!-- 拖拽按钮 -->
    <Draggable
      :list="list"
      item-key="id"
      :group="{name:'component',pull:'clone',put:false}"
    >
      <template #item="{element}">
        <button style="margin:25px">{{element.type}}组件</button>
      </template>
    </Draggable>
    
    <!-- 显示区, -->
    <Draggable
      v-model="childArr"
      :group="{name:'component',pull:true}"
      item-key="id"
      class="show"
    >
      <template #item="{element}">
        <component 
        :is="element.type==='a'?Link:
        element.type==='button'?Btn:
        element.type==='p'?P:
        element.type==='img'?Img:
        element.type==='textarea'?Textarea:''
        "
        :childArray="element.childNode"
        :prop="element.prop"
        ></component>
      </template>

    </Draggable>
  </div>
</template>

<script setup>
import { ref,reactive,toRaw, onMounted } from 'vue';
import Draggable from 'vuedraggable';
import axios from 'axios'

import Btn from './components/Btn/index.vue';
import Link from './components/Link/index.vue';
import Textarea from './components/Textarea/index.vue';
import Img from './components/Img/index.vue';
import P from './components/P/index.vue';
import {useStore} from 'vuex';

  const store = useStore()
  let childArr = ref([]); // 存放节点的一些信息的数组

  // 组件拖拽按钮的数组
  let list = ref([
    {
      id:1,
      type:'button',  // 指明组件类型,之后可以通过该属性进行判断,然后渲染
      prop:{
        text:'默认文本',  // 默认文本,
        style:{color:"red",width:'100px',height:"35px"},  // 默认样式
        func:null,
        Listener:'',
        className:'',
        funcStr:'',
        boxStyle:{},
      },
      childNode:[],
    },
    {
      id:2,
      type:'textarea',
      prop:{
        text:'默认文本',
        style:{"color":"orange"},
        func:null,
        Listener:'',
        className:'',
        funcStr:'',
        boxStyle:{},
      },
      childNode:[]
    },
    {
      id:3,
      type:'a',
      prop:{
        text:'默认文本',
        style:{"color":"orange"},
        func:null,
        Listener:'',
        className:'',
        funcStr:'',
        boxStyle:{},
        // href:''
      },
      childNode:[]
    },
    {
      id:4,
      type:'p',
      prop:{
        text:'',
        style:{},
        func:null,
        Listener:'',
        className:'',
        funcStr:'',
        boxStyle:{'display':'block','text-align':'center'},
      },
      childNode:[
        {
          type:'span',
          prop:{
            text:'段落的子组件2',
            style:{"color":"orange"},
            func:null,
            Listener:'',
            className:'',
            funcStr:'',
            boxStyle:{},
          },
          childNode:[]
        },
        {
          type:'a',
          prop:{
            text:'段落的子组件1',
            style:{"color":"#bfa"},
            href:'',
            func:null,
            Listener:'',
            className:'',
            funcStr:'',
            boxStyle:{},
          },
          childNode:[]
        }
      ],

    },
    {
      id:5,
      type:'img',
      prop:{
        src:'https://t1.picb.cc/uploads/2021/07/09/wCQHxF.md.jpg',
        alt:"图片加载失败时显示",
        style:{"width":"300px","height":""},
        func:null,
        Listener:'',
        className:'',
        funcStr:'',
        boxStyle:{},
      },
      childNode:[]
    }
  ]);
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
