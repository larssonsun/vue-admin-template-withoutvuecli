import Vue from "vue"

import "normalize.css"

import ElementUI from "element-ui"
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css

import App from "./App"
import router from "./router"
import store from "./store"


let div = document.createElement("div")
div.id = "app"
document.body.appendChild(div)

import '@/icons' // icon
import "./permission" // permission control

Vue.use(ElementUI)
// Vue.config.productionTip = false // 阻止启动生产消息

new Vue({
    el: "#app",
    router,
    store,
    render: h => h(App)
})