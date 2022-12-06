// 防抖代码
export default (fn: Function, delay: number): any => {
    let t: any = null;
    return () => {
        if (t != null) {
            clearInterval(t);
        }
        t = setTimeout(() => {
            fn();
        }, delay)
    }
}
export function test() {
    console.log(1);

}
