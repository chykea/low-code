<template>
    <div class="login"><button><router-link to="/login">登录</router-link></button></div>
</template>
<script setup>
</script>
<style lang='scss' scoped>
.login{
    width: 280px;
    // text-align: right;
    display: flex;
    flex-direction: row-reverse;
    &>button{
        cursor: pointer;
        &>a{
            color: #fff;
        }
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
</style>