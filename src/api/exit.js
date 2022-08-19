import service from '@/utils/ApplicationJson'

export function ExitRequest(url){
    return service({
        method:'post',
        url:url,
    })
}