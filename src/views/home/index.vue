<template>
  <div class="page">
    <div class="body">
      <HRouteView />
    </div>
    <footer class="footer">
      <FooterBlock></FooterBlock>
    </footer>
  </div>
</template>
<script setup>
import { useRouter, useRoute } from 'vue-router'
import FooterBlock from '@/components/FooterBlock.vue'
import { HRouteView } from '@/components'

const router = useRouter()
import { onMounted } from 'vue'
const route = useRoute()

onMounted(() => { })
function goPage() {
  router.push({
    name: 'MemberCentre',
    query: { id: '123' }
  })
}
</script>
<style lang="scss" scoped>
.page {
  .body {
    min-height: 400px;
    background-color: #f3f6fa;
  }

  .footer {
    // background-color: #ebeff4;
  }
}
</style>
