<template>
    <div id="container">
        <div id="left"></div>
        <div id="middle">
            <div id="top">
                <button id="undo" @click="cancel">撤销</button>
                <button id="record" @click="record">重做</button>
                <!-- <button @click="change">改变某项属性，用于测试撤销重做</button> -->
                <button id="save" @click="save">保存</button>
            </div>
            <div id="ComponentContainer"></div>
        </div>
        <div id="right">
            <!-- 需要判断当前对象是否为空,为空则不传数据 -->
            <div id="edit" v-if="JSON.stringify(curComponent) !== '{}'">
                <Edit :node-data="curComponent" />
            </div>
        </div>
    </div>
</template>
  
<script setup lang="ts">
import { onMounted, toRefs, watch } from 'vue';
import { useMainStore } from '../../pinia/index'
import useSnapshot from '../../pinia/modules/undo'
import debounce from '../../api/debounce.ts'
import uuid from '../../api/uuid.ts'
import getObjByKeyValue from '../../api/getObjByKeyValue.ts'
import setObjValue from '../../api/setObjValue.ts'
import clearProp from '../../api/clearProp'
import Edit from '../../components/Edit/index.vue'




const { initComponentList, ComponentStore, curComponent } = toRefs(useMainStore())
const snapshot = useSnapshot();




onMounted(() => {
    let container = document.getElementById('ComponentContainer') as HTMLElement;
    let left = document.getElementById('left') as HTMLElement;

    // 左侧列表
    let frag = document.createDocumentFragment();
    initComponentList.value = initComponentList.value.map((item: any) => {
        return {
            // 如果在初始化组件数组设置id,之后同一个组件用的都是同一个id,导致数据混淆
            // id: uuid(15, 10), // id是服务器应该带过来的,这里只是为了模拟每个组件数据的唯一性

            isSelected: false, // 为了表示组件是否被选中,需要在初始化组件数据时,通过map将初始组件数据进行修饰
            // 如果服务端已经存放了数据,发送到前端的时候,也要将这个数据进行遍历修饰
            ...item
        }
    })

    // 组件列表渲染
    initComponentList.value.forEach((element: any) => {
        let button = document.createElement('button');
        button.addEventListener('dragstart', (e) => {
            e.dataTransfer?.setData('node', JSON.stringify(element));
        })
        button.setAttribute('draggable', 'true');
        button.innerText += element.tag as string;
        button.className = 'componentBtn';
        frag.appendChild(button);
    });
    left.appendChild(frag);
    // 拖拽添加组件
    container.addEventListener('dragover', (e) => {
        e.preventDefault();
        // console.log(e.target);
    })
    container.addEventListener('drop', (e) => {
        let nodeStr = e.dataTransfer?.getData('node') as string
        if (nodeStr) {
            // 实现容器内的组件也可以拖到画布
            let node = JSON.parse(e.dataTransfer?.getData('node') as string)

            // 实现画布组件数据移动到容器
            if (node.parents) {  // 如果组件有parent的id,
                let parents = null
                for (let i = 0; i < ComponentStore.value.length; i++) {
                    let temp = getObjByKeyValue(node.parents, ComponentStore.value[i])
                    if (temp) {
                        parents = temp;
                        break;
                    }
                }
                parents.children = parents.children.filter((item: any) => {
                    return item.id !== node.id
                })
                node.parents = '' // 容器移动到画布,parents肯定是为空的
                ComponentStore.value.push(node);

            } else if (!node.parents && !node.id) {  // 如果组件没有parent的id,并且画布里面也没有该组件,直接添加 
                let nodeData = {
                    id: uuid(15, 10), // 在添加的时候再给组件添加唯一id
                    ...node,
                    parents: ''
                };
                // 添加
                ComponentStore.value.push(nodeData);
            }
        }
    });

    // 深度监视组件数据
    // 数据变化,重新渲染,并把数据添加到快照中
    watch(() => ComponentStore.value, debounce(() => {

        container.innerHTML = '';
        let frag = document.createDocumentFragment();
        for (let i = 0; i < ComponentStore.value.length; i++) {
            let node = transformConponent(ComponentStore.value[i], ComponentStore.value[i].id)
            frag.appendChild(node)
        }
        container.appendChild(frag);
        // 添加快照
        snapshot.addSnapShot()

    }, 350), { deep: true })

})


// 转换为节点
function transformConponent(vnode: any, key: any): HTMLElement {
    // 创建节点
    let node = document.createElement(vnode.tag) as HTMLElement;
    if (vnode.text !== null) {
        node.innerText = vnode.text;
    }
    node.setAttribute('private_key', key)
    node.setAttribute('draggable', 'true')
    // 绑定事件
    if (vnode.funcType.length > 0 && vnode.funcStr.length > 0) {
        for (let i = 0; i < vnode.funcType.length; i++) {
            let func = new Function('return ' + vnode.funcStr[i]);
            node.addEventListener(vnode.funcType[i], func());
        }
    }

    // div 一般作为容器进行使用,容器可以存放其他节点
    // 单独对div进行处理
    if (vnode.tag === 'div') {
        node.addEventListener('dragover', (e) => {
            e.stopPropagation()
            e.preventDefault();
            let _this = e.target as HTMLElement


            _this.style.outline = 'dashed #aaa';
        })

        node.addEventListener('dragleave', (e) => {
            e.stopPropagation()
            e.preventDefault();
            let _this = e.target as HTMLElement;
            _this.style.outline = '';
        })
        node.addEventListener('drop', (e) => {
            // 容器也要阻止事件冒泡,不然外层容器也会添加数据
            e.stopPropagation();
            if (vnode.isSelected) { // 容器被选中时无法添加
                return
            }

            let nodeStr = e.dataTransfer?.getData('node') as string;
            let _this = e.target as HTMLElement
            // 获取目标的id,即容器id
            let destinationId = _this.getAttribute('private_key') as string;

            if (nodeStr) {
                let childNodeData = JSON.parse(e.dataTransfer?.getData('node') as string)
                if (childNodeData.id === destinationId) { // 如果目标id与获取到的id相同,说明是拖动了div
                    return
                }
                if (!childNodeData.id) { // 如果没有id,说明是从组件栏直接拉到容器
                    childNodeData = {
                        id: uuid(15, 10),
                        ...childNodeData,
                        parents: vnode.id
                    }
                } else if (childNodeData.id && childNodeData.parents.length > 0) { // 如果有id并且parents的id值不为空
                    if (childNodeData.parents !== destinationId) { // 如果子节点的parents 与 目标容器的id 不相同,说明是从一个容器到另一个容器的移动
                        let origin = null  // 存放子节点的原父节点
                        for (let i = 0; i < ComponentStore.value.length; i++) {
                            let temp = getObjByKeyValue(childNodeData.parents, ComponentStore.value[i])
                            if (temp) {
                                origin = temp
                            }
                        }
                        // 移除父节点的该子节点
                        origin.children = origin.children.filter((item: any) => {
                            return item.id !== childNodeData.id
                        })
                    } else {
                        // 子节点的parents 与 目标容器的id 相同,不做处理
                        return
                    }
                } else if (childNodeData.id && childNodeData.parents.length <= 0) {// 如果有id并且parents的id值为空,说明是从画布到一个容器的移动
                    ComponentStore.value = ComponentStore.value.filter((item: any) => {
                        return item.id !== childNodeData.id
                    })
                }
                childNodeData.parents = destinationId
                // 把容器中的节点数据存放到容器数据的children中
                // 由于监听了组件数组,添加进去也是响应式的
                vnode.children.push(childNodeData);
            }
        })
    }

    node.addEventListener('dragstart', (e) => {
        e.stopPropagation()
        e.dataTransfer?.setData('node', JSON.stringify(vnode))
    })



    // 节点的props
    let propsKeys = Object.keys(vnode.props)
    propsKeys.forEach(key => {
        if (typeof vnode.props[key] === 'string') {
            if (vnode.props[key]) {
                key === 'src' ? node.setAttribute(key, new URL(vnode.props[key], import.meta.url).href) : node.setAttribute(key, vnode.props[key])

            }
        } else if (typeof vnode.props[key] === 'object' && vnode.props[key] !== null) {
            let styleProps = vnode.props[key];
            let styleKeys = Object.keys(vnode.props[key])
            if (styleKeys.length > 0) {
                let styleStr = ''
                for (let i = 0; i < styleKeys.length; i++) {
                    if (styleProps[styleKeys[i]]) {
                        styleStr += `${styleKeys[i]}:${styleProps[styleKeys[i]]};`
                    }
                }
                node.setAttribute('style', styleStr);
            }
        }
    });


    // 子节点渲染
    if (vnode.children.length > 0) {
        let frag = document.createDocumentFragment()
        for (let i = 0; i < vnode.children.length; i++) {
            let childNode = transformConponent(vnode.children[i], vnode.children[i].id);

            frag.appendChild(childNode)
        }
        node.appendChild(frag);

    }

    let imgContainer: any = null
    if (vnode.tag === 'img') {
        imgContainer = document.createElement('div');
        imgContainer.style.cssText = `
      display: inline-block;
      background-color: rgb(255, 255, 255);
      box-shadow: none;
      position: relative;
      user-select: none;`
        imgContainer.appendChild(node);
    }
    // 子节点是否被选中
    if (vnode.isSelected) {
        if (vnode.tag !== 'img') {
            node.style.position = 'relative';
            node.appendChild(getFrame(vnode))
        } else {
            imgContainer.appendChild(getFrame(vnode))
        }
    }

    // 获取选中的节点数据
    node.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        let _this = e.target as HTMLElement

        let nodeKey = _this.getAttribute('private_key') as string;
        if (nodeKey) {
            // 通过id获取了组件对应的数据
            let nodeData = null;
            for (let i = 0; i < ComponentStore.value.length; i++) {
                let temp = getObjByKeyValue(nodeKey, ComponentStore.value[i])
                if (temp) {
                    nodeData = temp
                    break;
                }
            }

            // 判断选中的组件数据与当前存放的组件数据是否为同一个
            if (curComponent.value === nodeData) {
                nodeData.isSelected = false
                curComponent.value = {} as any

            } else {
                curComponent.value = nodeData
                for (let i = 0; i < ComponentStore.value.length; i++) {
                    setObjValue(ComponentStore.value[i], 'isSelected', false)
                }
                nodeData.isSelected = true
            }
        } else {
            // 获取不到 元素的id 表示点击到遮罩层,取消所有选中
            for (let i = 0; i < ComponentStore.value.length; i++) {
                setObjValue(ComponentStore.value[i], 'isSelected', false)
            }
            curComponent.value = {} as any
        }
    })


    return vnode.tag === 'img' ? imgContainer : node;
}



// 撤销与重做
function cancel() {
    curComponent.value = {} as any;
    snapshot.undo()
}

function record() {
    snapshot.record()
}

function getFrame(vnode: any) {
    let frame = document.createElement('div')
    frame.style.cssText = `
      pointer-events: none;
      width:100%;
      height:100%;
      position: absolute;
      top:0;
      left:0;
      right:0;
      bottom:0;
      box-shadow: 0 0 5px #4a8af4;
      background-color:transparent;`
    let deleteBtn = document.createElement('span')
    deleteBtn.innerText = 'x'
    deleteBtn.style.cssText = `
      position: absolute;
      pointer-events: auto;
      top: 0;
      right: 0;
      transform: translate(50%,-50%);
      display: inline-block;
      width: 18px;
      height: 18px;
      line-height: 18px;
      text-align: center;
      font-size: 16px;
      font-weight: 200;
      outline: 2px dotted #4a8af4;
      background-color: #fff;
      color: #4a8af4;
      cursor: pointer;
      border-radius: 50%;`

    // 选中删除按钮
    deleteBtn.onclick = (e) => {
        e.stopPropagation()
        let parents = null;

        if (vnode.parents) {
            for (let i = 0; i < ComponentStore.value.length; i++) {
                let temp = getObjByKeyValue(vnode.parents, ComponentStore.value[i])
                if (temp) {
                    parents = temp;
                    break;
                }
            }
            parents.children = parents.children.filter((item: any) => {
                return item.id !== vnode.id
            })
        } else {
            ComponentStore.value = ComponentStore.value.filter((item: any) => {
                return item.id !== vnode.id
            })
        }
        curComponent.value = {} as any
    }
    frame.appendChild(deleteBtn)
    return frame
}

function save() {
    // 去除只在编辑阶段使用的数据属性
    let saveArr = clearProp(JSON.parse(JSON.stringify(ComponentStore.value)), 'isSelected')

    sessionStorage.setItem('componentData', JSON.stringify(saveArr))
}

</script>
  
<style scoped>
#container {
    display: flex;
    height: 100vh;

}

#left {
    flex: 1;
}

#middle {
    flex: 5;
    display: flex;
    flex-direction: column;
}

#middle #ComponentContainer {
    height: 100%;
    background-color: silver;
}

#middle #top {
    height: 50px;
}

#right {
    flex: 1;
    background-color: rgba(190, 187, 187, 0.5);
}

#edit {
    height: 100%;
}
</style>
  