import defaultSettings from '@/settings'

const { showSettings, fixedHeader, sidebarLogo } = defaultSettings
const state = {
  showSettings: showSettings, // 这里showSettings并不存在
  fixedHeader: fixedHeader,
  sidebarLogo: sidebarLogo
}

export default state