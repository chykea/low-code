/**
 * 登录拦截
 */
import axios from "axios";
import { ElMessage } from "element-plus";

const service = axios.create({
    baseURL:'/api', // 已经配置了代理,
    headers:{
        "Content-Type":"multipart/form-data"
    },
    timeout:10000,
})

// 请求拦截
service.interceptors.request.use(config=>{
    return config;
})

// 响应拦截
service.interceptors.response.use(res=>{
    // 提示用户操作成功
    ElMessage({
        type:"success",
        message:res.data.msg,
    })
    return res;
},err=>{
    return err.message
})


export default service;