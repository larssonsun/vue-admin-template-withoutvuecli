import * as mtypes from "./mutations_types"
import Cookies from 'js-cookie'

const mutations = {
    [mtypes.TOGGLE_SIDEBAR]: state => {
      state.sidebar.opened = !state.sidebar.opened
      state.sidebar.withoutAnimation = false
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1)
      } else {
        Cookies.set('sidebarStatus', 0)
      }
    },
    [mtypes.CLOSE_SIDEBAR]: (state, withoutAnimation) => {
      Cookies.set('sidebarStatus', 0)
      state.sidebar.opened = false
      state.sidebar.withoutAnimation = withoutAnimation
    },
    [mtypes.TOGGLE_DEVICE]: (state, device) => {
      state.device = device
    }
  }

  export default mutations