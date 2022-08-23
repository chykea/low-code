
import service from "@/utils/ApplicationJson";

//编辑页的发布功能
export function publish(url,data){
    return service({
        method:"post",
        url:url,
        data:data
    })
}

