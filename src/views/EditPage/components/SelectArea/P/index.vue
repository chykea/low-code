<template>
<div :style="control.prop.boxStyle">
    
    <Draggable
        :list="control.childArray"
        item-key="id"
        :group="{name:'component',pull:true}"

    >
        <!-- <template v-for="item in control.childArray" :key="item">
            <Link  v-if="item.type==='a'" :prop="item.prop" :childArray="item.childNode" />
            <Span  v-if="item.type==='span'" :prop="item.prop" :childArray="item.childNode" />
        </template> -->
        <template #item="{element}">
            <component 
            :is="element.type==='a'?Link:
            element.type==='span'?Span:''"
            :prop="element.prop"
            :childArray="element.childNode"
            ></component>
        </template>

    </Draggable>

    
</div>
</template>
<script setup>
import {defineProps,reactive, ref} from 'vue'
import Draggable from  'vuedraggable'

import Link from '../Link/index.vue';
import Span from './Span/index.vue';

const props = defineProps({
    prop:Object,
    childArray:Array
})

let control = reactive({
    prop:props.prop,
    childArray:props.childArray
})

</script>
<style lang='scss' scoped>
</style>