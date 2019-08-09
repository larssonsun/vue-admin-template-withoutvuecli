import { login, getInfo, logout } from '@/api/user'
import { setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import * as mtypes from "./mutations_types"

const actions = {
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password })
        .then(response => {
          const { data } = response
          commit(mtypes.SET_TOKEN, data.token)
          setToken(data.token)
          resolve()
        }).catch(error => {
          reject(error)
        })
    })
  },
  getInfo({ commit }) {
    return new Promise((resolve, reject) => {
      getInfo()
        .then(response => {
          const { data } = response
          if (!data) {
            reject("验证错误，请重新登录")
          }

          const { name, avatar } = data

          commit(mtypes.SET_NAME, name)
          commit(mtypes.SET_AVATAR, avatar)
          resolve(data)
        }).catch(error => {
          reject(error)
        })

    })
  },
  logout({ commit }) {
    return new Promise((resolve, reject) => {
      logout().then(() => {
        commit(mtypes.SET_TOKEN, '')
        removeToken()
        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  resetToken({ commit }) {
    return new Promise((resolve) => {
      commit(mtypes.SET_TOKEN, "")
      removeToken()
      resolve()
    })
  }
}

export default actions