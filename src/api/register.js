import loginConfig from '@/utils/LoginAndRegisterConfig'

export function RegisterRequest(url,params){
    return loginConfig({
        method:'post',
        url:url,
        data:params
    })
}