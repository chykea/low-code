<template>
<div class="login-form">
    <form enctype="application/x-www-form-urlencoded">
        <div class="login-form-box">
            <div>
                <h3>用户名</h3>
                <input type="text" v-model="username" placeholder="请输入8-20位以内的数字或字母" />
            </div>
            <div>
                <h3>密码</h3>
                <input type="password" v-model="password" placeholder='请输入您的密码'/>
            </div>
            <div class="login-form-btn">
                <button @click="login">登录</button>
            </div>
        </div>
    </form>
</div>
</template>
<script setup>

import { ref } from 'vue';
import axios from 'axios';

let username = ref('');
let password = ref('');

function login(){
    let data = {
            userName:username.value,
            passWord:password.value
        };
        console.log(data);
    axios({
        method:'post',
        url:'/api/login',
        data:data,
    }).then(res=>{
        console.log(res.data);
    },err=>{
        console.log(err.message);
    })
}
</script>
<style lang='scss' scoped>
.login-form {
    width: 350px;
    display: flex;
    justify-content: center;
    .login-form-box{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 350px;
        input[type='text'],input[type='password']{
            width: 350px;
            height: 52px;
            outline: none;
            background-color: #F3F3F3;
            border: none;
            border-radius: 10px;
            margin-top: 15px;
            padding-left: 21px;
        }

        .login-form-btn{
            text-align: center;
            button{
                border: none;
                cursor: pointer;
                width: 186px;
                height: 62px;
                background: #F7D94C;
                transition: all 0.3s;
                border-radius: 31px;
                font-size: 20px;
                font-weight: bold;
                &:hover{
                    box-shadow: 1px 6px 51px 0px rgb(247 215 64 / 88%);
                }
            }
        }
    }
}
</style>