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
        <dd class="enter" v-for="temp in item.enters" :key="temp.id">
          <span>{{ temp.name }}</span>
        </dd>
      </dl>
    </div>
  </div>
</template>

<script setup scoped>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

import { homeSubMenus } from './constant'
import { useHomeDomainStore } from '@/stores/home.js'
const domainStore = useHomeDomainStore()
const router = useRouter()
const enterMap = ref(homeSubMenus)

function goPage(item) {
  router.push(item.url)
  domainStore.setNavStatus(item.id)
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
