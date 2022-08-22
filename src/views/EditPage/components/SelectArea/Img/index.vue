<template>
    <div 
    :style="control.prop.boxStyle"
    @drag="dragIn"
    :class="[isChecked?'checked':'']"
    >
        <img :src="control.prop.src" :style="control.prop.style" :alt="control.prop.alt" @click="isChecked = !isChecked" />
        <teleport to='#editBox' v-if="isChecked">
            <div class="eidtbox">
                <h2>图片编辑</h2>
                <div>
                    <span>图片宽度</span><input type="text" v-model="control.prop.style.width" /><br/>
                    <span>图片高度</span><input type="text" v-model="control.prop.style.height" /><br/>
                    <span>图片地址</span><input type="file" @change="changeImg"  accept="image/png, image/jpeg, image/gif, image/jpg"  /><br/>
                    <span>图片无法显示时的提示文本</span><input type="text" v-model="control.prop.alt" /><br/>
                    <span>对齐方式</span>
                    <select v-model="control.prop.style['vertical-align']">
                        <option value="">无</option>
                        <option value="baseline">基线</option>
                        <option value="bottom">底部</option>
                        <option value="middle">居中</option>
                        <option value="text-bottom">文字底部</option>
                        <option value="text-top">文字顶部</option>
                        <option value="top">顶部</option>
                        <!-- <option value="sub"></option> -->
                        <!-- <option value="super"></option> -->
                    </select>
                    <br/>
                    <button @click="deleteComponent">移除组件</button>
                </div>
            </div>
        </teleport>
    </div>
</template>
<script setup>
import {defineProps,ref,watch} from 'vue'
import {useStore} from 'vuex'
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
console.log(props.id);

let isChecked = ref(false)

// 实时预览图片
function changeImg(e){
    const {target:obj} = e;
    control.value.prop.src= getObjectURL(obj.files[0]);
}

// 通过拼接处图片的url地址实现预览
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

// 拖拽定位
function dragIn(e){
    const {target} = e;
    const {target:{parentNode}} = e;
    if(isChecked.value){
        if(parentNode.className!=='show'){
            control.value.prop.boxStyle.position = 'relative';
            control.value.prop.boxStyle.top = 0;
            control.value.prop.boxStyle.left = 0;
        }else{
            control.value.prop.boxStyle.position = 'absolute';
            control.value.prop.boxStyle.top = e.clientY - parentNode.offsetTop-(Math.floor(target.offsetHeight/2))+'px';
            control.value.prop.boxStyle.left = e.clientX - parentNode.offsetLeft-(Math.floor(target.offsetWidth/2))+'px';
        }
    }
}

function deleteComponent(){
    store.commit('deleteComponent',{
        id:props.id
    })
}
</script>
<style lang='scss' scoped>
.eidtbox{
    border-bottom: 2px solid silver;
}
.checked{
    border: 1px solid red;
}
</style>