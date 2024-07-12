<template>
  <router-view v-slot="{ Component }">
    <component :is="Component" />
  </router-view>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { useHomeStore } from '@/stores/home.js'
import { useRoute, useRouter } from 'vue-router'
const homeDomain = useHomeStore()

const route = useRoute()
const router = useRouter()

onMounted(async () => {
  await homeDomain.setHomeDomain()
})

watch(
  () => router.currentRoute.value,
  (newValue) => {
    if (newValue.meta.navId) {
      homeDomain.setAttribute('navStatus', newValue.meta.navId)
    } else {
      // homeDomain.setAttribute('navStatus', '')
    }
  },
  { immediate: true }
)
</script>

<style scoped lang="scss"></style>
