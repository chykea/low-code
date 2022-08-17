import service from "@/utils/ApplicationJson";
 function save(url,data){
    return service({
        method:'post',
        url:url,
        responseType: 'blob',
        data:data,
    })
}
//“另存为”的接口
export function saveAs(id){
    let data={id: id};
    save('/page/downloadPage',data).then(res=>{
        console.log(res);
        let blob = new Blob([res.data]);
        let downloadElement = document.createElement("a");
        let href = window.URL.createObjectURL(blob); //创建下载的链接
        downloadElement.href = href;
        var temp = res.headers["content-disposition"]
        var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
        var matches = filenameRegex.exec(temp);
        var filename = '';
        if (matches != null && matches[1]) {
            filename = matches[1].replace(/['"]/g, '');
        }
        downloadElement.download = filename;
        document.body.appendChild(downloadElement);
        downloadElement.click(); //点击下载
        document.body.removeChild(downloadElement); //下载完成移除元素
        window.URL.rev
    },err => {
        console.log(err.message);
    })
}