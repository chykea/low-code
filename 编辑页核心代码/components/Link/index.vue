<template>
<div>
    <a :href="control.href||'###'" :style="control.style">{{control.text}}</a>
    <div>
        <span>超链接文本</span><input type="text" v-model="control.text">
        <span>超链接文本颜色</span><input type="text" v-model="control.style.color" />
        <span>超链接link</span><input type="text" v-model="control.href">
    </div>
</div>
</template>
<script setup>
import {defineProps, ref} from 'vue'
const props = defineProps({
    href:String,
    text:String,
    style:Object,
})
let control = ref({
    href:props.href,
    text:props.text,
    style:props.style
})
</script>
