import service from "@/utils/ApplicationJson";
export function createPro(url,data){
    return service({
        method:'post',
        url:url,
        data:data,
    })
}
