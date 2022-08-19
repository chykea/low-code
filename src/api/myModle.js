import service from '@/utils/ApplicationJson';
 function myModle(url){
    return service({
        method:'post',
        url:url,
        
    })
}
//[我的素材]模块组件的个数接口
export function Modle(counter,componentName){
 myModle("/con/getAllCon").then(
    (res) => {
      console.log(res.data);
      if (res.data.code == 200) {
        const arr = res.data.data;
        for (let i = 0; i < arr.length; i++) {
          counter[i] = arr[i].id;
          componentName[i] = arr[i].cname;
        }
      }
    },
    (err) => {
      console.log(err.message);
    }
  );
}