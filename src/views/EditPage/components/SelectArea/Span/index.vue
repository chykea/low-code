<template>
<div 
    :style="control.prop.boxStyle"
    @drag="dragIn"
    >
    <span 
        :style="control.prop.style" 
        :class="[isChecked?'SpanChecked':'','editspan']" 
        @click.stop="isCheckedFunc"
        >{{control.prop.text}}</span>

<teleport to='#editBox' v-if="isChecked">
    <div>
        <h2>段落文本编辑</h2>
        <span>段落文本</span><input type="text" v-model="control.prop.text"><br/>
        <span>段落文本颜色</span><input type="text" v-model="control.prop.style.color" /><br/>
        <select v-model="control.prop.style['vertical-align']">
            <option value="">无</option>
            <option value="baseline">基线</option>
            <option value="bottom">底部</option>
            <option value="middle">居中</option>
            <option value="text-bottom">文字底部</option>
            <option value="text-top">文字顶部</option>
            <option value="top">顶部</option>
            <!-- <option value="sub"></option> -->
            <!-- <option value="super"></option> -->
        </select><br/>
        <span>层叠性</span><input type="text" v-model="control.prop.boxStyle['z-index']">
        <br/>
        <button @click=" deleteComponent">删除组件</button>
    </div>
</teleport>
</div>
</template>
<script setup>
import {defineProps,ref,watch} from 'vue'
import {useStore} from 'vuex'
import Draggable from 'vuedraggable'
const store = useStore()
const props = defineProps({
    id:String,
    prop:Object,
    childArray:Array,
    parentChecked:Boolean
})
let control = ref({
    prop:props.prop,
    childArray:props.childArray
})

let isChecked = ref(false)
function isCheckedFunc(){
    if(props.parentChecked){
        return
    }
    isChecked.value = !isChecked.value
}
watch(()=>props.parentChecked,(newVal)=>{
    if(newVal)
        isChecked.value = false
})

function dragIn(e){
    const {target} = e;
    const {target:{parentNode}} = e;
    if(isChecked.value){
        if(parentNode.className!=='show'){
            control.value.prop.boxStyle.position = 'relative';
            control.value.prop.boxStyle.top = 0;
            control.value.prop.boxStyle.left = 0;
        }else{
            control.value.prop.boxStyle.position = 'absolute';
            control.value.prop.boxStyle.top = e.clientY - parentNode.offsetTop-(Math.floor(target.offsetHeight/2))+'px';
            control.value.prop.boxStyle.left = e.clientX - parentNode.offsetLeft-(Math.floor(target.offsetWidth/2))+'px';
        }
    }
}
function deleteComponent(){
    store.commit('deleteComponent',{
        id:props.id
    })
}
</script>
<style lang='scss' scoped>
.editspan{
    cursor: pointer;
}
.SpanChecked{
    border: 1px red solid;
}
</style>