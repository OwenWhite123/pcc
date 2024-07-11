<template>
  <router-view v-slot="{ Component, route }">
    <transition :name="$route.meta.isHideMenu ? '' : 'fade'" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>


<script setup>

defineProps({
  keepAlive: {
    type: Boolean,
    default: true
  }
})

</script>

<style lang="scss" scoped>
.fade-enter-active {
  transition: all 0.25s ease 0.1s;
}

.fade-leave-active {
  transition: all 0.15s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateX(-20px)
}

.fade-leave-to {
  opacity: 0;
  transform: translateX(20px)
}

.slide-right-enter-active,
.slide-right-leave-active {
  transition: transform 0.5s;
}

.slide-right-enter,
.slide-right-leave-to {
  transform: translateX(100%);
}

.content-enter-active {
  transition: all 0.25s linear;
}

.content-enter-from {
  opacity: 0;
  transform: scale(0.95);
}
</style>
