export default function getObjByKeyValue(id: string, item: any): any {
    if (item.id === id) {
        return item
    } else if (item.children.length <= 0) {
        return null
    } else {
        for (let i = 0; i < item.children.length; i++) {
            let temp = getObjByKeyValue(id, item.children[i])
            if (temp !== null) {
                return temp
            }
        }
    }
}