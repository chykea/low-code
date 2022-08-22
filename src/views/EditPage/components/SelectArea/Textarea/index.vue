<template>
<div>
    <textarea :style="control.prop.style">{{control.prop.text}}</textarea>
    <div>
        <span>文本框文本</span><input type="text" v-model="control.prop.text">
        <span>文本框文本颜色</span><input type="text" v-model="control.prop.style.color" />
    </div>
</div>
</template>
<script setup>
import {defineProps, ref} from 'vue'
const props = defineProps({
    prop:Object,
    childArray:Array
})
let control = ref({
    prop:props.prop,
    childArray:props.childArray
})
</script>
<style lang='scss' scoped>
</style>