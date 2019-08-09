import * as mtypes from "./mutations_types"

const actions = {
    changeSetting({ commit }, data) {
        commit(mtypes.CHANGE_SETTING, data)
    }
}

export default actions