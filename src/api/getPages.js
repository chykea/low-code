import request from "@/utils/request";

export function getPages(){
    return request({
        method: 'get',
        url: '/public/getPageTotal',
    })
}
