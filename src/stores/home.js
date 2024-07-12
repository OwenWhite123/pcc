import { defineStore, acceptHMRUpdate } from 'pinia'
import { homeDomain, getAllLottery } from '@/api/index'

export const useHomeStore = defineStore('homeDomain', {
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
      userInfo: {}, // 用户info
      balance: 0, // 余额
      allLotteryList: [] // 全部彩种
    }
  },

  getters: {
    allLhcList(state) {
      let lhcList = [],
        scList = [],
        sscList = [],
        k3List = [],
        otherList = []
      if (state.allLotteryList.length) {
        state.allLotteryList.forEach((item) => {
          if (item.groupCode === 'LHC') {
            lhcList.push(item)
          } else if (item.groupCode === 'SC') {
            scList.push(item)
          } else if (item.groupCode === 'SSC') {
            sscList.push(item)
          } else if (item.groupCode === 'K3') {
            k3List.push(item)
          } else {
            otherList.push(item)
          }
        })
      }
      return { lhcList, scList, sscList, k3List, otherList }
    },
    hotList(state) {
      if (state.allLotteryList.length) {
        return state.allLotteryList.filter((item) => item.hot === 1).splice(0, 16)
      }
      return []
    }
  },

  actions: {
    setAttribute(key, val) {
      this[key] = val
    },

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

    async getAllLotteryFn() {
      const { result } = await getAllLottery()
      if (result) {
        this.allLotteryList = result.list
      }
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useHomeStore, import.meta.hot))
}
