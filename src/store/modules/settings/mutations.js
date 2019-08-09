import * as mtypes from "./mutations_types"

const mutations = {
    [mtypes.CHANGE_SETTING]: (state, { key, value }) => {
        if (state.hasOwnProperty(key)) {
            state[key] = value
        }
    }
}

export default mutations