import service from "@/utils/request";
function behavePro(url) {
    return service({
        method: 'get',
        url: url,
    })
}
//渲染项目个数
export function behaveProject(ans, names) {
    behavePro('/page/getAllPage').then(res => {
        console.log(res.data);
        if (res.code == 200) {
            const arr = res.data;
            for (let i = 0; i < arr.length; i++) {
                // plus.counter[i] = res.data.data[i].id;
                ans[i] = arr[i].id;
                names[i] = arr[i].pageName;
                console.log(ans[i]);
            }
        }
    }, err => {
        console.log(err.message);
    })
}