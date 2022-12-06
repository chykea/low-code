// shims-vue.d.ts   src目录下
declare module '*.vue' {
    import { defineComponent } from 'vue';

    const Component: ReturnType<typeof defineComponent>;
    export default Component;
}
declare module '*'

// declare module 'router' 
