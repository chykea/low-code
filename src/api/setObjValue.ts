export default function setValue(item: any, target: any, value: any) {
    if (target && (typeof item === 'object')) {
        item[target] = value
        if (item.children && item.children.length > 0) {
            for (let i = 0; i < item.children.length; i++) {
                setValue(item.children[i], target, value)
            }
        } else {
            return
        }
    }

}