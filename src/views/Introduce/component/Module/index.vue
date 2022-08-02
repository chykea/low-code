<template>
    <div class="introduce-module">
        <div class="introduce-module-box">
            <div class="introduce-module-header">
                <p>丰富多彩的功能，让你制作出精美网页</p>
                <p>Colorful features, let you make a beautiful web page</p>
            </div>
            <div class="introduce-module-list">
                <Item v-for="item in arr" :key="item" :title="item.title" :describe="item.describe" :imgSrc="item.imgSrc" />
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import Item from './Item/index.vue'
let arr = ref(
[{
    title:'素材库',
    describe:'拥有上千素材供你选择，也可以将自己 制作的素材方便以后使用 ',
    imgSrc:require('@/assets/images/introduce/6.png')
},{
    title:'组件',
    describe:'包含了制作网页所需要的所有组件， 轻松做出完整网页',
    imgSrc:require('@/assets/images/introduce/7.png')
},{
    title:'样式',
    describe:'基本样式全包含，不用一个个书写css就 可以调成出你想要的样子',
    imgSrc:require('@/assets/images/introduce/8.png')
},{
    title:'模板库',
    describe:'拥有已经制作好的精美网页模板， 不用排版编写只需修改',
    imgSrc:require('@/assets/images/introduce/9.png')
}])
</script>
<style lang='scss' scoped>
    .introduce-module{
        height: 450px;
        .introduce-module-box{
            width: 1536px;
            margin: 0 auto;
            .introduce-module-header{
                padding: 54px 0;
                text-align: center;
                &>p:nth-child(1){
                    margin-bottom: 12px;
                    font-size: 24px;
                }
            }
            .introduce-module-list{
                display: flex;
                justify-content: space-between;
            }
        }
    }
</style>