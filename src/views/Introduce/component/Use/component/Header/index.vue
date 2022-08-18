<template>
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
</template>
<script setup>
</script>
<style lang='scss' scoped>
.color-siliver{
        color: #AAAAAA;
    }
.introduce-use-header{
    width: 100%;
    min-height: 100px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    
    .introduce-use-logo{
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
        .introduce-use-nav-box{
            display: flex;
            width: 100%;
            .introduce-use-nav-list{
                display: flex;
                width: 456px;
                justify-content: space-around;
                align-items: center;
                &>li{
                    font-family: 'Microsoft YaHei';
                    width: 72px;
                    font-size: 18px;
                }
            }
            @media (max-width:960px) {
                .introduce-use-nav-list{
                    display: none;
                }
            }    
        }    
    }
}
</style>