<template>
<div>
    <button @click="func" :style="[control.style]">{{control.text}}</button>
    <div>
        <span>按钮宽度</span><input type="text" v-model="control.style.width">
        <span>按钮高度</span><input type="text" v-model="control.style.height">
        <span>按钮文本</span><input type="text" v-model="control.text">
        <span>按钮文本颜色</span><input type="text" v-model="control.style.color" />
        
    </div>
</div>
</template>
<script setup>
import {defineProps, ref} from 'vue'

// 限定父组件传值
const props = defineProps({
    text:String,
    style:Object,
    func:Function
})

// 接收props中的值, 用于双向绑定,实时修改组件的属性
let control = ref({
    style: props.style,
    text: props.text,
    // func:props.func
})
</script>
<style lang='scss' scoped>
button{
    // color: v-bind;
}
</style>