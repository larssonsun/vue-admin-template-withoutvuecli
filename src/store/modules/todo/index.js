import state from "./state"
import mutations from "./mutations"
import actions from "./actions"

const todo = {
    namespaced: true,
    state,
    mutations,
    actions
}

export default todo