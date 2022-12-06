import { defineStore } from 'pinia'

type VNode = {
    id?: String,
    tag?: String,
    text: String | null,
    data?: Object,
    props?: Object,
    children?: Array<VNode>,
    funcStr?: Array<String>,
    funcType?: Array<String>,
    isSelected?: boolean,
    parents?: String
}
type Container = {

}

let componentArray: Array<VNode> = [
    {
        tag: 'div',
        text: "默认div",
        props: {
            style: {
                "width": '300px',
                "height": '300px',
                "color": '',
                "display": 'block',
                "background-color": "",
                "border-width": '0px',
                "border-style": '',
                "border-color": '',
                "border-radius": '0px',
                "vertical-align": null,
                "user-select": "none",
                "font-family": "微软雅黑",
                "font-size": "14px",

            },
            title: '1',
            class: '1',
            id: '555',
            "src": null
        },
        funcStr: [''],
        funcType: [''],
        children: [],
        parents: ''
    },
    {
        tag: 'p',
        text: "默认p标签",
        props: {
            style: {
                "width": '100px',
                "height": '50px',
                "color": '',
                "display": '',
                "background-color": "",
                "border-width": '0px',
                "border-style": '',
                "border-color": '',
                "border-radius": '0px',
                "vertical-align": null,
                "user-select": "none",
                "font-family": "微软雅黑",
                "font-size": "14px",
            },
            title: '',
            class: '',
            id: '',
            "src": null
        },
        funcStr: [],
        funcType: [],
        children: [],
        parents: ''
    },
    {
        tag: 'span',
        text: "行内块span",
        props: {
            style: {
                "width": '100px',
                "height": '50px',
                "color": '#bfa',
                "display": 'inline-block',
                "background-color": "",
                "border-width": '0px',
                "border-style": '',
                "border-color": '',
                "border-radius": '0px',
                "vertical-align": null,
                "user-select": "none",
                "font-family": "微软雅黑",
                "font-size": "14px",

            },
            title: '',
            class: '',
            id: '',
            "src": null
        },
        funcStr: [],
        funcType: [],
        children: [],
        parents: ''
    },
    {
        tag: 'img',
        text: null,
        props: {
            style: {
                "width": '',
                "height": '',
                "color": '',
                "display": '',
                "background-color": "",
                "border-width": '0px',
                "border-style": '',
                "border-color": '',
                "border-radius": '0px',
                "object-fit": 'scale-down',
                "vertical-align": "baseline",
                "user-select": "none",
                "font-family": "",
                "font-size": "14px",

            },
            title: '',
            class: '',
            id: '',
            src: './assets/default.png'
        },
        funcStr: [],
        funcType: [],
        children: [],
        parents: ''
    },
]

export const useMainStore = defineStore('main', {
    state: () => {
        return {
            initComponentList: [...componentArray],
            ComponentStore: [] as Array<VNode>,
            curComponent: {} as VNode
        }
    },
    getters: {

    },
    actions: {}
})