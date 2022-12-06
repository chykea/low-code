<template>
    <div class="editbox">
        <div class="styleeidt edit">
            <h4 class="title">形状</h4>
            <div class="core">
                <div>
                    <b>外观</b>
                    <div class="column">
                        <div>
                            <span>W：</span><input class="propsipt" type="text" :value="w" id="width"
                                @change="changeProps(control.props.style, 'width', $event)" />
                            <select id="widthunit" @change="setUnit('width', $event)">
                                <option value="px">px</option>
                                <option value="%">%</option>
                            </select>
                        </div>
                        <div>
                            <span>H：</span><input class="propsipt" type="text" :value="h" id="height"
                                @change="changeProps(control.props.style, 'height', $event)" />
                            <select id="heightunit" @change="setUnit('height', $event)">
                                <option value="px">px</option>
                                <option value="%">%</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="column">
                        <div>
                            <span class="tips">背景颜色</span>
                            <ElColorPicker @change="changeBgColor" show-alpha>
                            </ElColorPicker>
                        </div>
                        <div class="column">
                            <div>
                                <span class="tips">边框颜色</span>
                                <ElColorPicker @change="changeBorderColor"></ElColorPicker>
                                <span class="tips">边框圆角</span>
                                <input type="text" class="propsipt" :value="br"
                                    @change="changeProps(control.props.style, 'border-radius', $event)">
                            </div>
                            <div>
                                <span class="tips">粗细</span>
                                <input type="text" class="propsipt" :value="bw"
                                    @change="changeProps(control.props.style, 'border-width', $event)">
                                <span>类型：</span>
                                <select @change="changeProps(control.props.style, 'border-style', $event)" :value="bs">
                                    <option value="">none</option>
                                    <option value="solid">solid</option>
                                    <option value="dashed">dashed</option>
                                    <option value="dotted">dotted</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="propedit edit">
            <h4 class="title">标签props</h4>
            <div class="core">
                <div>
                    <span>class</span><input class="propsipt" type="text" :value="control.props.class"
                        @change="changeProps(control.props, 'class', $event)" />
                    <span>id</span><input class="propsipt" type="text" :value="control.props.id"
                        @change="changeProps(control.props, 'id', $event)" />
                    <span>title</span><input class="propsipt" type="text" :value="control.props.title"
                        @change="changeProps(control.props, 'title', $event)" />
                </div>
            </div>
        </div>
        <div class="textedit edit">
            <h4 class="title">文本</h4>
            <div class="core">
                <div class="column">
                    <div v-if="(control.text !== null)" class="column">
                        <div>
                            <el-select v-model="fontFamily" @change="changeFontFamily" size="small" class="m-2 font"
                                placeholder="选择字体">
                                <ElOption value="宋体">宋体</ElOption>
                                <ElOption value="微软雅黑">微软雅黑</ElOption>
                                <ElOption value="黑体">黑体</ElOption>
                            </el-select>
                            <ElColorPicker @change="changeColor"></ElColorPicker>
                        </div>
                        <div>
                            <ElSelect v-model="fontSize" @change="changeFontSize" size="small" class="m-2 font">
                                <ElOption value="8">8</ElOption>
                                <ElOption value="10">10</ElOption>
                                <ElOption value="12">12</ElOption>
                                <ElOption value="14">14</ElOption>
                                <ElOption value="16">16</ElOption>
                                <ElOption value="18">18</ElOption>
                                <ElOption value="20">20</ElOption>
                                <ElOption value="22">22</ElOption>
                                <ElOption value="24">24</ElOption>
                            </ElSelect>
                        </div>
                        <div>
                            <span style="margin-right:5px">内容:</span><input class="textipt" type="text"
                                :value="control.text" @change="changeProps(control, 'text', $event)" />
                        </div>
                    </div>

                    <div v-if="control.props.style.display !== 'block'">
                        <span class="tips">对齐方式：</span>
                        <select @change="changeProps(control.props.style, 'vertical-align', $event)"
                            :value="control.props.style['vertical-align']">
                            <option value="baseline">baseline</option>
                            <option value="sub">sub</option>
                            <option value="top">top</option>
                            <option value="middle">middle</option>
                            <option value="bottom">bottom</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
        <div class="imgedit edit" v-if="(control.props.src !== null)">
            <h4 class="title"><span><b>特有|</b>图片</span></h4>
            <div class="core">
                <div class="column">
                    <div>
                        <input id="file" style="display:none" type="file" @change="changeSrc"
                            accept="image/png, image/jpeg, image/gif, image/jpg" />
                        <label for="file">
                            <div class="uploadButton">点击上传</div>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">

import { ref, toRefs, watch } from 'vue'
import { useMainStore } from '../../pinia/index'
import { ElColorPicker, ElMessage, ElSelect, ElOption } from 'element-plus'
import getObjByKeyValue from '../../api/getObjByKeyValue';

const { ComponentStore, curComponent } = toRefs(useMainStore())

const props = defineProps({
    nodeData: Object
})

let control = props.nodeData as any
// 监听父组件传过来的组件数据是否改变
// 实时更新
watch(() => props.nodeData, () => {
    control = props.nodeData
})
// 宽高属性的初始化显示
let pxreg = /(px)|[%]/
let w = control.props.style.width.replace(pxreg, '')
let h = control.props.style.height.replace(pxreg, '')
// 边框
let bw = control.props.style['border-width'].replace(pxreg, '')
let br = control.props.style['border-radius'].replace(pxreg, '')
let bs = control.props.style['border-style']
// 文本字体选择
let fontFamily = ref(control.props.style['font-family'])
let fontSize = ref(control.props.style['font-size'].replace(pxreg, ''))


// 图片预览

function getObjectURL(file: any) {
    var url = null;
    if (window.URL != undefined) { // mozilla(firefox)
        url = window.URL.createObjectURL(file);
    } else if (window.webkitURL != undefined) { // webkit or chrome
        url = window.webkitURL.createObjectURL(file);
    }
    return url;
}


function changeProps(item: any, target: string, e: Event) {
    let _this = e.target as HTMLInputElement
    if (target === 'width' || target === 'height') {
        let _value = parseInt(_this.value)
        if (typeof _value === 'number') {
            let unit = document.getElementById(target + 'unit') as HTMLSelectElement
            setValue(item, target, _value + unit.value)
        } else {
            Message()
        }
    } else if (target === 'border-width' || target === 'border-radius') {
        if (_this.value) {
            let _value = parseInt(_this.value)
            if (typeof _value === 'number') {
                setValue(item, target, _value + 'px')
            } else {
                Message()
            }
        } else {
            _this.value = '0';
            setValue(item, target, 0 + 'px')
        }
    }
    else {
        setValue(item, target, _this.value);
    }
}
function changeSrc(e: Event) {
    let _this = e.target as HTMLInputElement
    let file = _this.files[0]
    control.props['src'] = getObjectURL(file)

}
function changeBgColor(color: any) {
    setValue(control.props.style, 'background-color', color);
}
function changeBorderColor(color: any) {
    setValue(control.props.style, 'border-color', color);
}
function changeFontFamily(font: any) {
    setValue(control.props.style, 'font-family', font);
}
function changeColor(color: any) {
    setValue(control.props.style, 'color', color);
}
function changeFontSize(size: any) {
    setValue(control.props.style, 'font-size', size + 'px');
}


function setUnit(target: string, e: Event) {
    let _this = e.target as HTMLSelectElement
    let _num = document.getElementById(target) as HTMLInputElement

    setValue(control.props.style, target, _num.value + _this.value)
}

function setValue(item: any, target: any, value: any) {
    item[target] = value
}
function Message() {
    ElMessage({
        message: '无效的输入值',
        duration: 1000,
        type: 'error'
    })
}

function clear(e: Event) {
    e.stopPropagation()
    let parents = null;
    if (control.parents) {
        for (let i = 0; i < ComponentStore.value.length; i++) {
            let temp = getObjByKeyValue(control.parents, ComponentStore.value[i])
            if (temp) {
                parents = temp;
                break;
            }
        }
        parents.children = parents.children.filter((item: any) => {
            return item.id !== control.id
        })
    } else {
        ComponentStore.value = ComponentStore.value.filter((item: any) => {
            return item.id !== control.id
        })
    }
    curComponent.value = {} as any

}
</script>
<style scoped>
.editbox {
    display: flex;
    width: 100%;
    flex-direction: column;
}

.edit {
    background-color: #fafafb;
}

.editbox>div {
    border: 1px solid silver;
    border-top: none;
    padding: 10px 0;
}

.editbox h4 {
    margin: 0 20px 15px;
    padding: 0;
    font-size: .875rem;

}

.propsipt {
    border: none;
    border-bottom: 1px black solid;
    background-color: transparent;
    width: 30px;
    outline: none;
    padding: 0 5px;
}

.core {
    width: 12rem;
    font-size: .75rem;
    margin: 0 auto;
}


.core .textipt {
    width: 70%;
    outline: none;
    border: 1px solid #ddd;
    background-color: #fff;
    height: 1.5625rem;
    padding: 0 0.625rem;
}

.core .font {
    width: 65%;
    margin-right: 10px;
    margin-top: 0;
}

.core div {
    display: flex;
    align-items: center;
    margin-top: 10px;
}

.core b {
    margin-right: 15px;
}

.tips {
    margin-right: 0 10px;
}

.column {
    flex-direction: column;

}

.uploadButton {
    display: block !important;
    width: 100px;
    height: 30px;
    background-color: rgb(74, 138, 244);
    color: #fff;
    text-align: center;
    cursor: pointer;
    border-radius: 4px;
    line-height: 30px;
    margin-top: 0 !important;
}
</style>