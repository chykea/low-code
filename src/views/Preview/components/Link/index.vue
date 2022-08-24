<template>
<div
    :style="control.prop.boxStyle"
>
    <a 
    :href="control.prop.href||'###'" 
    :style="control.prop.style"
    >{{control.prop.text}}</a>

</div>
</template>
<script setup>
import {watch, defineProps, ref} from 'vue'
import {useStore} from 'vuex'
const store = useStore()
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
<style lang="scss">
#editBox {
    font-size: 14px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 0 20px;
}
.checked{
    border: 1px solid red;
}
#editBox .zIndex {
    width: 142px;
}
</style>