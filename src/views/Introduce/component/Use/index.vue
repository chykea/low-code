<template>
<div class="introduce-use">
    <div class="introduce-use-header">
        <div class="introduce-use-logo">
            <div class="logo"><span>LC</span><span class="color-siliver">design</span></div>
        </div>
        <div class="introduce-use-nav">
            <div class="introduce-use-nav-box">
                <ul class="introduce-use-nav-list">
                    <li><router-link to="">新手教程</router-link> </li>
                    <li><router-link to="">项目管理</router-link> </li>
                    <li><router-link to="">素材库</router-link> </li>
                </ul>
                <slot name="user_login"></slot>
            </div>
        </div>
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
import { ref } from 'vue';
import ImgItem from './component/ImgItem.vue';

     
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
            // font-family: ;
            // 导航栏
            .introduce-use-header{
                margin: 0 30px;
                height: 100px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .introduce-use-logo{
                    flex: 1;
                    .logo{
                        position: relative;
                        &::before{
                            content: '';
                            width: 22px;height: 22px;
                            border-radius: 50%;
                            background: #F7D94C radial-gradient(rgba(0,0,0,0),#fff); // 小圆球 有渐变效果
                            position: absolute;
                            top: 50%;
                            left: -21px;
                            transform: translate(-50%,-50%);
                        }
                        width: 135px;
                        display: flex;
                        justify-content: space-between;
                        font-family: 'BerlinSansFBDemi-Bold';
                        font-weight: bold;
                        font-size: 32px;
                        
                    }
                }
                .introduce-use-nav{
                    flex:1;
                    .introduce-use-nav-box{
                        display: flex;
                        width: 100%;
                        .introduce-use-nav-list{
                            display: flex;
                            width: 456px;
                            justify-content: space-between;
                            align-items: center;
                            &>li{
                                font-family: 'Microsoft YaHei';
                                width: 72px;
                                font-size: 18px;
                            }
                        }
                        
                    }
                    
                }
               
            }
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