<template>
<div>
    <img :src="control.src" :style="control.style" :alt="control.alt" />
    <div>
        <span>图片宽度</span><input type="text" v-model="control.style.width" />
        <span>图片高度</span><input type="text" v-model="control.style.height" />
        <span>图片地址</span><input type="text" v-model="control.src" />
        <span>图片无法显示时的提示文本</span><input type="text" v-model="control.alt" />
    </div>
</div>
</template>
<script setup>
import {defineProps,reactive} from 'vue'
const props = defineProps({
    src:String,
    alt:String,
    style:Object
})
let control = reactive({
    src:props.src,
    alt:props.alt,
    style:props.style
})
function  getValue(e){
    // control.src = require(getObjectURL(e.target.files[0]))
}
function getObjectURL(file) {
	let url = null ;
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