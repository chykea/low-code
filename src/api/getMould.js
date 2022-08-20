import request from "@/utils/request";

export function getMoulds(cur){
    return request({
        method: 'post',
        url: '/public/getPage',
        data: cur,
    })
}
