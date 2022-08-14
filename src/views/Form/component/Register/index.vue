<template>
<div class="register-form">
    <form enctype="multipart/form-data">
        <div class="register-form-box">
            <div>
                <h3>用户名</h3>
                <input type="text" v-model="username" placeholder="请输入8-20位以内的数字或字母" />
            </div>
            <div>
                <h3>密码</h3>
                <input type="password" v-model="password" placeholder='请输入您的密码'/>
            </div>
            <div class="register-form-btn">
                <button type="button" @click="register">注册</button>
            </div>
        </div>
    </form>
</div>
</template>
<script setup>
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import {RegisterRequest} from '@/api/register'

let username = ref('')
let password = ref('')
function register(){
    let data = {
            name:username.value,
            password:password.value
        }
    RegisterRequest('/user/register',data).then(res=>{
        const {data} = res;
        if(data.code!==200){
            ElMessage({
                message:data.msg,
                type:"error"
            })
        }
    },err=>{
        console.log(err.message);
    })
}
</script>
<style lang='scss' scoped>
.register-form {
    width: 350px;
    display: flex;
    justify-content: center;
    .register-form-box{
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

        .register-form-btn{
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