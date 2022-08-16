import axios from 'axios';
import { ref } from 'vue';
//通用函数
function common(method, url, type, data) {
    let config = {
        method: method,
        url: url,
        data: data,
        headers: {
            'Content-Type': type,
            'token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJsaWQiOjIwMjIwODAzMSwiaXNzIjoiUml2ZW5ubiIsInVzZXJuYW1lIjoiUml2ZW42NiJ9.aadsQxU6mxk2gE3ivfDLW7EXuDJVODUgd0b-4gd3AMk',
        }
    }
    return config;
}
//点击创建 给后台一个回应 是后台可以在数据库增加一条数据
function createPro(method, url, type, name) {
    let data = { pageName: name };
    axios(
        common(method, url, type, data),
    ).then((res) => {
        if (res.data.code == 200) {
            console.log(res.data.msg);
            console.log(res.data);

        }
    })
}
// 删除请求
function deletePro(n) {
    let data = { id: n };
    axios(
        common('post', '/api/page/deletePage', 'application/json', data),
    )
        .then((res) => {
            if (res.data.code == 200) {
                console.log(res.data.msg);
            }
        }, err => {
            console.log(err.message);
        })

}
//渲染项目个数
function behavePro(ans, names) {
    axios(common('get', '/api/page/getAllPage', 'multipart/form-data')
    ).then(
        (res) => {
            if (res.data.code == 200) {
                const arr = res.data.data;
                for (let i = 0; i < arr.length; i++) {
                    // plus.counter[i] = res.data.data[i].id;
                    ans[i] = arr[i].id;
                    names[i] = arr[i].pageName;
                    console.log(ans[i]);
                }
            }
        },
        (err) => {
            console.log(err.message);
        }
    );
}
//“另存为”的接口
function saveAs(n) {
    let data = {
        id: n
    };
    axios(
        // common('post', "/page/downloadPage", "application/json", data),
        {
            method: 'post',
            url: "/api/page/downloadPage",
            data: data,
            responseType: 'blob',
            headers: {
                'Content-Type': "application/json",
                'token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJsaWQiOjIwMjIwODAzMSwiaXNzIjoiUml2ZW5ubiIsInVzZXJuYW1lIjoiUml2ZW42NiJ9.aadsQxU6mxk2gE3ivfDLW7EXuDJVODUgd0b-4gd3AMk',
            }
        }
    ).then(
        (res) => {
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
        },
        (err) => {
            console.log(err.message);
        }
    );
}
// async function getAdvatar(val){
//     await axios(
//         common("get", "api/UserInfo/getAdvator", "multipart/form-data") 
//         // {
//     //     method: "get",
//     //     url: "api/UserInfo/getAdvator",
//     //     headers: {
//     //         "Content-Type": "multipart/form-data",
//     //         'token':
//     //             "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJsaWQiOjIwMjIwODAzMSwiaXNzIjoiUml2ZW5ubiIsInVzZXJuYW1lIjoiUml2ZW42NiJ9.aadsQxU6mxk2gE3ivfDLW7EXuDJVODUgd0b-4gd3AMk",
//     //     },
//     // }
//     ).then(
//         (res) => {
//             // console.log(res.data);
//             if (res.data.code == 200) {
//                 val= "http://" + res.data.advator;
//             }
//         },
//         (err) => {
//             console.log(err.message);
//         }
//     );
//     console.log(val);
//     return val;
// }
export {
    createPro,
    deletePro,
    behavePro,
    common,
    saveAs,
    // getAdvatar
}

// let blob = new Blob([res.data]);
// let downloadElement = document.createElement("a");
// let href = window.URL.createObjectURL(blob); //创建下载的链接
// downloadElement.href = href;
// var temp = res.headers["content-disposition"]
// var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
// var matches = filenameRegex.exec(temp);
// var filename = '';
// if (matches != null && matches[1]) {
//     filename = matches[1].replace(/['"]/g, '');
// }
// downloadElement.download = filename;
// document.body.appendChild(downloadElement);
// downloadElement.click(); //点击下载
// document.body.removeChild(downloadElement); //下载完成移除元素
// window.URL.revokeObjectURL(href);