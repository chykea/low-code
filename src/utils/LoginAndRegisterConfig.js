/**
 * 登录拦截
 */
import axios from "axios";
import { ElMessage } from "element-plus";
// 加载条
import nprogress from "nprogress";
import 'nprogress/nprogress.css'

const service = axios.create({
    baseURL:'/api', // 已经配置了代理,
    headers:{
        "Content-Type":"multipart/form-data"
    },
    timeout:10000,
})

// 请求拦截
service.interceptors.request.use(config=>{
    // 加载条显示
    nprogress.start()
    return config;
})

// 响应拦截
service.interceptors.response.use(res=>{
    // 加载条隐藏
    nprogress.done()
    // 提示用户操作成功
    // ElMessage({
    //     type:"success",
    //     message:res.data.msg,
    // })
    return res;
},err=>{
    return err.message
})


export default service;