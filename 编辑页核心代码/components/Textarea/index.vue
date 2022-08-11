<template>
<div>
    <textarea :style="control.style">{{control.text}}</textarea>
    <div>
        <span>文本框文本</span><input type="text" v-model="control.text">
        <span>文本框文本颜色</span><input type="text" v-model="control.style.color" />
    </div>
</div>
</template>
<script setup>
import {defineProps, ref} from 'vue'
const props = defineProps({
    text:String,
    style:Object,
})
let control = ref({
    text:props.text,
    style:props.style
})
</script>
<style lang='scss' scoped>
</style>