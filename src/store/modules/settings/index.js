import state from "./state"
import mutations from "./mutations"
import actions from "./actions"

const settings = {
    namespaced: true,
    state,
    mutations,
    actions
}

export default settings