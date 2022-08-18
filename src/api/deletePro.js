import service from "@/utils/ApplicationJson";
 function deletePro(url,data){
    return service({
        method:'post',
        url:url,
        data:data,
    })
}
// 删除请求
export function deleteProject(id){
    let data={id: id};
    deletePro('/page/deletePage',data).then(res=>{
        // console.log(res.data);
        if(res.code==200){
            console.log(res.msg);
        }
    },err => {
        console.log(err.message);
    })
}