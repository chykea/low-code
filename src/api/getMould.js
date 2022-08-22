import request from "@/utils/request";

export function getMoulds(params){
    return request({
        method: 'post',
        url: '/public/getPage',
        data: {
            params
        },
    })
}
