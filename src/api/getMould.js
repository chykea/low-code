import request from "@/utils/request";

export function getMoulds(url,params){
    return request({
        method: 'post',
        url: url,
        data: params,
        headers:{
            'Content-Type' : 'application/json;charest=UTF-8'
        }
    })
}
