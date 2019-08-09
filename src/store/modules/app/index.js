import state from "./state"
import mutations from "./mutations"
import actions from "./actions"

const store = {
    namespaced: true,
    state,
    mutations,
    actions
}

export default store