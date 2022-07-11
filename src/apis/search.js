//和Home相关的接口写在一块
import request from "@/utils/request";

// /search/hot
export const getSearchTag = (params) =>
    request({
        url: "/search/hot",
        params,
    });

// 搜索结果
export const getSearchList = params =>
    request({
        url: '/cloudsearch',
        params
    })