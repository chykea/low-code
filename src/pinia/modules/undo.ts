import { defineStore } from 'pinia'
import { useMainStore } from '../index'




export default defineStore('snapshot', {
    state: () => {
        return {
            snapshotData: [] as any, // 快照数据
            maxStep: 30,  // 最大存储快照数量
            curIndex: -1, // 当前所在下标
            isSnapShot: true
        }
    },
    actions: {
        // 添加快照
        addSnapShot() {
            // 撤销/重做的时候,如果没有现在,也会导致组件数据变化
            // 如果没有
            // 监听器也会把撤销/重做的数据给放到快照中
            const { ComponentStore } = useMainStore()
            if (this.isSnapShot) {
                let n = this.snapshotData.length;
                // 当前索引不在尾部,说明进行了撤销,需要删除后面元素
                if (this.curIndex < n - 1) {
                    this.snapshotData.splice(this.curIndex + 1)
                }

                this.snapshotData.push(JSON.stringify(ComponentStore))
                this.curIndex++
            }
            this.isSnapShot = true
        },
        // 判断是否溢出
        isFull() {
            if (this.snapshotData.length == this.maxStep) {
                this.snapshotData.shift(0); // 剔除第一个快照,即最旧的快照
            }
        },
        // undo撤销
        undo() {
            const { ComponentStore } = useMainStore()
            if (this.curIndex > 0) {
                this.isSnapShot = false;
                let t = JSON.parse(this.snapshotData[--this.curIndex]);
                for (let i = 0; i < t.length; i++) {
                    ComponentStore[i] = t[i];
                }
                ComponentStore.splice(t.length)
            }
        },
        // record 恢复
        record() {
            const { ComponentStore } = useMainStore()
            // 判断是不是到尾部，有才可以恢复 
            if (this.curIndex < this.snapshotData.length - 1) {
                this.isSnapShot = false;
                let t = JSON.parse(this.snapshotData[++this.curIndex]);
                for (let i = 0; i < t.length; i++) {
                    ComponentStore[i] = t[i];
                }
                // ComponentStore.splice(t.length)
            }
        }

    }
})