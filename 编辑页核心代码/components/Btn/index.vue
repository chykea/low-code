<template>
<div>
    <button ref="editBtnRef"  :style="[control.style]">{{control.text}}</button>
    <div>
        <span>按钮宽度</span><input type="text" v-model="control.style.width">
        <span>按钮高度</span><input type="text" v-model="control.style.height">
        <span>按钮文本</span><input type="text" v-model="control.text">
        <span>按钮文本颜色</span><input type="text" v-model="control.style.color" />
        <!-- 添加事件 -->
        <select v-model="control.Listener">
            <option value="click">鼠标点击</option>
            <option value="mouseover">鼠标经过</option>
            <option value="mouseup">鼠标弹起</option>
        </select>
    </div>
</div>
</template>
<script setup>
import {defineProps,onMounted, reactive, ref,watch} from 'vue'

// 限定父组件传值
const props = defineProps({
    text:String,
    style:Object,
    func:Function,
    Listener:String
})

// 接收props中的值, 用于双向绑定,实时修改组件的属性
let control = reactive({
    style: props.style,
    text: props.text,
    Listener:props.Listener,
    func:props.func
})
let editBtnRef = ref(null)
let editBtn = null;
// 不通过手动在 button 标签添加事件
onMounted(() => {
    // 在该组件挂载的时候,添加事件
    editBtn = editBtnRef._value;
    editBtn.addEventListener(control.Listener,control.func);
})
watch(()=>control.Listener,(newVal,oldVal)=>{
    // 监听 Listener 的变化,如果变化,就移除旧事件,添加新事件
    editBtn.removeEventListener(oldVal,control.func)
    editBtn.addEventListener(newVal,control.func);
})

</script>
<style lang='scss' scoped>

</style>