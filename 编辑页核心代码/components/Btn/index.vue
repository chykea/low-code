<template>
<div>
    <button ref="editBtnRef" :class="control.className"  :style="[control.style]">{{control.text}}</button>
    <div>
        <span>按钮宽度</span><input type="text" v-model="control.style.width" />
        <span>按钮高度</span><input type="text" v-model="control.style.height" />
        <span>按钮文本</span><input type="text" v-model="control.text">
        <span>按钮文本颜色</span><input type="text" v-model="control.style.color" />
        <span>按钮类名</span><input type="text" v-model="control.className" />
        <!-- 添加事件 -->
        <select v-model="control.Listener">
            <option value="click">鼠标点击</option>
            <option value="mouseover">鼠标经过</option>
            <option value="mouseup">鼠标弹起</option>
        </select>
    </div>
    <div class="showBox">
        <div class="showHtml">
            <pre><code>{{nodeStr}}</code></pre>
        </div>
        <div class="showCss">
            <div v-if="control.className===''">
                <pre><code>button{{control.style}}</code></pre>
            </div>
            <div v-else>
                <pre><code>.{{control.className}}{{control.style}}</code></pre>
            </div>
        </div>
        <div class="showJs">
            <div v-if="control.className===''">
                <pre><code>let btn = document.querySelector('button')</code></pre>
                <pre><code>btn.addEventListener('{{control.Listener}}',{{control.func}})</code></pre> 
            </div>
            <div v-else>
                <pre><code>let btn = document.querySelector('.{{control.className}}')</code></pre>
                <pre><code>btn.addEventListener('{{control.Listener}}',{{control.func}})</code></pre>
            </div>
        </div>
    </div>
</div>
</template>
<script setup>
import {defineProps,onMounted, reactive, ref,watch,watchEffect} from 'vue'

// 限定父组件传值
const props = defineProps({
    text:String,
    style:Object,
    func:Function,
    Listener:String,
    className:String
})

// 接收props中的值, 用于双向绑定,实时修改组件的属性
let control = reactive({
    style: props.style,
    text: props.text,
    Listener:props.Listener,
    func:props.func,
    className:props.className
})
let editBtnRef = ref(null)
let editBtn = null;
let nodeStr = ref(`<button class="${control.className}">${control.text}</button>`);
// 不通过手动在 button 标签添加事件
onMounted(() => {
    // 在该组件挂载的时候,添加事件
    editBtn = editBtnRef._value;
    editBtn.addEventListener(control.Listener,control.func);
})

watch(()=>control.Listener,(newVal,oldVal)=>{
    // 监听 Listener 的变化,如果变化,就移除旧事件,添加新事件
    editBtn.removeEventListener(oldVal,control.func)
    editBtn.addEventListener(newVal,control.func);
})

watch(()=>control.className,(newVal)=>{
    // 监听类名是否变化,变化了就把新的类名赋给按钮
    nodeStr.value = `<button class="${newVal}">${control.text}</button>`;
})

watch(()=>control.text,(newVal)=>{
    // 监听文本内容是否变化,变化了就把文本内容赋给按钮
    nodeStr.value = `<button class="${control.className}">${newVal}</button>`;
})


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