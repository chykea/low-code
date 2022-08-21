<template>
<div>
    <img :src="control.prop.src" :style="control.prop.style" :alt="control.prop.alt" />
    <div>
        <span>图片宽度</span><input type="text" v-model="control.prop.style.width" />
        <span>图片高度</span><input type="text" v-model="control.prop.style.height" />
        <span>图片地址</span><input type="file" @change="changeImg"  accept="image/png, image/jpeg, image/gif, image/jpg"  />
        <span>图片无法显示时的提示文本</span><input type="text" v-model="control.prop.alt" />
    </div>
</div>
</template>
<script setup>
import {defineProps,ref} from 'vue'
const props = defineProps({
    prop:Object,
    childArray:Array
})
let control = ref({
    prop:props.prop,
    childArray:props.childArray
})

function changeImg(e){
    const {target:obj} = e;
    control.prop.src = getObjectURL(obj.files[0]);
}
function getObjectURL(file) {
    var url = null ;
    if (window.createObjectURL!=undefined) { // basic
        url = window.createObjectURL(file) ;
    } else if (window.URL!=undefined) { // mozilla(firefox)
        url = window.URL.createObjectURL(file) ;
    } else if (window.webkitURL!=undefined) { // webkit or chrome
        url = window.webkitURL.createObjectURL(file) ;
    }
    return url ;
}
</script>
<style lang='scss' scoped>
</style>