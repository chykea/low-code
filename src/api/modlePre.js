import service from "@/utils/ApplicationJson";
export function myModlePre(url,data){
    return service({
        method:"post",
        url:url,
        data:data
    })
}

