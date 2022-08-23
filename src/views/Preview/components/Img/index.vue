<template>
    <div 
    :style="control.prop.boxStyle"
    >
        <img :src="control.prop.src" :style="control.prop.style" :alt="control.prop.alt"  />
    </div>
</template>
<script setup>
import {defineProps,ref,watch} from 'vue'
import {useStore} from 'vuex'
import service  from '@/utils/request'
const store = useStore();
const props = defineProps({
    id:String,
    prop:Object,
    childArray:Array,
})
let control = ref({
    prop:props.prop,
    childArray:props.childArray,
})


</script>
<style lang='scss' scoped>

</style>