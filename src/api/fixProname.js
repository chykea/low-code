import service from "@/utils/ApplicationJson";

export function fixProname(url,data){
    return service({
        method:"post",
        url:url,
        data:data
    })
}
