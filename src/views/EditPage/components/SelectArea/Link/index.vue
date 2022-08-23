<template>
<div
    :style="control.prop.boxStyle"
    @drag="dragIn"
>
    <a 
    :href="control.prop.href||'###'" 
    :style="control.prop.style"
    @click.stop.prevent="isCheckedFunc"
    :class="[isChecked?'checked':'']"
    >{{control.prop.text}}</a>

    
    <teleport to='#editBox' v-if="isChecked">
        <h4>超链接编辑</h4>
        <div>
            <span>文本</span><input class="inputStyle" type="text" v-model="control.prop.text"><br/>
            <span>路径</span><input class="inputStyle" type="text" v-model="control.prop.href"><br/>
            <span>字体颜色</span>&nbsp;&nbsp;<el-color-picker v-model="control.prop.style.color"></el-color-picker><br/>
            <span>字体大小</span><input class="inputStyle four" type="text" v-model="control.prop.style['font-size']"><br/>
            <span>字体权重</span><input class="inputStyle four" type="text" v-model="control.prop.style['font-weight']"><br/>
            <div class="handleSelect">
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
            </div>
            <div class="handleSelect">
                <span>文本修饰</span>
                <select v-model="control.prop.style['text-decoration']">
                    <option value="">无</option>
                    <option value="underline">默认</option>
                    <option value="underline">文本下的线</option>
                    <option value="overline">文本上的线</option>
                    <option value="line-through">删除线</option>
                    <option value="blink">闪烁的文本</option>
                </select>
            </div>
            <span>层叠性</span><input class="inputStyle zIndex" type="text" v-model="control.prop.boxStyle['z-index']"><br/>
            <button class="btnStyle deleteDom" @click="deleteComponent">删除组件</button>
        </div>
    </teleport>
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
    parentChecked:Boolean
})
let control = ref({
    prop:props.prop,
    childArray:props.childArray
})


let isChecked = ref(false)
function isCheckedFunc(){
    if(props.parentChecked){
        return
    }
    isChecked.value = !isChecked.value
}
watch(()=>props.parentChecked,(newVal)=>{
    if(newVal)
        isChecked.value = false
})
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
            let left = e.clientX - parentNode.offsetLeft-(Math.floor(target.offsetWidth/2));
            let top =  e.clientY - parentNode.offsetTop-(Math.floor(target.offsetHeight/2));
            // 拖拽区域限制
            if((left>=-1 && top>=-1)&&(left<=(parentNode.offsetWidth-target.offsetWidth)&&top<=(parentNode.offsetHeight-target.offsetHeight))){ 
                control.value.prop.boxStyle.top = top+'px';
                control.value.prop.boxStyle.left = left+'px';
            }else{
                return
            }
        }
    }
}

function deleteComponent(){
    store.commit('deleteComponent',{
        id:props.id
    })
}
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