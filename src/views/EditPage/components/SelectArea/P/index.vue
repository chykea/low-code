<template>
<div 
@drag="dragIn"
:style="[control.prop.boxStyle,control.prop.style]"
>
    <Draggable
        :list="control.childArray"
        item-key="id"
        :group="{name:'component',pull:!isChecked,put:!isChecked}" 
        :disabled="isChecked"
        class="pBox"
        :class="[isChecked?'checked':'']"
        @click="isChecked = !isChecked"
        >
        <template #item="{element}">
            <div 
            style="display:inline-block;"
            >
                <component 
                :is="element.type==='a'?Link:
                element.type==='span'?Span:''"
                
                :id="element.id"
                :prop="element.prop"
                :childArray="element.childNode"
                :parentChecked="isChecked"
                ></component>
            </div>
        </template>
    </Draggable>
    <teleport to='#editBox' v-if="isChecked">
        <div>
            <h2>段落设置</h2>
            <div>
                <span>文字排版</span>
                <select v-model="control.prop.boxStyle['text-align']">
                    <option value="">默认</option>
                    <option value="left">居左</option>
                    <option value="center">居中</option>
                    <option value="right">居右</option>
                </select><br/>
                <span>段落宽度</span><input type="text" v-model="control.prop.style.width"><br/>
                <span>段落高度</span><input type="text" v-model="control.prop.style.height"><br/>
                <span>层叠性</span><input type="text" v-model="control.prop.boxStyle['z-index']"><br/>
                <button @click="deleteComponent">移除组件</button>
            </div>
        </div>
    </teleport>
</div>
</template>
<script setup>
import {defineProps,reactive, ref, watch} from 'vue'
import {useStore} from 'vuex'
import Draggable from  'vuedraggable'

import Link from '../Link/index.vue';
import Span from '../Span/index.vue';
import Img from '../Img/index.vue'
import Btn from '../Btn/index.vue'


const store = useStore()
const props = defineProps({
    id:String,
    prop:Object,
    childArray:Array,

})

let control = ref({
    prop:props.prop,
    childArray:props.childArray
})


function dragIn(e){
    const {target} = e;
    const {target:{parentNode}} = e;
    if(isChecked.value){
        let left = e.clientX - parentNode.offsetLeft-(Math.floor(target.offsetWidth/5));
        let top =  e.clientY - parentNode.offsetTop-(Math.floor(target.offsetHeight/4));
        control.value.prop.boxStyle.top = top+'px';
        control.value.prop.boxStyle.left = left+'px';
    }
}

let isChecked = ref(false)
function deleteComponent(){
    store.commit('deleteComponent',{
        id:props.id
    })
}
</script>
<style lang='scss' scoped>
.pBox{
    padding: 10px 5px;
    background-color: #bfa;
}
.checked{
    border: 1px solid red;
}
.ghost{
    opacity: 0;
}
</style>