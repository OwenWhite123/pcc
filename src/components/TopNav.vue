<template>
  <div class="page">
    <el-image
      class="logo"
      style="width: 184px; height: 45px"
      :src="domainStore.loginImg"
      fit="contain"
      @click="goPage({ url: '/home', id: '0' })"
    />
    <ul class="menus">
      <li
        class="menu"
        :class="{ 'menu-active': item.id === domainStore.navStatus }"
        v-for="item in pageMap"
        :key="item.url"
        @click="goPage(item)"
      >
        {{ item.name }}
      </li>
    </ul>
    <ul class="enters">
      <li class="enter">
        <el-image style="width: 22px; height: 22px" :src="domainStore.loginImg" fit="contain" />
        <div>优惠</div>
      </li>
      <li class="enter">
        <el-image style="width: 22px; height: 22px" :src="domainStore.loginImg" fit="contain" />
        <div>客服</div>
      </li>
      <li class="enter">
        <el-image style="width: 22px; height: 22px" :src="domainStore.loginImg" fit="contain" />
        <div>APP</div>
      </li>
    </ul>
  </div>
</template>

<script setup scoped>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

import { useHomeDomainStore } from '@/stores/home.js'
const domainStore = useHomeDomainStore()
const router = useRouter()

const pageMap = [
  {
    id: '0',
    name: '首页',
    url: '/home'
  },
  {
    id: '1',
    name: '彩票游戏',
    url: '/lottery'
  },
  {
    id: '2',
    name: '棋牌游戏',
    url: '/board'
  },
  {
    id: '3',
    name: '体育赛事',
    url: '/sports'
  },
  {
    id: '4',
    name: '真人视讯',
    url: '/live'
  },
  {
    id: '5',
    name: '电子游艺',
    url: '/electronic'
  },
  {
    id: '6',
    name: '捕鱼游艺',
    url: '/fishing'
  }
]

function goPage(item) {
  router.push(item.url)
  domainStore.setNavStatus(item.id)
}
</script>

<style lang="scss" scoped>
.page {
  height: 80px;
  @include flexBetween;
}
.logo {
  width: 184px;
  height: 45px;
  cursor: pointer;
}
.menus {
  height: 100%;
  display: flex;
  align-items: center;
  font-size: 16px;
  .menu {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 20px;
    cursor: pointer;

    &-active {
      color: $primaryColor;
    }
  }
}
.enters {
  display: flex;
  align-items: center;
  font-size: 14px;
  .enter {
    width: 34px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    cursor: pointer;
  }
}
</style>
