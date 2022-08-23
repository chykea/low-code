import { createStore } from 'vuex'
import { getAdvator } from '@/api/getAdvator';
export default createStore({
    state() {
        return {
            token: '', // 用于保存后端返回的token
            imgadvatar: '', //获取头像地址
            dragInitList: [ // 拖拽组件列表  初始化数组
                {
                    id: 1,
                    type: 'button', // 指明组件类型,之后可以通过该属性进行判断,然后渲染
                    title: '按钮',
                    imgSrc: require('@/assets/images/EditPage/按钮.png'),
                    prop: {
                        text: '默认文本', // 默认文本,
                        style: { // 默认样式
                            "color": "red",
                            "width": '100px', // 按钮宽度
                            "height": "35px", // 按钮高度
                            "position": 'absolute',
                            "top": '0',
                            "left": '0',
                            'z-index': '0',
                            "color": "", // 字体颜色
                            "background-color": "", // 背景颜色
                            'font-size': '14px', // 字体大小
                            "font-weight": '', // 字体权重
                            'border-width': '', // 边框宽度
                            'border-style': '', // 边框样式
                            'border-color': '' // 边框颜色
                        },
                        func: null,
                        Listener: '',
                        className: '',
                        funcStr: '',
                        boxStyle: {
                        },
                    },
                    childNode: [],
                },
                {
                    id: 2,
                    type: 'textarea',
                    imgSrc: require('@/assets/images/EditPage/日历.png'),
                    title: '文本域',
                    prop: {
                        text: '默认文本',
                        style: {
                            "color": "orange",
                            'font-size': '14px', // 字体大小
                            "font-weight": '', // 字体权重
                            'outline': 'none', // 文本框边框
                        },
                        func: null,
                        Listener: '',
                        className: '',
                        funcStr: '',
                        boxStyle: {
                            'position': 'absolute',
                            'top': '0',
                            'left': '0',
                            'z-index': '0'
                        },
                    },
                    childNode: []
                },
                {
                    id: 3,
                    type: 'a',
                    imgSrc: require('@/assets/images/EditPage/超链接.png'),
                    title: '超链接',
                    prop: {
                        text: '默认文本',
                        style: {
                            "color": "orange",
                            'vertical-align': '',
                            'text-decoration': '',
                            "background-color": "",
                            'font-size': '14px',
                            "font-weight": '',
                        },
                        func: null,
                        Listener: '',
                        className: '',
                        funcStr: '',
                        boxStyle: {
                            'position': 'relative',
                            'top': '0',
                            'left': '0',
                            'display': 'inline-block',
                            'z-index': '0'
                        },
                        // href:''
                    },
                    childNode: []
                },
                {
                    id: 4,
                    type: 'p',
                    imgSrc: require('@/assets/images/EditPage/文本.png'),
                    title: '段落',
                    prop: {
                        text: '',
                        style: {
                            'width': '',
                            'height': ''
                        },
                        func: null,
                        Listener: '',
                        className: '',
                        funcStr: '',
                        boxStyle: {
                            'display': 'block',
                            'text-align': '',
                            'position': 'absolute',
                            'top': '0',
                            'left': '0',
                            'z-index': '0'
                        },
                    },
                    childNode: [{
                        id: 6,
                        type: 'span',
                        prop: {
                            text: '段落的子组件2',
                            style: {
                                "color": "orange",
                                "background-color": "",
                                'font-size': '14px',
                                "font-weight": '',
                            },
                            func: null,
                            Listener: '',
                            className: '',
                            funcStr: '',
                            boxStyle: {
                                'position': 'relative',
                                'top': '0',
                                'left': '0',
                                'z-index': '0',
                                'display': 'inline-block'
                            },
                        },
                        childNode: []
                    }, ],
                },
                {
                    id: 5,
                    type: 'img',
                    imgSrc: require('@/assets/images/EditPage/图片.png'),
                    title: '图片',
                    prop: {
                        src: 'https://pic4.zhimg.com/v2-0858a53c94b5d77cad4dd8889a3d5bb6_r.jpg',
                        alt: "图片加载失败时显示",
                        style: {
                            "width": "300px",
                            "height": "",
                            'vertical-align': '',
                        },
                        func: null,
                        Listener: '',
                        className: '',
                        funcStr: '',
                        boxStyle: {
                            'position': 'absolute',
                            'top': '0',
                            'left': '0',
                            'z-index': '0'
                        },
                    },
                    childNode: []
                },
                {
                    id: 6,
                    type: 'span',
                    imgSrc: require('@/assets/images/EditPage/下拉按钮.png'),
                    title: '文本',
                    prop: {
                        text: '段落的子组件2',
                        style: {
                            "color": "orange",
                            "background-color": "",
                            'font-size': '14px',
                            "font-weight": '',
                        },
                        func: null,
                        Listener: '',
                        className: '',
                        funcStr: '',
                        boxStyle: {
                            'position': 'relative',
                            'top': '0',
                            'left': '0',
                            'display': 'inline-block',
                            'z-index': '0',
                        },
                    },
                    childNode: []
                },
            ],
            componentList: [], // 用于存放拖拽组件后的数组,将数据发送给后端
        }
    },
    getters: {},
    mutations: {
        setToken(state, context) { // 存放token
            state.token = context.token;
        },
        setAdvatar(state, result) { // 存放头像
            state.imgadvatar = result;
            console.log(state.imgadvatar);
        },


        deleteComponent(state, content) { //  删除组件
            state.componentList = state.componentList.filter((item) => {
                return item.id !== content.id
            })
        },
        setComponentList(state, content) { // 添加组件
            state.componentList = content.list
        }

    },
    actions: {
        // 获取头像
        advatar(context) {
            getAdvator("/UserInfo/getAdvator").then((res) => {
                console.log(res);
                if (res.code == 200) {
                    const result = "http://" + res.advator;
                    context.commit('setAdvatar', result);
                }
            });
        }
    },
    modules: {}
})