import service from "@/utils/request";

export  function getAdvator(url){
    return service({
        method:'get',
        url:url
    })
}