<template>
  <div class="Edit_select_area">
    <!-- 
      引入了 vuedraggable@next 插件
      用于实现拖拽组件功能
      :list  绑定数据列表
      item-key  相当于 :key=""
      :group   分组, name 相同的一组的才可以进行拖拽
      pull 拖拽的功能  有三个取值  true(开启拖拽)  false(关闭拖拽)  clone(拖拽到name相同的一种就复制数据,实现拖拽组件的核心) 
    -->
    <div>
      <!-- 拖拽按钮 -->
      <Draggable
        class="left_select"
        :list="list"
        item-key="id"
        :group="{name:'component',pull:'clone',put:false}"
      >
        <template #item="{element}">
          <div class="select_item">
            <button class="select_button">
              <img class="select_img" :src="element.imgSrc">
            </button>
          </div>
        </template>
      </Draggable>
      <!-- 显示区, -->
      <div class="EditArea">
        <ShowHeader></ShowHeader>
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
            element.type === 'img' ? Img :
            element.type==='video'?Video:
            element.type==='textarea'?Textarea:''
            "
            :childArray="element.childNode"
            :prop="element.prop"
            ></component>
          </template>
        </Draggable>
      </div>
      <AdjustArea></AdjustArea>
    </div>
  </div>
</template>

<script setup>
import { ref,reactive,toRaw, onMounted } from 'vue';
import Draggable from 'vuedraggable';
import axios from 'axios'

import Btn from './Btn/index.vue';
import Link from './Link/index.vue';
import Textarea from './Textarea/index.vue';
import Img from './Img/index.vue';
import P from './P/index.vue';
import { useStore } from 'vuex';
import ShowHeader from '../ShowHeader/index.vue';
import AdjustArea from '../AdjustArea/index.vue';


  const store = useStore()
  let childArr = ref([]); // 存放节点的一些信息的数组

  
  // 组件拖拽按钮的数组
  let list = ref([
    {
      id:1,
      type: 'p',
      imgSrc: require('@/assets/images/EditPage/文本.png'),
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
      id:2,
      type:'img',
      imgSrc: require('@/assets/images/EditPage/图片.png'),
      prop:{
        src:'',
        alt:"图片加载失败时显示",
        style:{"width":"300px","height":""},
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
      type:'button',  // 指明组件类型,之后可以通过该属性进行判断,然后渲染
      imgSrc: require('@/assets/images/EditPage/按钮.png'),
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
      id:4,
      type:'a',
      imgSrc: require('@/assets/images/EditPage/超链接.png'),
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
      id: 5,
      type: 'textarea',
      imgSrc: require('@/assets/images/EditPage/日历.png'),
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
    }
  ]);
</script>

<style>
  .left_select {
    box-sizing: border-box;
    float: left;
    width: 92px;
    height: 659px;
    padding-top: 103px;
    border-right: 1px solid  #D1D1D1;
  }
  .select_item {
    position: relative;
    text-align: center;
  }
  .select_button {
    margin-top: 7px;
    width: 45px;
    height: 45px;
    border: none;
    background-color: transparent;
  }
  .select_img {
    cursor: pointer; 
    width: 18px;
    height: 18px;
  }
 
  .EditArea {
    float: left;
  }

  .show {
    float: left;
    width: 1017px;
    height: 556px;
    background: #FFFFFF;
  }

  .select ul{
    display: flex;
    
  }
  .select ul li{
    width: 100px;
    height: 35px;
    list-style: none;
  }
  .Leftanimation {
    width: 100px;
    height: 100px;
  }
</style>