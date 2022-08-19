import service from '@/utils/request';
export function upload(url,data){
    return service({
        method:'post',
        url:url,
        data:data,
        cache:false,//缓存处理
    })
}