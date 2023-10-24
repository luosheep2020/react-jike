import {request} from "@/utils/index.js";

export function getChannelAPI() {
    return request({
        url:'/channels',
        method:'GET'
    })
}

export function createArticleAPI(data) {
    return request({
        url:'mp/articles?draft=false',
        method:'POST',
        data
    })
}