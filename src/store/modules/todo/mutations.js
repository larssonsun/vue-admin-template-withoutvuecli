import * as mtypes from "./mutations_types"

const mutations = {
    [mtypes.ADDDATA](state, newTodoData) {
        state.remoteData.push(newTodoData)
    },
    [mtypes.DATAALL](state) {
        state.localData = []
        state.remoteData.forEach(item => {
            state.localData.push(item)
        });
    },
    [mtypes.CMPDATA](state) {
        state.localData = []
        state.localData = state.remoteData.filter(item => item.status == "completed")

    },
    [mtypes.ACTDATA](state) {
        state.localData = []
        state.localData = state.remoteData.filter(item => item.status == "active")
    }
}

export default mutations