import { defineStore, acceptHMRUpdate } from 'pinia'
import { homeDomain } from '@/api/index'

export const useHomeDomainStore = defineStore('homeDomain', {
  persist: true,
  state: () => {
    return {
      pageHint: 'home',
      logoImg: '',
      loginImg: '',
      domainInform: '',
      viewPath: '',
      domain: '',
      activitySignStatus: '',
      activityRouletteStatus: '',
      activityHongbaoyuStatus: '',
      activityNotWithdrawStatus: '',
      appDownloadLink: '',

      navStatus: '0', // 头部导航ID
      hasLogin: false, // 是否登录
      userInfo: {} // 用户info
    }
  },

  getters: {
    // domainData(state) {
    //   return state
    // }
  },

  actions: {
    // 获取网站配置
    async setHomeDomain() {
      const { result } = await homeDomain()
      if (result) {
        this.logoImg = result.domain.logo
        this.loginImg = result.domain.logo1
        this.domainInform = result.domain.domainInform
        this.viewPath = result.domain.kefuLink
        this.domain = result.domain.domain
        this.activitySignStatus = result.activityStatus.activitySignStatus
        this.activityRouletteStatus = result.activityStatus.activityRouletteStatus
        this.activityHongbaoyuStatus = result.activityStatus.activityHongbaoyuStatus
        this.activityNotWithdrawStatus = result.activityStatus.activityNotWithdrawStatus
        this.appDownloadLink = result.domain.appDownloadLink
      }
    },

    setAttribute(key, val) {
      this[key] = val
    },
    setNavStatus(id) {
      this.navStatus = id
    },
    setHasLogin(val) {
      this.hasLogin = val
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useHomeDomainStore, import.meta.hot))
}
