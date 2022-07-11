//和Home相关的接口写在一块
import request from "@/utils/request";

// /personalized
export const getRecommendList = (params) =>
    request({
        url: "/personalized",
        params,
    });

// /personalized/newsong
export const getNewsongList = (params) =>
    request({
        url: '/personalized/newsong',
        params,
    });
