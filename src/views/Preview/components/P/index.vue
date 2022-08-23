<template>
<div 
:style="[control.prop.boxStyle,control.prop.style]"
>
    <template v-for="item in control.childArray" :key="item">
        <div 
        style="display:inline-block;"
        >
            <component 
            :is="item.type==='a'?Link:
            item.type==='span'?Span:''"
            
            :id="item.id"
            :prop="item.prop"
            :childArray="item.childNode"
            ></component>
        </div>
    </template>
</div>
</template>
<script setup>
import {defineProps,reactive, ref, watch} from 'vue'

import Link from '../Link/index.vue';
import Span from '../Span/index.vue';


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