<template>
<div class="introduce-use">
    <div class="introduce-use-header-box">
        <Header>
        <template v-slot:user_login>
            <LoginBtn v-if="!token"/>
            <el-avatar :size="45" :src="imgUser"  />
        </template>
    </Header>
    </div>
    <div class="introduce-use-container">
        <slot name="container"></slot>
        <div class="introduce-use-imgbg">
            <ImgItem v-for="item in imglist" :key="item" :imgSrc="item.imgSrc" :left="item.left" :top="item.top" :zIndex="item.zIndex"/>
        </div>
    </div>
</div>
</template>
<script setup>
import { ref,onMounted } from 'vue';
import Header from './component/Header/index.vue'
import ImgItem from './component/ImgItem/index.vue';
import LoginBtn from './component/LoginBtn/index.vue' 
import {getAdvator} from '@/api/getAdvator'

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
let token = ref('')
let imgUser = ref('')
onMounted(() => {
    token.value = sessionStorage.getItem('token')
    console.log(token.value);
    // 用户登录过了
    if(token.value){
        getAdvator("/UserInfo/getAdvator").then((res) => {
        if(res.code==200){
            imgUser.value = "http://" + res.advator;
        }
    });
    }
})


</script>
<style lang='scss' scoped>
        .introduce-use{
            min-height: 936px;
            &>div {
                display: flex;
            }
            
            .introduce-use-header-box{
                width: 100%;
                justify-content: space-between;
                align-items: center;
            }
            // 内容
            .introduce-use-container{
                min-height: 836px;
                display: flex;
                justify-content: space-evenly;
                align-items: center;
                .introduce-use-imgbg{
                    position: relative;
                    width: 735px;
                    height: 560px;
                }
                @media (max-width:960px) {
                    .introduce-use-imgbg{
                        display: none;
                    }
                }
            }
        }
</style>