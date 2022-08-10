<template>
<div class="login-form">
    <form enctype="multipart/form-data">
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
                <button type="button" @click="login">登录</button>
            </div>
        </div>
    </form>
</div>
</template>
<script setup>

import { ref } from 'vue';
import {useStore} from 'vuex';
import {useRouter} from 'vue-router'
import axios from 'axios';
import { ElMessage } from 'element-plus'


let username = ref('');
let password = ref('');
// 引入store 用于保存登录成功后的token 
const store = useStore()
const router = useRouter()

function login(){
    let data = {
            name:username.value,
            password:password.value
        };
    axios({
        method:'post',
        url:'/api/user/login',
        data:data,
        headers:{"Content-Type":"multipart/form-data"}
    }).then(res=>{
        const {data} = res;
        console.log(data);
        if(data.code===200){  // 登录成功,将 token存到store和localStorage中
            store.commit('setToken',{token:data.token})
            sessionStorage.setItem("token",data.token);
            router.push('/personedit')  // 跳转到个人首页
        }else{
            ElMessage({  // 登录失败,提示
                message:data.msg,
                type:'error'
            })
        }
    },err=>{
        console.log(err.message);
    })
}
</script>
<style lang='scss' scoped>
.form-container{
    font-family: 'BerlinSansFBDemi-Bold';
}
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