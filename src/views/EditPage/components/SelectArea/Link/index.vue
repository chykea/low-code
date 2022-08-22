<template>
    <a :href="control.prop.href||'###'" :style="control.prop.style">{{control.prop.text}}</a>
    <!-- <div>
        <span>超链接文本</span><input type="text" v-model="control.prop.text">
        <span>超链接文本颜色</span><input type="text" v-model="control.prop.style.color" />
        <span>超链接link</span><input type="text" v-model="control.prop.href">
    </div> -->
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
