import state from "./state"
import mutations from "./mutations"
import actions from "./actions"

const user = {
    namespaced: true,
    state,
    mutations,
    actions
}

export default user