<template>
  <div class="page">
    <div class="mind">
      <dl class="enters" v-for="item in enterMap" :key="item.id">
        <dt class="enter">
          <span>{{ item.name }}</span>
          <el-image
            style="width: 22px; height: 22px; margin-left: 4px"
            :src="item.img"
            fit="contain"
          />
        </dt>
        <dd class="enter" v-for="temp in item.enters" :key="temp.lotteryCode">
          <span>{{ temp.lotteryName }}</span>
        </dd>
      </dl>
    </div>
  </div>
</template>

<script setup scoped>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

import { useHomeStore } from '@/stores/home.js'
const homeStore = useHomeStore()
const router = useRouter()

import logo from '@/assets/logo.svg'
const enterMap = ref([
  {
    id: '0',
    name: '六合彩',
    img: logo,
    url: '/lottery/lhc',
    enters: [...homeStore.allLhcList.lhcList]
  },
  {
    id: '1',
    name: '赛车飞艇',
    url: '/lottery/sc',
    img: logo,
    enters: [...homeStore.allLhcList.scList]
  },
  {
    id: '2',
    name: '时时彩',
    url: '/lottery/ssc',
    img: logo,
    enters: [...homeStore.allLhcList.sscList]
  },
  {
    id: '3',
    name: '快三',
    url: '/lottery/k3',
    img: logo,
    enters: [...homeStore.allLhcList.k3List]
  },
  {
    id: '4',
    name: '其他',
    url: '/lottery/k3',
    img: logo,
    enters: [...homeStore.allLhcList.otherList]
  }
])

function goPage(item) {
  router.push(item.url)
  homeStore.setAttribute('navStatus', item.id)
}
</script>

<style lang="scss" scoped>
.page {
  @include flexBetween;
  background-color: #fff;
}

.mind {
  display: flex;
  justify-content: center;
  padding: 10px 0;
}

.enters {
  width: 130px;

  &:first-child .enter {
    border-left: 0;
  }

  .enter {
    border-left: 1px solid #f5f5f5;
    height: 34px;
    @include flexCenter;
    cursor: pointer;
    font-size: 14px;
    color: #5f5f5f;

    &:hover {
      background-color: #f5f5f5;
      color: $primaryColor;
    }
  }
}
</style>
