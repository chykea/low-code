import axios from "axios";

const service = axios.create({
    baseURL:'/api', // 已经配置了代理,
    headers:{
        "Content-Type":"multipart/form-data"
    },
    timeout:10000,
})

service.interceptors.request.use(config=>{
    // 请求时带上token
    config.headers.token = sessionStorage.getItem('token');
    return config;
})

service.interceptors.response.use(response=>{
    // console.log(response.data);
    console.log("响应拦截成功");
},err=>{
    console.log(err.message);
})

export default service;

