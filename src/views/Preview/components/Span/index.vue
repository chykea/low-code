<template>
<div 
    :style="control.prop.boxStyle"
    >
    <span 
        :style="control.prop.style" 
        >{{control.prop.text}}</span>

</div>
</template>
<script setup>
import {defineProps,ref} from 'vue'

const props = defineProps({
    id:String,
    prop:Object,
    childArray:Array,
})
let control = ref({
    prop:props.prop,
    childArray:props.childArray
})

</script>
<style lang='scss' scoped>

</style>