<template>
    <button 
        ref="editBtnRef" 
        :class="[control.prop.className]"  
        :style="[control.prop.style]" 
        @click="isCheckedFunc"
        @mousedown="startMove"
        @mouseup="endMove"
        >
        {{control.prop.text}}
        <div v-if="isChecked" :class="[isChecked?'check':'','btnEdit']" ></div>
    </button>
    <!-- 将按钮编辑的部分送到 AdjustArea 组件中的 editBox 去展示 -->
    <teleport to='#editBox' v-if="isChecked" >
        <keep-alive>
            <div>
                <h2>按钮编辑</h2>
                <span>按钮宽度</span><input type="text" v-model="control.prop.style.width" /><br/>
                <span>按钮高度</span><input type="text" v-model="control.prop.style.height" /><br/>
                <span>按钮文本</span><input type="text" v-model="control.prop.text"><br/>
                <span>按钮文本颜色</span><input type="text" v-model="control.prop.style.color" /><br/>
                <span>按钮类名</span><input type="text" v-model="control.prop.className" /><br/>
                <!-- 添加事件 -->
                <span>事件选择</span><select v-model="control.prop.Listener">
                    <option value="">无</option>
                    <option value="click">鼠标点击</option>
                    <option value="mouseover">鼠标经过</option>
                    <option value="mouseup">鼠标弹起</option>
                </select>
                <br/>
                <textarea v-model="control.prop.funcStr" cols="30" rows="10"></textarea>
                <br/>
                <button @click="sureCodeBtn">函数编辑完成</button>
                <button @click="deleteComponent">删除组件</button>
            </div>
        </keep-alive>
    </teleport>
</template>
<script setup>
import {defineProps,onMounted, reactive, ref,watch} from 'vue'
import {useStore} from 'vuex'

const store = useStore();

// 限定父组件传值
const props = defineProps({
    id:String,
    prop:Object,
    childArray:Array,
    dataDraggable:Boolean
})

// 接收props中的值, 用于双向绑定,实时修改组件的属性
let control = reactive({
    prop:props.prop,
    childArray:props.childArray
})
let editBtnRef = ref(null)
let editBtn = null;

// 不通过手动在 button 标签添加事件
onMounted(() => {
    // 在该组件挂载的时候,添加事件
    editBtn = editBtnRef._value;
    if(control.prop.funcStr!==''){  // 初始化 组件的函数字符串如果不为空就生成函数
        let newfunc = new Function('return '+control.prop.funcStr); 
        let func = newfunc()
        control.prop.func = func;
    }
})

watch(()=>control.prop.Listener,(newVal,oldVal)=>{
    // 监听 Listener 的变化,如果变化,就移除旧事件,添加新事件
    editBtn.removeEventListener(oldVal,control.prop.func)
    editBtn.addEventListener(newVal,control.prop.func);
})

// 按钮函数为null时,将监听器设为空字符串
watch(()=>control.prop.func,(newVal,oldVal)=>{
    if(newVal===null){
        control.prop.Listener='';
    }
    editBtn.removeEventListener(control.prop.Listener,oldVal); // 监听函数变化
    editBtn.addEventListener(control.prop.Listener,newVal);
})

// 将页面编辑的函数进行创建,然后给
function sureCodeBtn(){
    // 进行了函数编辑,函数字符串不为空
    if(control.prop.funcStr!==''){
        try { // 通过try catch 来捕获添加的是否是一个函数
            let newfunc = new Function('return '+control.prop.funcStr); // 通过new Function来构建一个函数
            let func = newfunc()  // 由于上面构造的函数需要通过return才能得到,所以需要调用一下才能获得函数
            control.prop.func = func
        } catch (error) {
            console.log('您输入的并不是一个函数');
            control.prop.funcStr=''
        }  
    }else{ // 函数字符串为空时,表示不想添加事件
        if(control.prop.func!==null){ // 按钮上面如果有事件,移除事件 
            editBtn.removeEventListener(control.prop.Listener,control.prop.func)
            control.prop.func = null; // 并把按钮添加的函数清空
        }
    }
}
// 用于捕获函数体的执行结果
window.onerror=(msg,url,line)=>{
    console.log('输入的内容有误',msg);
    // 返回true表示不在f12显示错误信息
    return true;
}


// 表示是否选中按钮
let isChecked = ref(false)
// 用于区分点击事件和鼠标事件
let startTime,endTime;
let startMoveFlag = false;
function isCheckedFunc(){
    // 鼠标按下和弹起事件小于150毫秒,为点击事件
    if(endTime-startTime<=150){
        isChecked.value = !isChecked.value;
    }
}

// 移动按钮
function startMove(e){
    startTime = new Date().getTime()
    if(isChecked.value){ // 选中了按钮之后才能操作 
        startMoveFlag = true;
        editBtn.addEventListener('mousemove',Moving);
    }
}
function Moving(e){
    if(startMoveFlag){
        const {target} = e;
        const {target:{parentNode}} = e
        let left = e.clientX - parentNode.offsetLeft -(Math.floor(target.offsetWidth/2))
        let top = e.clientY - parentNode.offsetTop -(Math.floor(target.offsetHeight/2))
        // 限定组件只能在展示区中拖拽
        if((left>=-1 && top>=-1)&&(left<=(parentNode.offsetWidth-target.offsetWidth)&&top<=(parentNode.offsetHeight-target.offsetHeight))){
            control.prop.style.left = (left) +'px'
            control.prop.style.top = (top) +'px'
        }
        else{
            return
        }
    }
}
function endMove(e){
    endTime = new Date().getTime()
    if(isChecked.value){
        startMoveFlag = false;
        editBtn.removeEventListener('mousemove',Moving)
    }
}


function deleteComponent(){
    store.commit('deleteComponent',{
        id:props.id
    })
}
</script>
<style lang='scss'>
.btnEdit{
    position: absolute;
    width: 104%;
    height: 105%;
    z-index: -1;
    top: -3px;
    left: -4px;
}
.check{    
    border: 2px solid red;
}
</style>