// import { diff } from 'json-diff'
export const undoRecord = {
    namespace: true,
    state: {
        undoList: [],
        maxStep: 100,
        curIndex: 0
    },
    mutations: {
        push_recode(state, data) { // 添加一条记录
            state.undoList.push(data)
            state.curIndex = state.undoList.length - 1;
        },
        limit_record(state) { // 当历史记录超过最大限制,去除最旧一条
            if (state.undoList.length > state.maxStep) {
                state.undoList.shift()
            }
        },
        remove_record(state) { // 当用户撤销的时候，在某个节点停住，重新开始修改，新的操作历史进来之前，需要将当前撤销步骤后面所有的历史清除
            state.undoList.splice(state.curIndex + 1, state.undoList.length)
        },
        // 前进
        next_record(state) {
            state.curIndex += 1;
            console.log(state.curIndex);
        },
        // 后退
        pre_record(state) {
            state.curIndex -= 1;
        }
    },
    actions: {
        pushRecord({ commit, state }, data) {
            if (!(JSON.stringify(data) === JSON.stringify(state.undoList[state.curIndex]))) {
                if (state.curIndex !== state.undoList.length - 1) {
                    commit('remove_record');
                }
                commit('push_recode', data);
                commit('limit_record');
            }
        },
        redoRecord({ commit, state }) {
            return new Promise((resolve) => {
                if (state.curIndex < state.undoList.length - 1) {
                    commit('next_record');
                }
                // deepClone是封装好了深度复制对象的方法，可以用JSON.parse(JSON.stringify())替换
                resolve(JSON.parse(JSON.stringify(state.undoList[state.curIndex])));
            });
        },
        undoRecord({ commit, state }) {
            if (state.undoList.length < 0) { return }
            return new Promise((resolve) => {
                if (state.curIndex > 0) {
                    commit('pre_record');
                }
                resolve(JSON.parse(JSON.stringify(state.undoList[state.curIndex])));
            });
        }


    }

}