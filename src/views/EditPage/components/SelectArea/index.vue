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
    <!-- 拖拽按钮 -->
    <div class="left_select">
      <Draggable class="select_box" :list="list" item-key="id" :group="{ name: 'component', pull: 'clone', put: false }"
        :clone="cloneNew">
        <template #item="{ element }">
          <div class="select_item">
            <button :title="element.title" class="select_button">
              <img class="select_img" :src="element.imgSrc" />
            </button>
          </div>
        </template>
      </Draggable>
    </div>
    <!-- 显示区, -->
    <div class="EditArea">
      <ShowHeader>
        <template v-slot:undo_box>
          <div class="undo_box">
            <div class="undo" title="撤销" @click="undo">&lt;-</div>
          </div>
        </template>
      </ShowHeader>
      <Draggable v-model="childArr" :group="{ name: 'component', pull: true, put: true }" item-key="id" class="show"
        dragClass="ghost">
        <template #item="{ element }">
          <component :is="
            element.type === 'a'
              ? Link
              : element.type === 'button'
                ? Btn
                : element.type === 'p'
                  ? P
                  : element.type === 'img'
                    ? Img
                    : element.type === 'span'
                      ? Span
                      : element.type === 'textarea'
                        ? Textarea
                        : ''
          " :id="element.id" :childArray="element.childNode" :prop="element.prop"></component>
        </template>
      </Draggable>
    </div>
    <AdjustArea></AdjustArea>
  </div>
</template>



<script setup>
import { ref, onMounted, watch, getCurrentInstance } from 'vue';
import service from '@/utils/ApplicationJson';
import Draggable from 'vuedraggable';
import axios from 'axios'
import { useStore } from 'vuex';


import Btn from './Btn/index.vue';
import Link from './Link/index.vue';
import Textarea from './Textarea/index.vue';
import Img from './Img/index.vue';
import P from './P/index.vue';
import Span from './Span/index.vue'

import ShowHeader from '../ShowHeader/index.vue';
import AdjustArea from '../AdjustArea/index.vue';
import { useRoute } from 'vue-router';
import debounce from '@/utils/debounce'

const store = useStore()
const route = useRoute()
// 初始化组件拖拽按钮的数组
let list = store.state.dragInitList;

let childArr = ref([]); // 存放节点的一些信息的数组


onMounted(async () => {
  let res = (await service({ url: '/page/getContent', method: 'post', data: { id: route.query.id } }))
  const { data } = res
  if (data.pageContent !== null) {
    store.commit('setComponentList', { list: data.pageContent })
    childArr.value = store.state.componentList;

    watch(() => JSON.parse(JSON.stringify(childArr.value)), (newVal, oldVal) => {
      store.commit('setComponentList', { list: childArr.value }) // 监视存放数组的变化,变化了就存到store中
      store.dispatch("pushRecord", newVal)

    }, { immediate: false })

  }
})

// let instance = getCurrentInstance()

async function undo() {
  let res = await store.dispatch('undoRecord')

  store.commit('setComponentList', { list: res })
  childArr.value = store.state.componentList;
  // 数据已经更新,但视图没有更新,不知道是什么原因
  console.log(childArr.value);
}


// clone问题的处理函数
function cloneNew(origin) {
  const data = JSON.parse(JSON.stringify(origin))
  data.id = parseInt(new Date().getMilliseconds() + "" + Math.ceil(Math.random() * 100000)).toString(16);
  return data
}
</script>



<style lang="scss">
.Edit_select_area {
  display: flex;
}

.left_select {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 92px;
  height: 843px;
  border-right: 1px solid #d1d1d1;

  .select_box {
    height: 360px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
}

.select_button {
  margin-top: 7px;
  width: 30px;
  height: 30px;
  border: none;
  background-color: transparent;
}

.select_img {
  cursor: pointer;
  width: 18px;
  height: 18px;
}

.show {
  box-sizing: border-box;
  position: relative;
  width: 1536px;
  min-height: 740px;
  // padding: 20px;
  padding-right: 20px; // 防止滚动条遮挡内容
  overflow-y: hidden;
}

.show:hover {
  overflow-y: auto;
}

.select ul {
  display: flex;
}

.select ul li {
  width: 100px;
  height: 35px;
  list-style: none;
}

/* 隐藏拖拽 */
.ghost {
  opacity: 0;
}
</style>