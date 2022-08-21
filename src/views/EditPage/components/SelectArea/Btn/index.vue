<template>
<div>
    <button ref="editBtnRef" :class="control.prop.className"  :style="[control.prop.style]">{{control.prop.text}}</button>
    <div>
        <span>按钮宽度</span><input type="text" v-model="control.prop.style.width" />
        <span>按钮高度</span><input type="text" v-model="control.prop.style.height" />
        <span>按钮文本</span><input type="text" v-model="control.prop.text">
        <span>按钮文本颜色</span><input type="text" v-model="control.prop.style.color" />
        <span>按钮类名</span><input type="text" v-model="control.prop.className" />
        <!-- 添加事件 -->
        <select v-model="control.prop.Listener">
            <option value="">无</option>
            <option value="click">鼠标点击</option>
            <option value="mouseover">鼠标经过</option>
            <option value="mouseup">鼠标弹起</option>
        </select>
        <textarea v-model="control.prop.funcStr" cols="30" rows="10"></textarea>
        <button @click="sureCodeBtn">编辑完成</button>
    </div>
    <div class="showBox">
        <div class="showHtml">
            <pre><code>{{nodeStr}}</code></pre>
        </div>
        <div class="showCss">
            <div v-if="control.prop.className===''">
                <pre><code>button{{control.prop.style}}</code></pre>
            </div>
            <div v-else>
                <pre><code>.{{control.prop.className}}{{control.prop.style}}</code></pre>
            </div>
        </div>
        <div class="showJs">
            <!-- 代码预览 -->
            <div v-if="control.prop.className===''">
                <pre><code>let btn = document.querySelector('button')</code></pre>
                <div v-if="control.prop.func!==null">
                    <pre><code>{{control.prop.func}}</code><br/><code>btn.addEventListener('{{control.prop.Listener}}',{{funcName}})</code></pre>
                </div>
            </div>
            <div v-else>
                <pre><code>let btn = document.querySelector('.{{control.prop.className}}')</code></pre>
                <div v-if="control.prop.func!==null">
                    <pre><code>{{control.prop.func}}</code><br/><code>btn.addEventListener('{{control.prop.Listener}}',{{funcName}})</code></pre>
                </div>        
            </div>
        </div>
    </div>
    <!-- <button @click="submitComponent">组件编辑完成</button> -->
</div>
</template>
<script setup>
import {defineProps,onMounted, reactive, ref,watch} from 'vue'
// import {useStore} from 'vuex'

// 限定父组件传值
const props = defineProps({
    prop:Object,
    childArray:Array
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
    if(control.prop.funcStr!==''){
        let newfunc = new Function('return '+control.prop.funcStr); 
        let func = newfunc()
        control.prop.func = func;
        funcName.value = fun_name(func)
    }
})

watch(()=>control.prop.Listener,(newVal,oldVal)=>{
    // 监听 Listener 的变化,如果变化,就移除旧事件,添加新事件
    editBtn.removeEventListener(oldVal,control.prop.func)
    editBtn.addEventListener(newVal,control.prop.func);
})


// 在页面展示该节点
let nodeStr = ref(`<button class="${control.prop.className}">${control.prop.text}</button>`);
watch(()=>control.prop.className,(newVal)=>{
    // 监听类名是否变化,变化了就把新的类名赋给按钮
    nodeStr.value = `<button class="${newVal}">${control.prop.text}</button>`;
})
watch(()=>control.prop.text,(newVal)=>{
    // 监听文本内容是否变化,变化了就把文本内容赋给按钮
    nodeStr.value = `<button class="${control.prop.className}">${newVal}</button>`;
})

watch(()=>control.prop.func,(newVal,oldVal)=>{
    // 按钮函数为null时,将监听器设为空字符串
    if(newVal===null){
        control.prop.Listener='';
    }
    editBtn.removeEventListener(control.prop.Listener,oldVal); // 监听函数变化
    editBtn.addEventListener(control.prop.Listener,newVal);
})

let funcName = ref('');  // 用于保存函数名字

// 将页面编辑的函数进行创建,然后给
function sureCodeBtn(){
    if(control.prop.funcStr!==''){
        try {
            let newfunc = new Function('return '+control.prop.funcStr); // 通过new Function来构建一个函数
            let func = newfunc()  // 由于上面构造的函数需要通过return才能得到,所以需要调用一下才能获得函数
            // if(typeof func==='function'){  // 判断返回的是否是function类型
            control.prop.func = func
            funcName.value = fun_name(func)
            // }
        } catch (error) {
            console.log('您输入的并不是一个函数');
        }  
    }else{
        if(control.prop.func!==null){
            editBtn.removeEventListener(control.prop.Listener,control.prop.func)
            control.prop.func = null;
        }
    }
}

// 获取函数名
function fun_name(func){
    return func.toString().match(/function\s*([^(]*)\(/)[1]
}


// 将编辑后的组件放到store中,通过App组件发送给后端
// const store = useStore();
// function submitComponent(){
//     store.commit('setNodeArray',{Node:JSON.parse(JSON.stringify(control))})
// }



</script>
<style lang='scss'>
.showBox{
    width: 500px;
    height: 900px;
    position: absolute;
    top: 0px;
    left: 1200px;
    border: 1px solid silver;   
    .showHtml{
        background-color: slategray;
        height: 300px;
    }
    .showCss{
        background-color: salmon;
        height: 300px;
    }
    .showJs{
        height: 300px;
        background-color: silver;
    } 
}
</style>