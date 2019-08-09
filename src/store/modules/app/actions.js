import * as mtypes from "./mutations_types"

const actions = {
    toggleSideBar({ commit }) {
        commit(mtypes.TOGGLE_SIDEBAR)
    },
    closeSideBar({ commit }, { withoutAnimation }) {
        commit(mtypes.CLOSE_SIDEBAR, withoutAnimation)
    },
    toggleDevice({ commit }, device) {
        commit(mtypes.TOGGLE_DEVICE, device)
    }
}

export default actions