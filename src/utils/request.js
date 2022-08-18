import axios from "axios";

const service = axios.create({
    baseURL:'/api', // 已经配置了代理,
    headers:{
        "Content-Type":"multipart/form-data",
       'token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJsaWQiOjIwMjIwODAzMSwiaXNzIjoiUml2ZW5ubiIsInVzZXJuYW1lIjoiUml2ZW42NiJ9.aadsQxU6mxk2gE3ivfDLW7EXuDJVODUgd0b-4gd3AMk',
    },
    timeout:10000,
})

// 请求拦截
service.interceptors.request.use(config=>{
    // 请求时带上token
   // config.headers.token = sessionStorage.getItem('token');
    return config;
})


// 响应拦截
service.interceptors.response.use(response=>{
    return response.data;
},err=>{
    console.log(err.message);
})

export default service;

