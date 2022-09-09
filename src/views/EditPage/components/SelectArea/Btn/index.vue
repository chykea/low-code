<template>
    <button 
        ref="editBtnRef" 
        :class="[control.prop.className]"  
        :style="[control.prop.style]" 
        
        @dragstart="dragstart"
        @drag="dragIn"
        @dragend="dragend"
        draggable="true"
        >
        {{control.prop.text}}
        <div v-if="isChecked" :class="[isChecked?'check':'','btnEdit']" ></div>
    </button>
    <!-- 将按钮编辑的部分送到 AdjustArea 组件中的 editBox 去展示 -->
    <teleport to='#editBox' v-if="isChecked" >
        <keep-alive>
            <div class="outBorder">
                <h4>按钮编辑</h4>
                <span>宽度</span><input class="inputStyle" type="text" v-model="control.prop.style.width" /><br/>
                <span>高度</span><input class="inputStyle" type="text" v-model="control.prop.style.height" /><br/>
                <span>背景颜色</span>&nbsp;&nbsp;<el-color-picker v-model="control.prop.style['background-color']"></el-color-picker><br/>
                <span>边框宽度</span><input class="inputStyle four" type="text" v-model="control.prop.style['border-width']"><br/>
                <!-- dotted solid double dashed -->
                <div class="handleSelect">
                    <span>边框样式</span>
                    <select v-model="control.prop.style['border-style']">
                        <option value="">无</option>
                        <option value="solid">实线</option>
                        <option value="dashed">虚线</option>
                        <option value="dotted">点状</option>
                        <option value="double">双实线</option>
                    </select>
                </div>
                <span>边框颜色</span>&nbsp;&nbsp;<el-color-picker v-model="control.prop.style['border-color']"></el-color-picker><br/>
                <span>文本</span><input class="inputStyle" type="text" v-model="control.prop.text"><br/>
                <span>字体大小</span><input class="inputStyle four" type="text" v-model="control.prop.style['font-size']"><br/>
                <span>字体权重</span><input class="inputStyle four" type="text" v-model="control.prop.style['font-weight']"><br/>
                <span>字体颜色</span>&nbsp;&nbsp;<el-color-picker v-model="control.prop.style.color"></el-color-picker><br/>
                <span>层叠性</span><input class="inputStyle zIndex" type="text" v-model="control.prop.boxStyle['z-index']"><br/>
                <span>类名</span><input class="inputStyle" type="text" v-model="control.prop.className" /><br/>
                <!-- 添加事件 -->
                <div class="handleSelect">
                    <span>事件选择</span>
                    <select v-model="control.prop.Listener">
                        <option value="">无</option>
                        <option value="click">鼠标点击</option>
                        <option value="mouseover">鼠标经过</option>
                        <option value="mouseup">鼠标弹起</option>
                    </select>
                </div>
                <textarea v-model="control.prop.funcStr" cols="30" rows="10"></textarea>
                <br/>
                <button class="btnStyle" @click="sureCodeBtn">函数编辑完成</button>
                <button class="btnStyle deleteDom" @click="deleteComponent">移除组件</button>
            </div>
        </keep-alive>
    </teleport>
</template>
<script setup>
import { ElMessage } from 'element-plus';
import {defineProps,onMounted, reactive, ref,watch} from 'vue'
import {useStore} from 'vuex'


const store = useStore();

let color = ref('');
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
            ElMessage({
                message:'编辑成功',
                type:'success'
            })
        } catch (error) {
            console.log('');
            ElMessage({
                message:'您输入的并不是一个函数',
                type:'error'
            })
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

function isCheckedFunc(){
    isChecked.value = !isChecked.value;    
}



let initX = ref(null)
let initY = ref(null)
function dragstart(e){
    if(isChecked.value){
        const {target:{parentNode}} = e

        initX = e.offsetX + parentNode.offsetLeft
        initY = e.offsetY + parentNode.offsetTop
    }
}

function dragIn(e){
    if(isChecked.value){
        control.prop.style.left = e.clientX -initX  +'px'
        control.prop.style.top = e.clientY -initY +'px'
    }
}

function dragend(e){
    if(isChecked.value){
        control.prop.style.left = e.clientX - initX+'px'
        control.prop.style.top = e.clientY - initY+'px'
    }
}
function deleteComponent(){
    store.commit('deleteComponent',{
        id:props.id
    })
}
</script>
<style lang='scss'>
#editBox {
    font-size: 14px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 0 20px;
}
.btnEdit{
    position: absolute;
    width: 104%;
    height: 105%;
    z-index: -1;
    top: -3px;
    left: -4px;
}
.checked{
    border: 2px solid red;
}
h4 {
    font-size: 18px;
    padding: 20px 0 8px 0;
}
.handleSelect {
    padding: 8px 0;
    font-weight: 400;
}
select {
    width: 132px;
    height: 26px;
    padding-left: 10px;
    margin-left:8px;
    background: #F3F3F3;
    border-radius: 5px;
    border: none;
    outline: none;
}
.inputStyle{
    width: 154px;
    height: 26px;
    padding-left: 10px;
    margin: 8px 0 8px 8px;
    background: #F3F3F3;
    border-radius: 5px;
    border: none;
    outline: none;
}
textarea{
    box-sizing: border-box;
    width: 206px;
    padding: 8px;
    margin: 8px 0;
    border: 1px solid rgb(0, 0, 0, .75);
    outline: none;
    text-overflow: ellipsis;
    resize: none;
    border-radius: 5px;
  }
textarea::-webkit-scrollbar {
    height: 0;
    width: 0;
    color: transparent;
  }
.btnStyle{
    display: inline-block;
    height: 26px;
    padding: 0 18px;
    background: #ffffff;
    border-radius: 7px;
    border: none;
    outline: none;
    cursor: pointer;
    box-shadow: 0px 2px 21px 0px rgb(158 158 158 / 16%);
}
.deleteDom {
    display: block;
    margin: 25px 0 48px 53px;
    font-size: 16px;
    color: #aaaaaa;
    background-color: transparent;
    box-shadow: none;
}
.deleteDom:hover {
    text-decoration: underline;
}

#editBox .zIndex {
    width: 142px;
}

.four {
    width: 135px;
}

</style>