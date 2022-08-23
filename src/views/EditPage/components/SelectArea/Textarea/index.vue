<template>
<div 
    :style="control.prop.boxStyle"
    @dragstart="dragStart"
    @drag="dragIn"
    @dragend="dragEnd"
    @click="isChecked = !isChecked"
    :class="[isChecked?'checked':'default']"
>
    <textarea 
    :style="control.prop.style"
    v-model="control.prop.text"
    >{{control.prop.text}}</textarea>
    <teleport to='#editBox' v-if="isChecked" >
        <keep-alive>
            <div>
                <h4>文本框编辑</h4>
                <div>
                    <span>文本</span><input class="inputStyle" type="text" v-model="control.prop.text"><br/>
                    <span>颜色</span><input class="inputStyle" type="text" v-model="control.prop.style.color" /><br/>
                    <span>层叠性</span><input class="inputStyle zIndex" type="text" v-model="control.prop.boxStyle['z-index']"><br/>
                </div>
                <button class="btnStyle deleteDom" @click="deleteComponent">删除组件</button>
            </div>
        </keep-alive>
    </teleport>
</div>    
</template>
<script setup>
import {defineProps, ref} from 'vue'
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

// 拖拽定位
function dragIn(e){
    if(isChecked.value){
        const {target} = e;
        const {target:{parentNode}} = e;
        let top = e.clientY - parentNode.offsetTop-(Math.floor(target.offsetHeight/2))
        let left = e.clientX - parentNode.offsetLeft-(Math.floor(target.offsetWidth/2))
        // 限制禁止跳出展示区
        if((left>=0 && top>=0)&&(left<=(parentNode.offsetWidth-target.offsetWidth)&&top<=(parentNode.offsetHeight-target.offsetHeight))){
            control.value.prop.boxStyle.top = top +'px';
            control.value.prop.boxStyle.left = left+'px';
        }
    }
}
// 选中才可以移动
let isChecked = ref(false);

function deleteComponent(){
    store.commit('deleteComponent',{
        id:props.id
    })
}

</script>
<style lang='scss' scoped>
.checked{
    border: 2px solid red;
}
textarea{
    border: none;
    // resize: none;
}
.default{
    border: 1px solid black;
}
#editBox .zIndex {
    width: 142px;
}
</style>