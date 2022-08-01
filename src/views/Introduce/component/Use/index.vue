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
                        <div class="login"><button>登录</button></div>
                    </div>
                </div>
            </div>
            <div class="introduce-use-container">
                <div class="introduce-use-go">
                    <div class="introduce-use-title">
                        <p>LowCode</p>
                        <p class="color-siliver">design</p>
                    </div>
                    <div class="introduce-use-intro">
                        <h3>零代码实现网页界面</h3>
                        <h3>10分钟搭建完成</h3>
                        <h3>方便快捷</h3>
                    </div>
                    <div class="introduce-use-gotouse">
                        <button><span>开始使用</span><span >→</span></button>
                    </div>
                </div>
                <div class="introduce-use-imgbg">
                    
                </div>
            </div>
        </div>
</template>
<script setup>
</script>
<style lang='scss' scoped>
        
        .introduce-use{
            width: 1536px;
            margin: 0 auto;
            height: 936px;
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
                        .login{
                            width: 280px;
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
            // 内容
            .introduce-use-container{
                position: relative;
                height: 836px;
                // background-color: #333;
                .introduce-use-go{
                    position: absolute;
                    left: 168px;
                    top: 142px;
                    height: 340px;
                    width: 293px;
                    // background-color: #bfa;
                    .introduce-use-title{
                        &>p{
                            font-size: 72px;
                            font-family: 'BerlinSansFBDemi-Bold';
                        }
                    }
                    .introduce-use-intro{
                        margin-top: 10px;
                    }
                    .introduce-use-gotouse{
                        margin-top: 30px;
                        // display: flex;
                        // justify-content: center;
                        &>button{
                            border: none;
                            cursor: pointer;
                            width: 186px;
                            height: 62px;
                            background: #F7D94C;
                            transition: all .3s;
                            border-radius: 31px;
                            font-size: 20px;
                            font-weight: bold;
                        }
                        &>button:hover{
                            box-shadow: 1px 6px 51px 0px rgba(247,215,64,0.8800);
                        }
                    }
                }
                .introduce-use-imgbg{
                    position: absolute;
                    top: 31px;
                    left: 578px;
                }
            }
        }
</style>