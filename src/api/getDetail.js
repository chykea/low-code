import service from '@/utils/request';
export function getDetail(url, data) {
    return service({
        method: 'post',
        url: url,
        data: data,
        // cache: false,
    })
}