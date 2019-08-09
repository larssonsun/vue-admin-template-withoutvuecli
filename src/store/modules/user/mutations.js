import * as mtypes from "./mutations_types"

const mutations = {
    [mtypes.SET_TOKEN]: (state, token) => {
        state.token = token
    },
    [mtypes.SET_NAME]: (state, name) => {
        state.name = name
    },
    [mtypes.SET_AVATAR]: (state, avatar) => {
        state.avatar = avatar
    }
}

export default mutations