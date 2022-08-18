<template>
<div class="register-form">
    <form enctype="multipart/form-data">
        <div class="register-form-box">
            <div>
                <h3>用户名</h3>
                <input type="text" v-model="username" @input="checkUsername" placeholder="请输入8-16位以内的数字和字母" />
                <span :class="[!UsernameCheck?'danger':'hide']">用户名不符合</span>
            </div>
            <div>
                <h3>密码</h3>
                <input type="password" v-model="password" @input="checkPassword" placeholder='请输入8-16位以内的数字和字母'/>
                <span :class="[!PasswordCheck?'danger':'hide']">密码不符合</span>
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
import { useRouter} from 'vue-router'
import { ElMessage } from 'element-plus';
import {RegisterRequest} from '@/api/register'
const router = useRouter()

let username = ref('')
let password = ref('')
let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;
let UsernameCheck = ref(true)
let PasswordCheck = ref(true)

function checkUsername(){
    UsernameCheck.value = reg.test(username.value);
}
function checkPassword(){
    PasswordCheck.value = reg.test(password.value);
}

function register(){
    if(UsernameCheck&&PasswordCheck&&(username.value!==''&&password.value!=='')){
        let data = {
            name:username.value,
            password:password.value
        }
        RegisterRequest('/user/register',data).then(res=>{
            const {data} = res;
            if(data.code!==200){
                ElMessage({
                    message:data.msg,
                    type:"error",
                    duration:1000
                })
            }else{
                ElMessage({
                    message:"注册成功",
                    type:"success",
                    duration:1000
                })
                setTimeout(()=>{
                    router.push('/toForm/login')
                },1500)
            }
        },err=>{
            console.log(err.message);
        })
    }else{
        ElMessage({
            type:'error',
            message:'您注册使用的账户不符合'
        })
    }
}
</script>
<style lang='scss' scoped>
.danger{
    display: inline-block;
    color: red;
    font-size: 12px;
}
.hide{
    display: none;
}
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