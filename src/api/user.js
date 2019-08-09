import request from "@/utils/request"

export function login(data) {
    // 这里的request 是一个axios的实例，已经包含部分配置属性，这里在调用axios实例时加入了新的配置属性与原先的合并
    return request({
        url: "/user/login",
        method: "post",
        data
    })
}

export function getInfo() {
    return request({
        url: "/user/info",
        method: "post"
    })
}

export function logout() {
    return request({
        url: "/user/logout",
        method: "post"
    })
}