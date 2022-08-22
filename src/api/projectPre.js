import service from "@/utils/ApplicationJson";
export function projectPre(url,data){
    return service({
        method:"post",
        url:url,
        data:data
    })
}
// export function projectPre(id){
// const data={id:id};
// project("/page/getPreview",data).then(res=>{

// })
// }