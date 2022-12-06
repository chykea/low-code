const delKey = (prop: string, { [prop]: _, ...rest }) => rest;

export default function clearProp(arr: any, target: string) {
    let newArr = [];
    for (let i = 0; i < arr.length; i++) {
        newArr.push(delKey(target, arr[i]))
        if (arr[i].children.length) {
            clearProp(arr[i].children, target)
        }
    }
    return newArr
}

