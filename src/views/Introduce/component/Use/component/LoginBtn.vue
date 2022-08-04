<template>
    <div class="login"><div><router-link to="/toForm">登录</router-link></div></div>
</template>
<script setup>
</script>
<style lang='scss' scoped>
.login{
    width: 280px;
    // text-align: right;
    display: flex;
    flex-direction: row-reverse;
    &>div{
        &>a{
            color: #fff;
        }
        text-align: center;
        line-height: 42px;
        width: 96px;
        height: 42px;
        background: #17191A;
        border-radius: 21px;
        color: #fff;
        font-size: 16px;
        transition: all .5s;
    }
    &>div:hover{
        box-shadow: 1px 6px 51px 0px rgba(19,20,21,0.7000);
    }
}
</style>