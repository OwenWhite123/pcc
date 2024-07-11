<template>
  <div class="page">
    <div class="header">
      <div class="tip-box">
        <div class="tip">
          <TopTip></TopTip>
        </div>
      </div>
      <div class="nav">
        <TopNav></TopNav>
      </div>
    </div>
    <div class="body">
      <div class="main">
        <router-view v-slot="{ Component, route }">
          <transition :name="$route.meta.isHideMenu ? 'fade' : 'fade'" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </div>
  </div>
</template>
<script setup>
import TopTip from '@/components/PageHeader/TopTip.vue'
import TopNav from '@/components/TopNav.vue'
import { onMounted } from 'vue'

onMounted(() => { })
</script>
<style lang="scss" scoped>
.page {

  .header,
  .body {}

  .tip-box {
    background: #fafafa;
  }

  .tip,
  .nav {
    width: $maxWidth;
    margin: 0 auto;
  }

  .main {
    background-color: #f3f6fa;

  }
}
</style>
