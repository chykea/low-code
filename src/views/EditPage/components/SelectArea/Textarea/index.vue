<template>
    <div :style="control.prop.boxStyle" @dragstart="dragStart" @drag="dragIn" @dragend="dragEnd"
        @click="isChecked = !isChecked" :class="[isChecked ? 'checked' : 'default']">
        <textarea :style="control.prop.style" v-model="text">{{ control.prop.text }}</textarea>
        <teleport to='#editBox' v-if="isChecked">
            <keep-alive>
                <div>
                    <h4>文本框编辑</h4>
                    <div>
                        <span>宽度</span><input class="inputStyle" type="text"
                            v-model.number="control.prop.style.cssWidthNum" /><br />
                        <span>宽度单位</span><select v-model="control.prop.style.cssWidthUnit">
                            <option value="px">px</option>
                            <option value="em">em</option>
                            <option value="rem">rem</option>
                            <option value="vw">vw</option>
                            <option value="vh">vh</option>
                        </select><br />
                        <span>高度</span><input class="inputStyle" type="text"
                            v-model.number="control.prop.style.cssHeightNum" /><br />
                        <span>宽度单位</span><select v-model="control.prop.style.cssHeightUnit">
                            <option value="px">px</option>
                            <option value="em">em</option>
                            <option value="rem">rem</option>
                            <option value="vw">vw</option>
                            <option value="vh">vh</option>
                        </select><br />
                        <span>边框宽度</span><input class="inputStyle four" type="text"
                            v-model="control.prop.style['border-width']"><br />
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
                        <span>边框颜色</span>&nbsp;&nbsp;<el-color-picker v-model="control.prop.style['border-color']">
                        </el-color-picker><br />
                        <span>文本</span><input class="inputStyle" type="text" v-model="text"><br />
                        <span>字体大小</span><input class="inputStyle four" type="text"
                            v-model="control.prop.style['font-size']"><br />
                        <span>字体权重</span><input class="inputStyle four" type="text"
                            v-model="control.prop.style['font-weight']"><br />
                        <span>字体颜色</span>&nbsp;&nbsp;<el-color-picker v-model="control.prop.style.color">
                        </el-color-picker><br />
                        <span>层叠性</span><input class="inputStyle zIndex" type="text"
                            v-model="control.prop.boxStyle['z-index']"><br />
                    </div>
                    <button class="btnStyle deleteDom" @click="deleteComponent">删除组件</button>
                </div>
            </keep-alive>
        </teleport>
    </div>
</template>
<script setup>
import { defineProps, ref, watch, watchEffect, computed } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const props = defineProps({
    id: String,
    prop: Object,
    childArray: Array,
})
let control = ref({
    prop: props.prop,
    childArray: props.childArray
})
// 将数值和单位分离开

// 过滤浏览器标签
// let text = ref(changeStr(control.value.prop.text))
let text = ref(control.value.prop.text)
// 将转义字符转换为实际字符
function changeStr(str) {
    // str = str.replaceAll(/[(&lt;)]/g, "<;")
    // str = str.replaceAll(/[(&gt;)]/g, ">")
    // console.log(str);
    return str;
}
watchEffect(() => {
    // 拼接样式大小,
    control.value.prop.style.width = control.value.prop.style.cssWidthNum + control.value.prop.style.cssWidthUnit;
    control.value.prop.style.height = control.value.prop.style.cssHeightNum + control.value.prop.style.cssHeightUnit;


    control.value.prop.text = text.value.replaceAll(/[<]/g, "&lt;")
    control.value.prop.text = text.value.replaceAll(/[>]/g, "&gt;")

    // console.log(control.value);
})





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
    if (isChecked.value) {
        const { target } = e;
        const { target: { parentNode } } = e;
        let top = e.clientY - initY;
        let left = e.clientX - initX;
        // 限制禁止跳出展示区
        if ((left >= 0 && top >= 0) && (left <= (parentNode.offsetWidth - target.offsetWidth) && top <= (parentNode.offsetHeight - target.offsetHeight))) {
            control.value.prop.boxStyle.top = top + 'px';
            control.value.prop.boxStyle.left = left + 'px';
        }
    }
}
// 选中才可以移动
let isChecked = ref(false);

function deleteComponent() {
    store.commit('deleteComponent', {
        id: props.id
    })
}

</script>
<style lang='scss' scoped>
textarea {
    // border: none;
    resize: none;
}

#editBox .zIndex {
    width: 142px;
}
</style>