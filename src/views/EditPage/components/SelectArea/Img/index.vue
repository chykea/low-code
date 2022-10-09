<template>
    <div :style="control.prop.boxStyle" @dragstart="dragStart" @drag="dragIn" :class="[isChecked?'checked':'']">
        <img :src="control.prop.src" :style="control.prop.style" :alt="control.prop.alt"
            @click="isChecked = !isChecked" />
        <teleport to='#editBox' v-if="isChecked">
            <div class="eidtbox">
                <h4>图片编辑</h4>
                <div>
                    <span>宽度</span><input class="inputStyle" type="text" v-model="control.prop.style.width" /><br />
                    <span>高度</span><input class="inputStyle" type="text" v-model="control.prop.style.height" /><br />
                    <span>地址</span>
                    <input class="fileInput" type="file" @change="changeImg"
                        accept="image/png, image/jpeg, image/gif, image/jpg" />
                    <input class="btnStyle subFile" type="button" value="上传文件" @click="clickFile" />
                    <br />
                    <span>无法显示时的提示文本</span><input class="inputStyle noMarginLeft" type="text"
                        v-model="control.prop.alt" /><br />
                    <span>背景颜色</span>&nbsp;&nbsp;<el-color-picker v-model="control.prop.style['background-color']">
                    </el-color-picker><br />
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
                    <span>层叠性</span><input class="inputStyle zIndex" type="text"
                        v-model="control.prop.boxStyle['z-index']"><br />
                    <button class="btnStyle deleteDom" @click="deleteComponent">移除组件</button>
                </div>
            </div>
        </teleport>
    </div>
</template>
<script setup>
import { defineProps, ref, watch } from 'vue'
import { useStore } from 'vuex'
import service from '@/utils/request'
const store = useStore();
const props = defineProps({
    id: String,
    prop: Object,
    childArray: Array,
})
let control = ref({
    prop: props.prop,
    childArray: props.childArray,
})
console.log(props.id);

let isChecked = ref(false)

// 实时预览图片
function changeImg(e) {
    const { target: obj } = e;
    service({
        url: '/page/uploadImg',
        method: 'post',
        data: { file: obj.files[0] }
    }).then(res => {
        console.log()
        control.value.prop.src = res.path;
    }).catch(err => {

    })
}

// 通过拼接处图片的url地址实现预览
function getObjectURL(file) {
    var url = null;
    if (window.createObjectURL != undefined) { // basic
        url = window.createObjectURL(file);
    } else if (window.URL != undefined) { // mozilla(firefox)
        url = window.URL.createObjectURL(file);
    } else if (window.webkitURL != undefined) { // webkit or chrome
        url = window.webkitURL.createObjectURL(file);
    }
    return url;
}

let initX = ref(null)
let initY = ref(null)
function dragStart(e) {
    if (isChecked.value) {
        const { target: { parentNode } } = e

        initX = e.offsetX + parentNode.offsetLeft
        initY = e.offsetY + parentNode.offsetTop
    }
}
// 拖拽定位
function dragIn(e) {
    const { target } = e;
    const { target: { parentNode } } = e;
    if (isChecked.value) {
        if (parentNode.className !== 'show') {
            control.value.prop.boxStyle.position = 'relative';
            control.value.prop.boxStyle.top = 0;
            control.value.prop.boxStyle.left = 0;
        } else {
            control.value.prop.boxStyle.position = 'absolute';
            let left = e.clientX - initX;
            let top = e.clientY - initY;
            // 拖拽区域限制
            if ((left >= -1 && top >= -1) && (left <= (parentNode.offsetWidth - target.offsetWidth) && top <= (parentNode.offsetHeight - target.offsetHeight))) {
                control.value.prop.boxStyle.top = top + 'px';
                control.value.prop.boxStyle.left = left + 'px';
            } else {
                return
            }
        }
    }
}

function deleteComponent() {
    store.commit('deleteComponent', {
        id: props.id
    })
}
// 点击按钮提交文件
function clickFile() {
    const input = document.querySelector('.fileInput')
    input.click()
}

</script>
<style lang='scss' scoped>
.checked {
    border: 1px solid red;
}

.fileInput {
    display: none;
}

.subFile {
    margin: 8px 0 8px 10px;
}

.noMarginLeft {
    margin-left: 0;
}

#editBox .zIndex {
    width: 142px;
}
</style>