<template>
    <div class="form">
        <div class="form-box">
            <div class="form-box-top">
                <router-link to="/toForm/login" custom v-slot="{navigate, href, route,isActive, isExactActive}">
                    <div :class="[isActive && 'form-active', isExactActive && 'form-exact-active']">
                        <a :href="href">登录</a>
                    </div>
                </router-link>
                <router-link to="/toForm/register" custom v-slot="{navigate, href, route,isActive, isExactActive}">
                    <div :class="[isActive && 'form-active', isExactActive && 'form-exact-active']">
                        <a :href="href">注册</a>
                    </div>
                </router-link>
            </div>
            <div>
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>
<script setup>
</script>
<style lang='scss' scoped>
    .form{
        width: 443px;
        height: 581px;
        background: #fff;
        box-shadow: 0px 2px 46px 0px rgba(186,186,186,0.3300);
        border-radius: 50px;
        .form-box{
            display: flex;
            flex-direction: column;
            align-items: center;
            .form-box-top{
                display: flex;
                margin: 41px 0 60px 0;
                &>div{
                    width: 114px;
                    height: 45px;
                    color: #17191A;
                    font-size: 18px;
                    font-weight: bold;
                    text-align: center;
                    line-height: 45px;
                }
                .form-active{
                    background: #16191E;
                    border-radius: 23px;
                    &>a{
                        color: #fff;
                    }
                }
            }
        }
    }
</style>