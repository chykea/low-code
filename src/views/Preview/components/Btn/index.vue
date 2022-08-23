<template>
    <button 
        ref="editBtnRef" 
        :class="[control.prop.className]"  
        :style="[control.prop.style]" 

        >
        {{control.prop.text}}
    </button>

</template>
<script setup>
import {defineProps,onMounted, reactive, ref,} from 'vue'
import {useStore} from 'vuex'


const store = useStore();

// 限定父组件传值
const props = defineProps({
    id:String,
    prop:Object,
    childArray:Array,
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
.check{    
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
</style>