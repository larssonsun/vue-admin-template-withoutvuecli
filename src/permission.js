import router from "./router"
import store from "./store"
import { Message } from "element-ui"
import NProgress from "nprogress"
import "nprogress/nprogress.css"
import { getToken } from "./utils/auth"
import getPageTitle from "./utils/get-page-title"

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ["/login"]

router.beforeEach(async (to, from, next) => {
    NProgress.start()
    // set page title
    document.title = getPageTitle(to.meta.title)

    const hasToken = getToken()
    if (hasToken) {
        /* has token */
        if (to.path === "/login") {
            // if is logged in, redirect to the home page
            next({ path: '/' })
            NProgress.done()
        }
        else {
            const hasUserInfo = store.getters.name
            if (hasUserInfo)
                next()
            else {
                try {
                    // get user info
                    await store.dispatch('user/getInfo')
                    next()
                } catch (error) {
                    // remove token and go to login page to re-login
                    await store.dispatch('user/resetToken')
                    Message({
                        message: error || 'Has Error',
                        type: 'error',
                        duration: 5 * 1000
                    })
                    next(`/login?redirect=${to.path}`)
                    NProgress.done()
                }
            }
        }
    }
    else {
    /* not has token */
        if (whiteList.indexOf(to.path) !== -1) {
            next()
        }
        else {
            /* has no token */
            // 如果未携带token,且目标页面（to.path）不在白名单中。则转到login页面并附带原目标页面
            next(`/login?redirect=${to.path}`)
            NProgress.done()
        }
    }
})

router.afterEach(() => {
    NProgress.done()
})