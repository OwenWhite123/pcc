<template>
  <router-view v-slot="{ Component }">
    <component :is="Component" />
  </router-view>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { useHomeDomainStore } from '@/stores/home.js'
import { useRoute, useRouter } from 'vue-router'
const homeDomain = useHomeDomainStore()

const route = useRoute()
const router = useRouter()

onMounted(async () => {
  await homeDomain.setHomeDomain()
})

watch(
  () => router.currentRoute.value,
  (newValue) => {
    if (newValue.meta.navId) {
      homeDomain.setNavStatus(newValue.meta.navId)
    } else {
      // homeDomain.setNavStatus('')
    }
  },
  { immediate: true }
)
// 获取网站配置
</script>

<style scoped lang="scss"></style>
