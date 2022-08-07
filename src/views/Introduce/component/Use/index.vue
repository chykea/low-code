<template>
<div class="introduce-use">
    <Header>
        <template v-slot:user_login>
            <LoginBtn/>
        </template>
    </Header>
    <div class="introduce-use-container">
        <slot name="container"></slot>
        <div class="introduce-use-imgbg">
            <ImgItem v-for="item in imglist" :key="item" :imgSrc="item.imgSrc" :left="item.left" :top="item.top" :zIndex="item.zIndex"/>
        </div>
    </div>
</div>
</template>
<script setup>
import { ref } from 'vue';
import Header from './component/Header/index.vue'
import ImgItem from './component/ImgItem.vue';
import LoginBtn from './component/LoginBtn.vue'

     
    let imglist = ref([{
        imgSrc:require('@/assets/images/introduce/0.png'), // 通过数组遍历来引入图片,但不能直接是地址,需要用require来引入图片地址
        left:'567px', // 这些都是静态资源,为了不一个个手动引入,就直接弄成数组来 遍历渲染出来
        top:'190px',
        zIndex:'0'
    },{
        imgSrc:require('@/assets/images/introduce/1.png'),
        left:'0',
        top:'0',
        zIndex:'0'
    },
    {
        imgSrc:require('@/assets/images/introduce/2.png'),
        left:'512px',
        top:'501px',
        zIndex:'0'
    },{
        imgSrc:require('@/assets/images/introduce/3.png'),
        left:'128px',
        top:'227px',
        zIndex:'0'
    },{
        imgSrc:require('@/assets/images/introduce/4.png'),
        left:'45px',
        top:'50px',
        zIndex:'-1'
    },{
        imgSrc:require('@/assets/images/introduce/5.png'),
        left:'212px',
        top:'285px',
        zIndex:'-1'
    }
    ])
</script>
<style lang='scss' scoped>
        
        .introduce-use{
            width: 1536px;
            margin: 0 auto;
            height: 936px;
            // 内容
            .introduce-use-container{
                position: relative;
                height: 836px;
                // background-color: #333;
                .introduce-use-imgbg{
                    position: absolute;
                    top: 31px;
                    left: 700px;
                    width: 735px;
                    height: 560px;
                }
            }
        }
</style>