import loginConfig from '@/utils/LoginAndRegisterConfig'

export function loginRequest(url,params){
    return loginConfig({
        method:'post',
        url:url,
        data:params
    })
}