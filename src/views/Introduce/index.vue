<template>
    <div class="introduce-container">
        <div class="introduce-use">
            <div class="introduce-use-header">
                <div class="introduce-use-logo">
                    <div class="logo"><span>LC</span><span class="logo-color-siliver">design</span></div>
                </div>
                <div class="introduce-use-nav">
                    <div class="introduce-use-nav-box">
                        <ul class="introduce-use-nav-list">
                            <li><router-link to="">新手教程</router-link> </li>
                            <li><router-link to="">项目管理</router-link> </li>
                            <li><router-link to="">素材库</router-link> </li>
                        </ul>
                        <div class="login"><button>登录</button></div>
                    </div>
                </div>
            </div>
            <div class="introduce-use-container">

            </div>
        </div>
        <div class="introduce-guide"></div>
        <div class="introduce-module"></div>
    </div>
</template>
<script setup>

</script>
<style lang='scss' scoped>
    @font-face{
        font-family: 'BerlinSansFBDemi-Bold';
        src: url('../../assets/font/Berlin Sans FB Demi Bold.ttf');
    }
    .introduce-container{
        .introduce-use{
            height: 936px;
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
                        .logo-color-siliver{
                            color: #AAAAAA;
                        }
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
                        .login{
                            width: 297px;
                            // text-align: right;
                            display: flex;
                            flex-direction: row-reverse;
                            &>button{
                                cursor: pointer;
                                width: 96px;
                                height: 42px;
                                background: #17191A;
                                border-radius: 21px;
                                color: #fff;
                                font-size: 16px;
                                transition: all .5s;
                            }
                            &>button:hover{
                                box-shadow: 1px 6px 51px 0px rgba(19,20,21,0.7000);
                            }
                        }
                    }
                    
                }
               
            }
            .introduce-use-container{
                height: 836px;
                background-color: #333;
            }
        }
    }
</style>