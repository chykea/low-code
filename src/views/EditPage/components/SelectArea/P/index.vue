<template>
    <div @drag="dragIn" @dragstart="dragStart" :style="[control.prop.boxStyle,control.prop.style]"
        :class="[isChecked?'checked':'']" class="bg-#bfa">
        <Draggable :list="control.childArray" item-key="id" :group="{name:'component',pull:!isChecked,put:!isChecked}"
            :disabled="isChecked" class="pBox" @click="isChecked = !isChecked">
            <template #item="{element}">
                <div style="display:inline-block;">
                    <component :is="element.type==='a'?Link:
                    element.type==='span'?Span:''" :id="element.id" :prop="element.prop"
                        :childArray="element.childNode" :parentChecked="isChecked"></component>
                </div>
            </template>
        </Draggable>
        <teleport to='#editBox' v-if="isChecked">
            <div>
                <h4>段落设置</h4>
                <div>
                    <div class="handleSelect">
                        <span>文字排版</span>
                        <select v-model="control.prop.boxStyle['text-align']">
                            <option value="">默认</option>
                            <option value="left">居左</option>
                            <option value="center">居中</option>
                            <option value="right">居右</option>
                        </select>
                    </div>
                    <span>宽度</span><input class="inputStyle" type="text" v-model="control.prop.style.width"><br />
                    <span>高度</span><input class="inputStyle" type="text" v-model="control.prop.style.height"><br />
                    <span>背景颜色</span>
                    <el-color-picker v-model="control.prop.boxStyle['background-color']"></el-color-picker><br />
                    <span>层叠性</span><input class="inputStyle zIndex" type="text"
                        v-model="control.prop.boxStyle['z-index']"><br />
                    <button class="btnStyle deleteDom" @click="deleteComponent">移除组件</button>
                </div>
            </div>
        </teleport>
    </div>
</template>
<script setup>
import { defineProps, reactive, ref, watch } from 'vue'
import { useStore } from 'vuex'
import Draggable from 'vuedraggable'

import Link from '../Link/index.vue';
import Span from '../Span/index.vue';



const store = useStore()
const props = defineProps({
    id: String,
    prop: Object,
    childArray: Array,
})
console.log(JSON.parse(JSON.stringify(props.prop)));
console.log(JSON.parse(JSON.stringify(props.childArray)));

let control = ref({
    prop: props.prop,
    childArray: props.childArray
})
let initX = ref(null)
let initY = ref(null)
function dragStart(e) {
    if (isChecked.value) {
        const { target: { parentNode } } = e

        initX = e.offsetX + parentNode.offsetLeft
        initY = e.offsetY + parentNode.offsetTop
    }
}

function dragIn(e) {
    const { target } = e;
    const { target: { parentNode } } = e;
    if (isChecked.value) {
        let left = e.clientX - initX;
        let top = e.clientY - initY;
        // 拖拽区域限制
        if ((left >= -1 && top >= -1) && (left <= (parentNode.offsetWidth - target.offsetWidth - 1) && top <= (parentNode.offsetHeight - target.offsetHeight))) {
            control.value.prop.boxStyle.top = top + 'px';
            control.value.prop.boxStyle.left = left + 'px';
        } else {
            return
        }
    }
}

let isChecked = ref(false)
function deleteComponent() {
    store.commit('deleteComponent', {
        id: props.id
    })
}
</script>
<style lang='scss' scoped>
#editBox {
    font-size: 14px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 0 20px;
}

.pBox {
    padding: 10px 5px;
}

.checked {
    border: 1px solid red;
}

.ghost {
    opacity: 0;
}

#editBox .zIndex {
    width: 142px;
}
</style>