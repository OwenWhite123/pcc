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
        :class="[{ 'menu-active': item.id === domainStore.navStatus }]"
        v-for="(item, index) in pageMap"
        :key="item.url"
        @click="goPage(item)"
      >
        {{ item.name }}

        <div class="lottery-nav" v-if="item.id === '1'">
          <LotteryNav></LotteryNav>
        </div>

        <div class="sub-nav" v-if="item.id !== '0' && item.id !== '1'">
          <SubNav :list="getPlatList(item.type)"></SubNav>
        </div>
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
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import LotteryNav from '@/components/subMenus/LotteryNav.vue'
import SubNav from '@/components/subMenus/SubNav.vue'

import { getAllPlat } from '@/api/index'

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
    type: 0,
    url: '/lottery'
  },
  {
    id: '2',
    name: '棋牌游戏',
    type: 4,
    url: '/board'
  },
  {
    id: '3',
    name: '体育赛事',
    type: 3,
    url: '/sports'
  },
  {
    id: '4',
    name: '真人视讯',
    type: 1,
    url: '/live'
  },
  {
    id: '5',
    name: '电子游艺',
    type: 2,
    url: '/electronic'
  },
  {
    id: '6',
    name: '捕鱼游艺',
    type: 5,
    url: '/fishing'
  }
]
const allPlatList = ref([])

onMounted(async () => {
  await getAllPlatFn()
})

function getPlatList(type) {
  if (type) {
    return allPlatList.value.filter((item) => item.type === type)
  }
}

function goPage(item) {
  router.push(item.url)
  domainStore.setNavStatus(item.id)
}

async function getAllPlatFn() {
  const { result } = await getAllPlat()
  if (result) {
    allPlatList.value = result.list
  }
}
</script>

<style lang="scss" scoped>
.page {
  @include flexBetween;
}
.logo {
  width: 184px;
  height: 45px;
  cursor: pointer;
}

.sub-nav {
  height: 0;
  overflow: hidden;
  background-color: #fff;
  @include flexCenter;
  position: fixed;
  top: 120px;
  z-index: 1;
}
.lottery-nav {
  height: 0;
  overflow: hidden;
  width: 100%;
  background-color: #fff;
  @include flexCenter;
  position: fixed;
  top: 120px;
  left: 0;
  right: 0;
  z-index: 1;
}
.menus {
  height: 80px;
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

  .menu {
    &:hover .lottery-nav {
      height: auto;
    }
    &:hover .sub-nav {
      height: auto;
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
