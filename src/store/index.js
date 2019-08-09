import Vue from "vue"
import Vuex from "vuex"
import todo from "./modules/todo"
import user from "./modules/user"
import settings from "./modules/settings"
import app from "./modules/app"
import getters from "./getters"

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        todo,
        user,
        settings,
        app
    },
    getters
})

export default store