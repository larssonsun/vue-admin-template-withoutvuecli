import * as mtypes from "./mutations_types"

export default {
    addData({ commit }, { data: newTodoData }) {
        return new Promise((resolve, reject) => {
            commit(mtypes.ADDDATA, newTodoData)
            resolve(newTodoData)
        })
    },
    getAllData({ commit }) {
        return new Promise((resolve, reject) => {
            commit(mtypes.DATAALL)
            resolve()
        })
    },
    getCompletedData({ commit }) {
        return new Promise((resolve, reject) => {
            commit(mtypes.CMPDATA)
            resolve()
        })
    },
    getActiveData({ commit }) {
        return new Promise((resolve, reject) => {
            commit(mtypes.ACTDATA)
            resolve()
        })
    }
}